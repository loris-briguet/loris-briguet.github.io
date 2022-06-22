// libs include
#include <MIDI.h>
#include <Bounce.h>
#include <Adafruit_MCP23X08.h>
#include <Adafruit_MCP23X17.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <ResponsiveAnalogRead.h>

#define i2c_Address 0x3c
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET -1    //   QT-PY / XIAO
#define NUMFLAKES 10
#define XPOS 0
#define YPOS 1
#define DELTAY 2

MIDI_CREATE_DEFAULT_INSTANCE();
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
Adafruit_MCP23X08 mcp;

const int numOfFaders = 1;
const int numOfButtons = 7;
const int numOfLeds = 4;

const int channel = 1;

// int fader_pins[12] = {A0, A1, A8, A9, A2, A3, A10, A11, A6, A7, A8, A9};
ResponsiveAnalogRead faders_pins[10] = {
    ResponsiveAnalogRead(A0, true),
    ResponsiveAnalogRead(A1, true),
    ResponsiveAnalogRead(A2, true),
    ResponsiveAnalogRead(A3, true),
    ResponsiveAnalogRead(A6, true),
    ResponsiveAnalogRead(A7, true),
    ResponsiveAnalogRead(A8, true),
    ResponsiveAnalogRead(A9, true),
    ResponsiveAnalogRead(A10, true),
    ResponsiveAnalogRead(A11, true),
};
int motorA[12] = {2, 4, 38, 40, 6, 8, 28, 30, 34, 36, 38, 40};
int motorB[12] = {3, 5, 39, 41, 7, 9, 29, 31, 35, 37, 39, 41};
// prev, next, op1, algo, op2, op3, op4
int button_pins[7] = {6, 4, 5, 1, 7, 3, 2};
int led_pins[4] = {10, 26, 11, 12};

int prevMidiVal[10];

int currOp = 0;
int storedVal[4][10];

int algo = 0;
int alPressed = false;
int disp = true;

int MAX_GIVE = 2;
int MIN_GIVE = -2;

bool btnWait = false;
int btnWaitCount = 0;
int tstVal = 0;

class Faders
{
private:
  int GIVE = 1;

public:
  int motorA;
  int motorB;
  int value;
  bool placed = false;
  bool stopRec = false;

  ResponsiveAnalogRead analog(int, bool);

  void setup()
  {
    pinMode(motorA, OUTPUT);
    pinMode(motorB, OUTPUT);
  }

  void update(int newValue)
  {
    value = newValue;
  }

  void stopMotor()
  {
    digitalWrite(motorA, LOW);
    digitalWrite(motorB, LOW);
  }

  void toValue(int targetValue)
  {

    if (abs(value - targetValue) > GIVE)
    {
      if (value > targetValue)
      {
        digitalWrite(motorB, LOW);
        digitalWrite(motorA, HIGH);
      }
      else if (value < targetValue)
      {
        digitalWrite(motorB, HIGH);
        digitalWrite(motorA, LOW);
      }
    }
    // else
    // {
    //   digitalWrite(motorA, LOW);
    //   digitalWrite(motorB, LOW);
    // }
  }

  void lumpy(int lumps)
  {

    for (int i = 0; i < 1024; i += 1024 / lumps)
    {
      if (value > i - GIVE && value < i + GIVE)
      {
        if (value >= i + GIVE)
        {
          digitalWrite(motorA, LOW);
          digitalWrite(motorB, HIGH);
        }
        else if (value <= i - GIVE)
        {
          digitalWrite(motorA, HIGH);
          digitalWrite(motorB, LOW);
        }
        else
        {
          digitalWrite(motorA, LOW);
          digitalWrite(motorB, LOW);
        }
      }
    }
  }
};
Faders fader[numOfFaders];

class Buttons
{
public:
  int pin;
  int state;

  void setup()
  {
    mcp.pinMode(pin, INPUT_PULLUP);
  }

  void update()
  {
    state = mcp.digitalRead(pin);
    return state;
  }
};
Buttons button[numOfButtons];

class Leds
{
public:
  int pin;
  int state;
  bool active;

  void setup()
  {
    pinMode(pin, OUTPUT);
  }

  void loop(int val)
  {
    digitalWrite(pin, val);
  }
};
Leds led[numOfLeds];

void setup()
{
  Serial.begin(9600);
  Wire.begin();
  if (!mcp.begin_I2C())
  {
    Serial.println("error");
    while (1)
      ;
  }

  // init MIDI
  MIDI.begin(channel);

  // init screen
  screenInit();

  // init faders, buttons & LEDs
  for (int i = 0; i < numOfFaders; i++)
  {
    fader[i].motorA = motorA[i];
    fader[i].motorB = motorB[i];
    fader[i].setup();
    prevMidiVal[i] = 0;
  }
  for (int i = 0; i < numOfButtons; i++)
  {
    button[i].pin = button_pins[i];
    button[i].setup();
  }
  for (int i = 0; i < numOfLeds; i++)
  {
    led[i].pin = led_pins[i];
    led[i].setup();
  }

  // Set op1 to default & set vals to 0
  currOp = 0;
  drawBMP(algo);
  for (int i = 0; i < numOfLeds; i++)
  {
    if (i == currOp)
    {
      led[i].loop(1);
    }
    else
    {
      led[i].loop(0);
    }
  }
  for (int i = 0; i < numOfFaders; i++)
  {
    for (int j = 0; i < 4; i++)
    {
      storedVal[j][i] = 0;
    }
  }
}

void loop()
{
  // screen display
  // Loop algo
  if (!button[3].state)
  {
    if (alPressed == false)
    {
      algo += 1;
      drawBMP(algo);
      disp = true;
      alPressed = true;
    }
  }
  else
  {
    alPressed = false;
  }

  // read 3inputs
  for (int i = 0; i < numOfFaders; i++)
  {
    faders_pins[i].update();
    fader[i].update(faders_pins[i].getValue());
    if (fader[i].value != prevMidiVal[i])
    {
      usbMIDI.sendControlChange(i + (currOp * 10), fader[i].value / 8, channel);
      MIDI.sendControlChange(i + (currOp * 10), fader[i].value / 8, channel);

      Serial.print(prevMidiVal[i]);
      Serial.print("\t");
      Serial.print(fader[i].value);
      Serial.println();

      prevMidiVal[i] = fader[i].value;
    }
  }
  for (int i = 0; i < numOfButtons; i++)
  {
    button[i].update();
  }

  // check buttons
  if (btnWait == false)
  {
    if (!button[2].state)
    {
      storeFaderVal();
      currOp = 0;
    }
    else if (!button[4].state || !button[1].state)
    {

      storeFaderVal();
      currOp = 1;
    }
    else if (!button[5].state)
    {
      storeFaderVal();
      currOp = 2;
    }
    else if (!button[6].state)
    {
      storeFaderVal();
      currOp = 3;
    }
  }

  // move faders
  for (int i = 0; i < numOfFaders; i++)
  {
    if (storedVal[currOp][i] != fader[i].value && fader[i].placed != true)
    {
      fader[i].toValue(storedVal[currOp][i]);
    }
    else if (fader[i].placed != true)
    {

      if (i != 2 || i != 3)
      {
        fader[i].stopMotor();
        fader[i].placed = true;
        btnWaitCount++;
      }
      else
      {
        fader[2].lumpy(8);
        fader[3].lumpy(9);
        btnWaitCount++;
      }
    }
  }

  // restet buton when placed
  if (btnWaitCount == numOfFaders)
  {
    btnWait = false;
    btnWaitCount = 0;
  }

  // light up current operator led
  for (int i = 0; i < numOfLeds; i++)
  {
    if (i == currOp)
    {
      led[i].loop(1);
    }
    else
    {
      led[i].loop(0);
    }
  }

  // followLast();
}

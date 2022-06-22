void storeFaderVal()
{
    for (int i = 0; i < numOfFaders; i++)
    {
        storedVal[currOp][i] = fader[i].value;
        fader[i].placed = false;
        btnWait = true;
    }
}

void printArray(int a[4][10])
{
  // loop through array's rows
  for (int i = 0; i < 4; ++i)
  {
    // loop through columns of current row
    for (int j = 0; j < 10; ++j)
      Serial.print(a[i][j] + String("\t"));
    Serial.println("\r"); // start new line of output
  }
}

 void   screenInit(){
  delay(250);                       // wait for the OLED to power up
  display.begin(i2c_Address, true); // Address 0x3C default
  drawLogo(2000);
  display.clearDisplay();
 }

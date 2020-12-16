const KEYSTONOTE = {
  53: 'c',
  54: 'd'
  //KEYSTONOTE[53] —> 'c'
}

let ZOOM = 1; //interpolated
let updateLetterMode = true

const BOUNDS = {
  min: {
    x: window.innerWidth,
    y: window.innerHeight
  },
  max: {
    x: window.innerWidth,
    y: window.innerHeight
  }
}

const UTILS = {
  lerp: function (start, stop, amt) {
    return amt * (stop - start) + start;
  },

  delay(millis = 0) {
    return new Promise(resolve => {
      window.setTimeout(resolve, millis);
    });
  }
}

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.bg = 255;
    document.body.style.backgroundColor = 'rgb(' + this.bg + ',' + this.bg + ',' + this.bg + ')';;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    //////// Styling Var ////////
    this.zoomValue = 1;
    this.r = 100;
    this.semR = this.r / 2;
    this.quartR = this.semR / 2;
    this.stroke = 30;
    this.speed = 0;
    this.acc = 0;
    this.col1r = [this.bw, 176, 223, 219, 223, 242, 219, 176, 242, 153, 152, 242];
    this.col1g = [this.bw, 245, 88, 1, 88, 209, 1, 245, 209, 171, 18, 209];
    this.col1b = [this.bw, 195, 48, 19, 48, 128, 19, 195, 128, 252, 15, 128];
    this.col2r = [this.bw, 242, 153, 176, 150, 150, 140, 150, 152, 219, 223, 140];
    this.col2g = [this.bw, 209, 171, 245, 182, 182, 0, 182, 18, 1, 88, 0];
    this.col2b = [this.bw, 128, 252, 195, 114, 114, 250, 114, 15, 19, 48, 250];
    this.col1 = 'rgb(' + this.col1r[0] + ',' + this.col1g[0] + ',' + this.col1b[0] + ')';
    this.col2 = 'rgb(' + this.col2r[0] + ',' + this.col2g[0] + ',' + this.col2b[0] + ')';
    this.col3 = 'rgb(' + this.bw + ',' + this.bw + ',' + this.bw + ')';
    this.bw = 0;
    /////////////////////////////

    //// Contruction Var //////// 
    this.myLetters = [];
    this.myLettersAll = [];
    this.currLetterIndex = 0; //index de la lettre dans l'array
    this.currLetterIndexAll = 0; //index de la lettre dans l'array
    this.caseWidth = this.r * 2
    this.caseHeight = this.r * 3
    this.edge = 111;
    this.fitValue = 1;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
    /////////////////////////////

    document.body.appendChild(this.canvas);
    this.setup();
  }
  setup() {
    this.draw();
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false
        })
        .then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    } else {
      alert('No MIDI support in your browser.');
    }

    this.triggerMidi({
      data: [176, 11, 0]
    });
  }

  onMIDISuccess(midiAccess) {
    const midi = midiAccess;
    const inputs = midi.inputs.values();
    // loop through all inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      // listen for midi messages
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
      // this just lists our inputs in the console
      //this.listInputs(input);

    }
    // listen for connect/disconnect message
    midi.onstatechange = this.onStateChange;
  }

  triggerMidi(event = {}) {
    this.onMIDIMessage(event);
  }

  onMIDIMessage(e) {
    function updateLetter(letter, message) {
      if (letter) {
        if ("onMidiMessage" in letter) {
          letter.onMidiMessage(e);
        } else {
          console.log('function on MidiMessage doesnt exist');
        }
      }
    }

    if (updateLetterMode) {
      let lastLetter = this.myLetters[this.myLetters.length - 1];
      updateLetter(lastLetter);
    } else {
      for (const letter of this.myLetters) {
        updateLetter(letter);
      }
    }
    const data = e.data;
    //console.log(data);
    const cmd = data[0] >> 4;
    const channel = data[0] & 0xf;
    const _type = data[0] & 0xf0;
    const note = data[1];
    const velocity = data[2];
    const infos = [cmd, channel, _type, note, velocity];

    console.log(data);
    // console.log(infos)

    this.spirale = new Spirale(this.edge);

    switch (_type) {
      case 144:

        if (this.myLettersAll.length == 0) {
          this.edge = 111;
          this.myLettersAll.length = 0;
          this.caseWidth = (this.r * 2);
          this.caseHeight = (this.r * 3);
          switch (note) {

            case 53:
              const letter1 = new Letter1(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter1);
              // this.removeAllLetters(this.myLetters, 50);
              break;
            case 54:
              const letter2 = new Letter2(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter2);
              break;
            case 55:
              const letter3 = new Letter3(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter3);
              break;
            case 56:
              const letter4 = new Letter4(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter4);
              break;
            case 57:
              const letter5 = new Letter5(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter5);
              break;
            case 58:
              const letter6 = new Letter6(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter6);
              break;
            case 59:
              const letter7 = new Letter7(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter7);
              break;
            case 60:
              const letter8 = new Letter8(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter8);
              break;
            case 61:
              const letter9 = new Letter9(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter9);
              break;
            case 62:
              const letter10 = new Letter10(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter10);
              break;
            case 63:
              const letter11 = new Letter11(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter11);
              break;
            case 64:
              const letter12 = new Letter12(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter12);
              break;
            case 65:
              const letter13 = new Letter13(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter13);
              break;
            case 66:
              const letter14 = new Letter14(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter14);
              break;
            case 67:
              const letter15 = new Letter15(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter15);
              break;
            case 68:
              const letter16 = new Letter16(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter16);
              break;
            case 69:
              const letter17 = new Letter17(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter17);
              break;
            case 70:
              const letter18 = new Letter18(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter18);
              break;
            case 71:
              const letter19 = new Letter19(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter19);
              break;
            case 72:
              const letter20 = new Letter20(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter20);
              break;
            case 73:
              const letter21 = new Letter1(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter21);
              break;
            case 74:
              const letter22 = new Letter2(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter22);
              break;
            case 75:
              const letter23 = new Letter3(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter23);
              break;
            case 76:
              const letter24 = new Letter4(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLetters.push(letter24);
              break;
          }
        } else {

          this.removeAllLetters(this.myLettersAll, 50);
          if (this.caseWidth < (this.r * 2)) {
            this.caseWidth - 0.05

          }

        }
        break;
      case 176:
        this.myLettersAll.length = 0;
        this.caseWidth = (this.r * 2);
        this.caseHeight = (this.r * 3);
        switch (note) {
          case 22:
            if (velocity > 0) {
              updateLetterMode = !updateLetterMode
            }
            break;
          case 12:
            switch (velocity) {
              case 127:
                const letter1 = new Letter1(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter2 = new Letter2(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter3 = new Letter3(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter4 = new Letter4(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter5 = new Letter5(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter6 = new Letter6(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter7 = new Letter7(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter8 = new Letter8(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter9 = new Letter9(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter10 = new Letter10(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter11 = new Letter11(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter12 = new Letter12(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter13 = new Letter13(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter14 = new Letter14(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter15 = new Letter15(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter16 = new Letter16(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter17 = new Letter17(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter18 = new Letter18(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter19 = new Letter19(this.ctx, this.stroke, this.r, this.col3, this.bw);
                const letter20 = new Letter20(this.ctx, this.stroke, this.r, this.col3, this.bw);
                this.myLetters.push(letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter9, letter10, letter11, letter12, letter13, letter14, letter15, letter16, letter17, letter18, letter19, letter20);
                break;
            }
            break;
          case 11:
            this.edge = 110;
            this.spirale = new Spirale(this.edge);
            this.myLetters.length = 0;
            this.r = 60;
            this.stoke = 5;
            this.caseWidth = (this.r * 3) + this.r
            this.caseHeight = (this.r * 3) + this.r
            if (velocity < 127) {
              this.myLettersAll.length = 0;
              const letter1 = new Letter1(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter2 = new Letter2(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter3 = new Letter3(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter4 = new Letter4(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter5 = new Letter5(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter6 = new Letter6(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter7 = new Letter7(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter8 = new Letter8(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter9 = new Letter9(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter10 = new Letter10(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter11 = new Letter11(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter12 = new Letter12(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter13 = new Letter13(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter14 = new Letter14(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter15 = new Letter15(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter16 = new Letter16(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter17 = new Letter17(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter18 = new Letter18(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter19 = new Letter19(this.ctx, this.stroke, this.r, this.col3, this.bw);
              const letter20 = new Letter20(this.ctx, this.stroke, this.r, this.col3, this.bw);
              this.myLettersAll.push(letter1, letter2, letter3, letter4, letter5, letter6, letter7, letter8, letter10, letter9, letter11, letter12, letter13, letter14, letter15, letter16, letter17, letter18, letter19, letter20, );
            }
            break;
          case 13:
            switch (velocity) {
              case 127:
                if (this.bw == 0) {
                  this.bw = 255;
                  this.col3 = 'rgb(' + this.bw + ',' + this.bw + ',' + this.bw + ')';
                } else if (this.bw == 255) {
                  this.bw = 0;
                  this.col3 = 'rgb(' + this.bw + ',' + this.bw + ',' + this.bw + ')';
                }
                break;
            }
            break;
            //empty letter
          case 14:
            this.myLetters.length = 0;
            this.fitValue = 2;

            this.setBounds(window.innerWidth, window.innerHeight);

            this.zoomValue = 1;
            break;
          case 41:
            switch (velocity) {
              case 127:
                this.bg += 122.5;
                document.body.style.backgroundColor = 'rgb(' + this.bg + ',' + this.bg + ',' + this.bg + ')';;
                break;
            }
            break;
          case 42:
            switch (velocity) {
              case 127:
                this.bg -= 122.5;
                document.body.style.backgroundColor = 'rgb(' + this.bg + ',' + this.bg + ',' + this.bg + ')';;
                //console.log(this.bg)

                break;
            }
            break;
        }
        break;
    }
    this.currLetterIndex = this.myLetters.length - 1; //chopper dernier element de l'array
    this.currLetterIndexAll = this.myLettersAll.length - 1; //chopper dernier element de l'array

    for (let i = 0; i < this.myLetters.length; i++) {
      let myCase = this.spirale.getIndex(this.edge * this.edge - 1 - i);
      let gridWidth = this.caseWidth * this.edge;
      let gridHeight = this.caseHeight * this.edge;
      let w = (window.innerWidth - gridWidth + (this.caseWidth)) + ((myCase.posX * this.caseWidth) * 2);
      let h = (window.innerHeight - gridHeight + (this.caseHeight)) + ((myCase.posY * this.caseHeight) * 2);

      this.myLetters[i].w = w;
      this.myLetters[i].h = h;
      this.calcBounds(w, h);

      if (i == this.myLetters.length - 1) {
        this.myLetters[i].lastOne = true;
      } else {
        this.myLetters[i].lastOne = false;
      }
    }

    for (let i = 0; i < this.myLettersAll.length; i++) {
      let myCase = this.spirale.getIndex(this.edge * this.edge - 1 - i);
      let gridWidth = this.caseWidth * this.edge;
      let gridHeight = this.caseHeight * this.edge;
      this.myLettersAll[i].w = (window.innerWidth - gridWidth + (this.caseWidth * 2)) + ((myCase.posX * this.caseWidth) * 2);
      this.myLettersAll[i].h = (window.innerHeight - gridHeight + (this.caseHeight)) + ((myCase.posY * this.caseHeight) * 2);

      if (i == this.myLettersAll.length - 1) {
        this.myLettersAll[i].lastOne = true;
      } else {
        this.myLettersAll[i].lastOne = false;
      }
    }
  }

  async removeAllLetters(letters, millis) {
    while (letters.length > 0) {
      await UTILS.delay(millis);
      letters.pop();
    }
  }

  onMIDIFailure(e) {
    console.log(
      'No access to MIDI devices or your browser doesn\'t support WebMIDI API. Please use WebMIDIAPIShim ',
      e);
  }

  setBounds(width, height) {
    BOUNDS.max.x = BOUNDS.min.x = width;
    BOUNDS.max.y = BOUNDS.min.y = height;
  }

  calcBounds(x, y) {
    BOUNDS.min.x = Math.min(x, BOUNDS.min.x);
    BOUNDS.min.y = Math.min(y, BOUNDS.min.y);
    BOUNDS.max.x = Math.max(x, BOUNDS.max.x);
    BOUNDS.max.y = Math.max(y, BOUNDS.max.y);
  }

  draw() {
    if (this.keyIsDown || this.onMIDIMessage) {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.save();

      this.zoomValue = 1;

      let visibleSpirale = {
        width: (BOUNDS.max.x - BOUNDS.min.x) * this.zoomValue,
        height: (BOUNDS.max.y - BOUNDS.min.y) * this.zoomValue,
      }
      visibleSpirale.ratio = visibleSpirale.width / visibleSpirale.height;
      let windowRatio = window.innerWidth / window.innerHeight;

      if (windowRatio < visibleSpirale.ratio) {
        this.fitValue = window.innerWidth / visibleSpirale.width;
      } else {
        this.fitValue = window.innerHeight / visibleSpirale.height;
      }

      this.fitValue = Math.min(1, this.fitValue * 1.5);
      ZOOM = UTILS.lerp(ZOOM, this.fitValue, 0.1);
      this.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
      this.ctx.scale(ZOOM, ZOOM);
      this.ctx.translate(-window.innerWidth / 2, -window.innerHeight / 2);

      for (var i = 0; i < this.myLetters.length; i++) {
        var selectedLetter = this.myLetters[i];
        selectedLetter.draw();
      }
      for (var i = 0; i < this.myLettersAll.length; i++) {
        var selectedLetterAll = this.myLettersAll[i];
        selectedLetterAll.draw();
      }

      this.ctx.restore();
    }
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = function () {
  new App();
}
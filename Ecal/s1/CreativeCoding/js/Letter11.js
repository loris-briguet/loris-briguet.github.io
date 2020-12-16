class Letter11 {
  constructor(ctx, s, _r, _col3, _bw) {
    this.lastOne = true;
    this.r = _r;
    this.semR = this.r / 2;
    this.quartR = this.semR / 2;
    this.stroke = 20;
    this.i = 0;
    this.j = 0;
    this.bw = _bw
    this.col1r = [this.bw, 176, 223, 219, 223, 242, 219, 176, 242, 153, 152, 242];
    this.col1g = [this.bw, 245, 88, 1, 88, 209, 1, 245, 209, 171, 18, 209];
    this.col1b = [this.bw, 195, 48, 19, 48, 128, 19, 195, 128, 252, 15, 128];
    this.col2r = [this.bw, 242, 153, 176, 150, 150, 140, 150, 152, 219, 223, 140];
    this.col2g = [this.bw, 209, 171, 245, 182, 182, 0, 182, 18, 1, 88, 0];
    this.col2b = [this.bw, 128, 252, 195, 114, 114, 250, 114, 15, 19, 48, 250];
    this.col1 = 'rgb(' + this.col1r[0] + ',' + this.col1g[0] + ',' + this.col1b[0] + ')';
    this.col2 = 'rgb(' + this.col2r[0] + ',' + this.col2g[0] + ',' + this.col2b[0] + ')';
    this.col3 = _col3;
    this.speed = 0;
    this.acc = 0;
    this.ctx = ctx;
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

  }

  draw() {

    let c = this.ctx;
    // let t = this;

    this.speed += this.acc;

    //red circle 1
    c.beginPath();
    c.arc(
      this.w / 2 + this.semR - Math.abs(Math.sin(this.speed)) * this.semR,
      this.h / 2 - Math.abs(Math.sin(this.speed)) * this.semR,
      this.semR + Math.abs(Math.sin(this.speed)) * this.semR,
      0, Math.PI * 2, false);

    c.strokeStyle = this.col1;
    c.lineWidth = this.stroke;
    c.closePath();

    c.stroke();

    //red circle 2
    c.beginPath();
    c.arc(
      this.w / 2 - this.semR + Math.abs(Math.sin(this.speed)) * this.semR,
      this.h / 2 + Math.abs(Math.sin(this.speed)) * this.semR,
      this.semR + Math.abs(Math.sin(this.speed)) * this.semR,
      0, Math.PI * 2, false);

    c.strokeStyle = this.col1;
    c.lineWidth = this.stroke;
    c.closePath();

    c.stroke();

    //blue circle 1
    c.beginPath();
    c.arc(
      this.w / 2 - this.r - Math.abs(Math.sin(this.speed)) * (this.r),
      this.h / 2 - this.stroke/2 - (this.r + this.semR)- Math.abs(Math.sin(this.speed)) * (this.r) ,
      this.r + Math.abs(Math.sin(this.speed)) * (this.r*2),
      0, Math.PI/2, false);

    c.strokeStyle = this.col2;
    c.lineWidth = this.stroke;
    c.stroke();
    c.closePath();
  

    //blue circle 2
    c.beginPath();
    c.arc(
      this.w / 2 + this.r + Math.abs(Math.sin(this.speed)) * (this.r),
      this.h / 2 + this.stroke/2 + (this.r + this.semR)+ Math.abs(Math.sin(this.speed)) * (this.r),
      this.r + Math.abs(Math.sin(this.speed)) * (this.r*2),
      Math.PI, -Math.PI/2, false);

    c.strokeStyle = this.col2;
    c.lineWidth = this.stroke;
    c.stroke();
    c.closePath();

 
  }

  keyIsDown(e) {

    let functionName = "key_" + e.key;

    if (functionName in this) { //regarder si une function existe sous ce nom
      this[functionName](e);
    }
  }
  onMidiMessage(e) {
    const data = event.data;
    ////console.log(data);
    const cmd = data[0] >> 4;
    const channel = data[0] & 0xf;
    const _type = data[0] & 0xf0;
    const note = data[1];
    const velocity = data[2];
    const infos = [cmd, channel, _type, note, velocity];
    //console.log('function called');

    switch (_type) {
      case 176:
        switch (note) {
          case 1:
            this.i = velocity % 12;
            this.col1r[this.i]
            this.col1g[this.i]
            this.col1b[this.i]
            this.col1 = 'rgb(' + this.col1r[this.i] + ',' + this.col1g[this.i] + ',' + this.col1b[this.i] + ')';
            break;
          case 2:
            this.j = velocity % 12;
            this.col2r[this.j]
            this.col2g[this.j]
            this.col2b[this.j]
            this.col2 = 'rgb(' + this.col2r[this.j] + ',' + this.col2g[this.j] + ',' + this.col2b[this.j] + ')';
            break;
            case 3:
              this.stroke = velocity /1.5 +5;
              break;
            case 4:
              this.acc = velocity / 900;
              break;
          case 50:
            switch (velocity) {
              case 127:
                this.i = Math.floor((Math.random() * 12));
                this.col1r[this.i]
                this.col1g[this.i]
                this.col1b[this.i]
                this.col1 = 'rgb(' + this.col1r[this.i] + ',' + this.col1g[this.i] + ',' + this.col1b[this.i] + ')';
                this.j = Math.floor((Math.random() * 12));
                //console.log(this.j);
                this.col2r[this.j]
                this.col2g[this.j]
                this.col2b[this.j]
                this.col2 = 'rgb(' + this.col2r[this.j] + ',' + this.col2g[this.j] + ',' + this.col2b[this.j] + ')';
                break;
            }
            break;
          case 51:
            switch (velocity) {
              case 127:
                this.stroke = (Math.random() * 50) + 10;
                break;
            }
            break;
          case 52:
            switch (velocity) {
              case 127:
                this.acc = (Math.random() / 4);
                //console.log(this.acc)
                break;
            }
            break;
          case 21:
            switch (velocity) {
              case 127:
                this.i = Math.floor((Math.random() * 12));
                this.col1r[this.i]
                this.col1g[this.i]
                this.col1b[this.i]
                this.col1 = 'rgb(' + this.col1r[this.i] + ',' + this.col1g[this.i] + ',' + this.col1b[this.i] + ')';
                this.j = Math.floor((Math.random() * 12));
                //console.log(this.j);
                this.col2r[this.j]
                this.col2g[this.j]
                this.col2b[this.j]
                this.col2 = 'rgb(' + this.col2r[this.j] + ',' + this.col2g[this.j] + ',' + this.col2b[this.j] + ')';
                this.stroke = (Math.random() * 50) + 10;
                this.acc = (Math.random() / 4);
                //console.log(this.acc)
                break;
            }
            break;
        }
        break;
    }
  }
  
  key_ArrowLeft(e) {

    if (this.stroke >= 10) {
      this.stroke -= 5;
    }
  }

  //key_a

  key_ArrowRight(e) {

    if (this.stroke <= 95) {

      this.stroke += 5;
    }

  }
  key_ArrowUp() {
    if (this.acc <= 0.25) {
      this.acc += 0.01;
    }
  }
  key_ArrowDown() {
    if (this.acc >= 0) {
      this.acc -= 0.01;
    }
 
  }

  key_c() {

    if (this.i < this.col1b.length-1) {
      this.i += 1;
      this.col1r[this.i]
      this.col1g[this.i]
      this.col1b[this.i]
      this.col1 = 'rgb(' + this.col1r[this.i] + ',' + this.col1g[this.i] + ',' + this.col1b[this.i] + ')';
      this.col2r[this.i]
      this.col2g[this.i]
      this.col2b[this.i]
      this.col2 = 'rgb(' + this.col2r[this.i] + ',' + this.col2g[this.i] + ',' + this.col2b[this.i] + ')';
    } else if (this.i >= this.col1b.length-1) {
      this.i = 0
      this.col1r[this.i]
      this.col1g[this.i]
      this.col1b[this.i]
      this.col1 = 'rgb(' + this.col1r[this.i] + ',' + this.col1g[this.i] + ',' + this.col1b[this.i] + ')';
      this.col2r[this.i]
      this.col2g[this.i]
      this.col2b[this.i]
      this.col2 = 'rgb(' + this.col2r[this.i] + ',' + this.col2g[this.i] + ',' + this.col2b[this.i] + ')';
    }
    //console.log(this.i)
  }
}
class Music {
  constructor() {
    console.log('template ready');
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    this.midi = new Midi();
    this.midi.setup(this);
    this.draw();
  }


  draw() {




    this.ctx.clearRect(0, 0, this.w, this.h);


if (this.message){
  if(this.message[3]==1){
  this.rayon = Number(this.message[4]);
}
if(this.message[3]==2){
  this.posX =this.map(Number(this.message[4]), 0, 127, 0, this.w);
}
if(this.message[3]==3){
  this.posY =this.map(Number(this.message[4]), 0, 127, 0, this.h);
}
if(this.message[3]==4){
  this.segment =this.map(Number(this.message[4]), 0, 127, 1, 360);
}
  }

    this.ctx.beginPath();
    for(let i = 0 ; i<360; i+= 360/this.segment){
      const x = this.posX + Math.cos( i * Math.PI / 180) * this.rayon
      const y = this.posY + Math.sin( i * Math.PI / 180) * this.rayon
      if(i==0){
        this.ctx.moveTo(x,y)
      }
      this.ctx.lineTo(x,y);
    }
    //this.ctx.arc(this.posX + this.w/2, this.posY, this.rayon * 2, 0, Math.PI *2,false );
    this.ctx.fill();
    this.ctx.closePath();

    requestAnimationFrame(this.draw.bind(this));
  }

  onmessage(message){
console.log(message);
this.message = message;

  }

  map(x, in_min, in_max, out_min, out_max){
    return(x-in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
};

window.onload = function() {
  new Music();
}

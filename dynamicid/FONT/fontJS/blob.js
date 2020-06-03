class Blob {

  constructor(x, y ) {
    this.x = x;
    this.y = y;
    this.r = random(20,60);
  }

  update() {
 

  }

  show() {
    fill(255)
    ellipse(this.x, this.y, this.r);

  }
}

// class Blob {

//   constructor(x, y, ctx ) {
//     this.x = x;
//     this.y = y;
//     this.ctx = ctx
//     this.r = random(10, 80);
//   }

//   update(rU) {
 
//     this.rU = rU
  
//     //ellipse
   
//     this.gradient2 = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, (this.r + this.rU)/4 );
//     this.gradient2.addColorStop(0, "rgb(255,255,255)");
//     this.gradient2.addColorStop(1, "rgba(255,255,255,0)");
//     ellipse(this.x, this.y, (this.r) + this.rU);
//     this.ctx.fillStyle = this.gradient2;
//     this.ctx.fill();
//   }

//   show() {
//     //noFill();

//   }
// }
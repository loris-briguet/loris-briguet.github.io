var pos, target, vel, ctx, r, drag, strength, dragSlider, strengthSlider;

let luminosity = 1;
let luminosity2 = 0; // 0 - 1
let excitedValue = 0;
// let moveSound = [];

function preload() {
  // moveSound = ['soud/wii.mp3', 'soud/woo.mp3', 'soud/waa.mp3', 'soud/wee.mp3', 'soud/wuu.mp3']
  //jiggle = loadSound('sound/jiggle.mp3');
  //angry = loadSound('sound/angry.mp3');
  //move = loadSound(random(moveSound));
  //hell = loadSound('sound/hell.mp3');
}

function setup() {
  ctx = createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0, 0, 0);


  r = 60;
  posX = 0;
  posY = 0;
  targetX = 0;
  targetY = 0;
  velX = 0;
  velY = 0;

  drag = 0.1;
  strength = 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {


  //set up springs
  targetX = mouseX;
  targetY = mouseY;

  var forceX = targetX - posX;
  forceX *= strength;
  velX *= Math.exp(-drag);
  velX += forceX;

  var forceY = targetY - posY;
  forceY *= strength;
  velY *= Math.exp(-drag);
  velY += forceY;

  posX += velX;
  posY += velY;


  //position variable for bezier
  let p1 = {
    x: windowWidth / 2,
    y: windowHeight + 50
  };
  let p2 = {
    x: posX,
    y: posY
  };
  let p3 = {
    x: random(mouseX, mouseX - +200),
    y: random(mouseY, mouseY - +200)
  };

  let r1 = 500;
  let r2 = 500;
  let r3 = random(400, 600);
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  let angle2 = atan2(p1.y - p2.y, p1.x - p2.x);
  let anchor1 = {
    x: 0,
    y: 0
  };
  let anchor2 = {
    x: 0,
    y: 0
  };

  let offset1 = Math.PI * posX / 900;
  let offset2 = Math.PI * posY / 900;
  let offset3 = Math.PI * posX / 900;
  let offset4 = Math.PI * -posY / 900;


  anchor1.x = p1.x + r1 * Math.cos(angle + offset1);
  anchor1.y = p1.y + r1 * Math.sin(angle + offset2);

  anchor2.x = p2.x + r2 * Math.cos(angle2 + offset3);
  anchor2.y = p2.y + r2 * Math.sin(angle2 + offset4);


  let eyeAngle = PI + PI;
  let acc = (winMouseY - pwinMouseY) ** 2 + (winMouseX - pwinMouseX) ** 2;

  //color red + change eyes when exited
  if (acc > 250 && luminosity > 0.5) {
    excitedValue++;
    if (excitedValue > 50) {
      luminosity = 0.5;
      luminosity2 = Math.min(luminosity2 + 0.01, 0.3);
      eyeAngle = PI + QUARTER_PI;
      // angry.play()
    }

    // } else if (acc > 250 && pwinMouseX - winMouseX < 40) {
    //   p2.x = p2.x + random(-30, 30);
    //   p2.y = p2.y + random(-30, 30);
    // jiggle.play()
  } else {
    excitedValue = Math.max(excitedValue - 0.5, 0);

    if (excitedValue <= 0) {
      luminosity = Math.min(luminosity + 0.01, 1);
      luminosity2 = Math.max(luminosity2 - 0.01, 0); //fade speed
    }
  }

  // if (pwinMouseX !== winMouseX || pwinMouseY !== winMouseY){
  // move.play()
  // }
  let colorInt = int(random(55, 255));
  let col = color('hsl(0, 100%, ' + (luminosity * 100) + '%)');
  let col2 = color('hsla(0, 100%, ' + (luminosity2 * 100) + '%,0.4)');
  let col3 = color(colorInt);

  background(col2);


  //wiggle on mouse pressed
  if (mouseIsPressed) {
    anchor2.y = p2.y + r3 * Math.sin(angle2 + offset4);

    print('pressed')
  } 
  
    //set up bezier stroke clones

    stroke(55)
    bezier(p1.x * 1.95, p1.y, anchor1.x * 1.95, anchor1.y, anchor2.x * 1.95, anchor2.y, p2.x * 1.95, p2.y - 20);
    stroke(55)
    bezier(p1.x * 0.05, p1.y, anchor1.x * 0.05, anchor1.y, anchor2.x * 0.05, anchor2.y, p2.x * 0.05, p2.y - 25);
    stroke(65)
    bezier(p1.x * 1.95, p1.y, anchor1.x * 1.95, anchor1.y, anchor2.x * 1.95, anchor2.y, p2.x * 1.95, p2.y - 20);
    stroke(65)
    bezier(p1.x * 0.05, p1.y, anchor1.x * 0.05, anchor1.y, anchor2.x * 0.05, anchor2.y, p2.x * 0.05, p2.y - 25);
    stroke(75)
    bezier(p1.x * 1.95, p1.y, anchor1.x * 1.95, anchor1.y, anchor2.x * 1.95, anchor2.y, p2.x * 1.95, p2.y - 20);
    stroke(75)
    bezier(p1.x * 0.05, p1.y, anchor1.x * 0.05, anchor1.y, anchor2.x * 0.05, anchor2.y, p2.x * 0.05, p2.y - 25);
    stroke(85)
    bezier(p1.x * 1.95, p1.y, anchor1.x * 1.95, anchor1.y, anchor2.x * 1.95, anchor2.y, p2.x * 1.95, p2.y - 20);
    stroke(85)
    bezier(p1.x * 0.05, p1.y, anchor1.x * 0.05, anchor1.y, anchor2.x * 0.05, anchor2.y, p2.x * 0.05, p2.y - 25);
    stroke(95)
    bezier(p1.x * 1.95, p1.y, anchor1.x * 1.95, anchor1.y, anchor2.x * 1.95, anchor2.y, p2.x * 1.95, p2.y - 20);
    stroke(95)
    bezier(p1.x * 0.05, p1.y, anchor1.x * 0.05, anchor1.y, anchor2.x * 0.05, anchor2.y, p2.x * 0.05, p2.y - 25);
    stroke(105)
    bezier(p1.x * 1.85, p1.y, anchor1.x * 1.85, anchor1.y, anchor2.x * 1.85, anchor2.y, p2.x * 1.85, p2.y - 25);
    stroke(105)
    bezier(p1.x * 0.15, p1.y, anchor1.x * 0.15, anchor1.y, anchor2.x * 0.15, anchor2.y, p2.x * 0.15, p2.y - 25);
    stroke(115)
    bezier(p1.x * 1.75, p1.y, anchor1.x * 1.75, anchor1.y, anchor2.x * 1.75, anchor2.y, p2.x * 1.75, p2.y - 25);
    stroke(115)
    bezier(p1.x * 0.25, p1.y, anchor1.x * 0.25, anchor1.y, anchor2.x * 0.25, anchor2.y, p2.x * 0.25, p2.y - 25);
    stroke(125)
    bezier(p1.x * 1.65, p1.y, anchor1.x * 1.65, anchor1.y, anchor2.x * 1.65, anchor2.y, p2.x * 1.65, p2.y - 25);
    stroke(125)
    bezier(p1.x * 0.35, p1.y, anchor1.x * 0.35, anchor1.y, anchor2.x * 0.35, anchor2.y, p2.x * 0.35, p2.y - 25);
    stroke(135)
    bezier(p1.x * 1.55, p1.y, anchor1.x * 1.55, anchor1.y, anchor2.x * 1.55, anchor2.y, p2.x * 1.55, p2.y - 25);
    stroke(135)
    bezier(p1.x * 0.45, p1.y, anchor1.x * 0.45, anchor1.y, anchor2.x * 0.45, anchor2.y, p2.x * 0.45, p2.y - 25);
    stroke(145)
    bezier(p1.x * 1.45, p1.y, anchor1.x * 1.45, anchor1.y, anchor2.x * 1.45, anchor2.y, p2.x * 1.45, p2.y - 25);
    stroke(145)
    bezier(p1.x * 0.55, p1.y, anchor1.x * 0.55, anchor1.y, anchor2.x * 0.55, anchor2.y, p2.x * 0.55, p2.y - 25);
    stroke(155)
    bezier(p1.x * 1.9, p1.y, anchor1.x * 1.9, anchor1.y, anchor2.x * 1.9, anchor2.y, p2.x * 1.9, p2.y + 5);
    stroke(155)
    bezier(p1.x * 0.1, p1.y, anchor1.x * 0.1, anchor1.y, anchor2.x * 0.1, anchor2.y, p2.x * 0.1, p2.y);
    stroke(165)
    bezier(p1.x * 1.7, p1.y, anchor1.x * 1.7, anchor1.y, anchor2.x * 1.7, anchor2.y, p2.x * 1.7, p2.y);
    stroke(165)
    bezier(p1.x * 0.2, p1.y, anchor1.x * 0.2, anchor1.y, anchor2.x * 0.2, anchor2.y, p2.x * 0.2, p2.y);
    stroke(175)
    bezier(p1.x * 1.6, p1.y, anchor1.x * 1.6, anchor1.y, anchor2.x * 1.6, anchor2.y, p2.x * 1.6, p2.y);
    stroke(175)
    bezier(p1.x * 0.4, p1.y, anchor1.x * 0.4, anchor1.y, anchor2.x * 0.4, anchor2.y, p2.x * 0.4, p2.y);
    stroke(185)
    bezier(p1.x * 1.1, p1.y, anchor1.x * 1.1, anchor1.y, anchor2.x * 1.1, anchor2.y, p2.x * 1.1, p2.y);
    stroke(185)
    bezier(p1.x * 0.9, p1.y, anchor1.x * 0.9, anchor1.y, anchor2.x * 0.9, anchor2.y, p2.x * 0.9, p2.y);
    stroke(195)
    bezier(p1.x * 1.2, p1.y, anchor1.x * 1.2, anchor1.y, anchor2.x * 1.2, anchor2.y, p2.x * 1.2, p2.y);
    stroke(195)
    bezier(p1.x * 0.8, p1.y, anchor1.x * 0.8, anchor1.y, anchor2.x * 0.8, anchor2.y, p2.x * 0.8, p2.y);
    stroke(205)
    bezier(p1.x * 1.3, p1.y, anchor1.x * 1.3, anchor1.y, anchor2.x * 1.3, anchor2.y, p2.x * 1.3, p2.y);
    stroke(205)
    bezier(p1.x * 0.7, p1.y, anchor1.x * 0.7, anchor1.y, anchor2.x * 0.7, anchor2.y, p2.x * 0.7, p2.y);
    stroke(215)
    bezier(p1.x * 1.4, p1.y, anchor1.x * 1.4, anchor1.y, anchor2.x * 1.4, anchor2.y, p2.x * 1.4, p2.y + 35);
    stroke(215)
    bezier(p1.x * 0.6, p1.y, anchor1.x * 0.6, anchor1.y, anchor2.x * 0.6, anchor2.y, p2.x * 0.6, p2.y + 35);
    stroke(225)
    bezier(p1.x * 2, p1.y, anchor1.x * 2, anchor1.y, anchor2.x * 2, anchor2.y, p2.x * 2, p2.y + 25);
    stroke(225)
    bezier(p1.x * 0, p1.y, anchor1.x * 0, anchor1.y, anchor2.x * 0, anchor2.y, p2.x * 0, p2.y + 25);
    stroke(235)
    bezier(p1.x * 1.8, p1.y, anchor1.x * 1.8, anchor1.y, anchor2.x * 1.8, anchor2.y, p2.x * 1.8, p2.y + 15);
    stroke(235)
    bezier(p1.x * 0.3, p1.y, anchor1.x * 0.3, anchor1.y, anchor2.x * 0.3, anchor2.y, p2.x * 0.3, p2.y + 15);
    stroke(245)
    bezier(p1.x * 1.5, p1.y, anchor1.x * 1.5, anchor1.y, anchor2.x * 1.5, anchor2.y, p2.x * 1.5, p2.y + 5);
    stroke(245)
    bezier(p1.x * 0.5, p1.y, anchor1.x * 0.5, anchor1.y, anchor2.x * 0.5, anchor2.y, p2.x * 0.5, p2.y + 5);
  
  //set up bezier stroke
  strokeWeight(100 + posY / 9)
  stroke(col);
  noFill();
  bezier(p1.x, p1.y, anchor1.x, anchor1.y, anchor2.x, anchor2.y, p2.x, p2.y);
  // let steps = 16;
  // for (let i = 0; i <= steps; i++) {
  //   let t = i / steps;
  //   let x = bezierPoint(p1.x, anchor1.x, anchor2.x, p2.x, t);
  //   let y = bezierPoint(p1.y, anchor1.y, anchor2.y, p2.y, t);
  //   let tx = bezierTangent(p1.x, anchor1.x, anchor2.x, p2.x, t);
  //   let ty = bezierTangent(p1.y, anchor1.y, anchor2.y, p2.y, t);
  //   let a = atan2(ty, tx);
  //   a -= HALF_PI;
  //   stroke(255)
  //   strokeWeight(20)
  //   line(x - 50, y, cos(a) * 120 + x, sin(a) * 1 + y);
  //   line(x + 100, y, cos(a) * 120 + x, sin(a) * 1 + y);



    //set up worm eyes
    push();
    translate(posX, posY);
    rotate(-angle2);
    ellipseMode(CENTER);
    noStroke();
    fill(0);
    arc(-20, 15 + posY / 50, 17 + posY / 35, 17 + posY / 35, 0, eyeAngle, CHORD);
    arc(-20, -15 - posY / 50, 15 + posY / 35, 15 + posY / 35, 0, eyeAngle, CHORD);
    noFill()
    stroke(0)
    strokeWeight(10)
    pop();
  }
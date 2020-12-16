// let moveSound = [];

let worms = [];

function preload() {

  choir = loadSound('sound/choir_2.wav');
  choirLow = loadSound('sound/choir_1.wav');
  choirHigh = loadSound('sound/choir_3.wav');
}

var isChoir = true;
var isChoirLow = false;
var isChoirHigh = false;

function keyPressed() {
  if (keyCode == 49) {
    isChoir = false;
    isChoirLow = true;
    isChoirHigh = false;
  }
  if (keyCode == 50) {
    isChoir = true;
    isChoirLow = false;
    isChoirHigh = false;
  }
  if (keyCode == 51) {
    isChoir = false;
    isChoirLow = false;
    isChoirHigh = true;
  }
}

function setup() {

  noCursor()
  fft = new p5.FFT();

  // createCanvas(windowWidth, windowHeight);
  createCanvas(innerWidth, innerHeight);
  noStroke();

  choir.setVolume(0, 0);
  choirLow.setVolume(0, 0);
  choirHigh.setVolume(0, 0);

  choir.loop();
  choirLow.loop();
  choirHigh.loop();



  let count = 20;

  for (let i = 0; i < count; i++) {
    let newWorm = new Worm();
    newWorm.offsetX = map(i, 0, count, -width / 2, 0);
    if (i % 2 == 0) {
      newWorm.offsetX = -newWorm.offsetX;
    }
    newWorm.offsetY = map(i, 0, count, height / 2, 0);
    newWorm.drag = map(i, 0, count, .2, .1);
    newWorm.strength = map(i, 0, count, 0.005, 0.02);
    newWorm.luminosity = map(i, 0, count, 10, 100);
    worms.push(newWorm);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {




  if (mouseX == 0 && mouseY == 0) {
    mouseX = width / 2;
    mouseY = 0 + height / 4;

  }


  background(0);
  for (let i = 0; i < worms.length; i++) {
    worms[i].draw();
  }


  let panning = map(mouseX, 0, width, -1.0, 1.0);
  let speed = map(mouseY, 0.1, height, 2.2, 0.5);



  if (mouseIsPressed || keyIsDown(65) || keyIsDown(83) || keyIsDown(68) || keyIsDown(70) || keyIsDown(71) || keyIsDown(72) || keyIsDown(74) || keyIsDown(75)) {
    if (isChoir) {
      choir.setVolume(1, 0.3);
      choir.pan(constrain(panning, -1, 1));
      choir.rate(speed);
    } else if (isChoirHigh) {
      choirHigh.setVolume(1, 0.3);
      choirHigh.pan(constrain(panning, -1, 1));
      choirHigh.rate(speed);
    } else if (isChoirLow) {
      choirLow.setVolume(1, 0.3);
      choirLow.pan(constrain(panning, -1, 1));
      choirLow.rate(speed);
    }

  } else {
    if (isChoir) {
      if (choir.isPlaying()) {
        choir.setVolume(0, 0.3);
      }
    } else if (isChoirHigh) {
      if (choirHigh.isPlaying()) {
        choirHigh.setVolume(0, 0.3);
      }
    } else if (isChoirLow) {
      if (choirLow.isPlaying()) {
        choirLow.setVolume(0, 0.3);
      }
    }

  }

}


// function keyPressed() {
//   if (keyCode === 49) {
//     if (mouseIsPressed || keyIsDown(65) || keyIsDown(83) || keyIsDown(68) || keyIsDown(70) || keyIsDown(71) || keyIsDown(72) || keyIsDown(74) || keyIsDown(75)) {
//       choirLow.setVolume(1, 0.3);
//       choirLow.pan(constrain(panning, -1, 1));
//       choirLow.rate(speed);
//     } else {
//       if (choirLow.isPlaying()) {
//         choirLow.setVolume(0, 0.3);
//       }
//     }

//   } else if (keyCode === 50) {
//     if (mouseIsPressed || keyIsDown(65) || keyIsDown(83) || keyIsDown(68) || keyIsDown(70) || keyIsDown(71) || keyIsDown(72) || keyIsDown(74) || keyIsDown(75)) {
//       choir.setVolume(1, 0.3);
//       choir.pan(constrain(panning, -1, 1));
//       choir.rate(speed);
//     } else {
//       if (choir.isPlaying()) {
//         choir.setVolume(0, 0.3);
//       }
//     }

//   } else if (keyCode === 51) {
//     if (mouseIsPressed || keyIsDown(65) || keyIsDown(83) || keyIsDown(68) || keyIsDown(70) || keyIsDown(71) || keyIsDown(72) || keyIsDown(74) || keyIsDown(75)) {
//       choirHigh.setVolume(1, 0.3);
//       choirHigh.pan(constrain(panning, -1, 1));
//       choirHigh.rate(speed);
//     } else {
//       if (choirHigh.isPlaying()) {
//         choirHigh.setVolume(0, 0.3);
//       }
//     }

//   } else{
//     if (mouseIsPressed || keyIsDown(65) || keyIsDown(83) || keyIsDown(68) || keyIsDown(70) || keyIsDown(71) || keyIsDown(72) || keyIsDown(74) || keyIsDown(75)) {
//       choir.setVolume(1, 0.3);
//       choir.pan(constrain(panning, -1, 1));
//       choir.rate(speed);
//     } else {
//       if (choir.isPlaying()) {
//         choir.setVolume(0, 0.3);
//       }
//     }
//   }
//}
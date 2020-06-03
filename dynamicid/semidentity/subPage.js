let letter_S, letter_E, letter_M;

let circLayer;
let logoLayer;
let mouseR = 60;

let zoom = .41;
let img

let gridCoor = {
  x: [],
  y: [],
};

let xp = 0;
let yp = 0;

let gridX = 14;
let gridY = 11;
let gridL = 140;

const CALENDAR = {

  dayDuration: 1000 * 60 * 60 * 24,

  "Calendar": "input",
  "input": undefined,

  "N of Days": "140 days",

  eventDuration: {
    "30 days": 30,
    "35 days": 35,
    "120 days": 120,
    "140 days": 140,
  },

  getFormattedDate(dateObject) {

    let date = dateObject;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    return {
      day,
      month,
      year
    };
  },
}


function preload() {
  img = loadImage('assets/1.jpg')

  font = loadFont('assets/font/SpaceMono-Bold.ttf');
  fontReg = loadFont('assets/font/SpaceMono-Italic.ttf');
  fontIta = loadFont('assets/font/SpaceMono-Regular.ttf');

  TABLE = loadTable('assets/sheet/program.csv', 'csv', 'header');
}

function setup() {
 let mainCanvas = createCanvas(windowWidth, windowHeight);

 mainCanvas.parent('main-canvas-container');

 noCursor();

 logoLayer = createGraphics(width, height);
 circLayer = createGraphics(width, height);


 let pxDensity = .5 || window.devicePixelRatio;
 logoLayer.pixelDensity(pxDensity);
 circLayer.pixelDensity(pxDensity); 

 letter_S = new Letter({
  x: 40,
  y: 40,
  txt: 'S',
});
 letter_E = new Letter({
  x: 200,
  y: 40,
  txt: 'E',
});
 letter_M = new Letter({
  x: 380,
  y: 40,
  txt: 'M',
});


 fitCanvasToParent();
}

function fitCanvasToParent() {
  let container = drawingContext.canvas.parentElement;
  resizeCanvas(container.offsetWidth, container.offsetHeight);

  // logoLayer.width = circLayer.width = 100;
  // logoLayer.height = circLayer.height = height;

}


function draw() {
  // return;
  // background( '#430CE8 ');
  clear();

  ////Update Layers
  updateBlobsLogo();

  // console.log(drawingContext);

  drawTextLogo();
  drawBlobsLogo();

}

function windowResized() {
  fitCanvasToParent();
}

function drawTextLogo() {
  push();
  scale(zoom);
  noStroke();
  fill(220)
  letter_S.drawText();
  letter_E.drawText();
  letter_M.drawText();
  pop();
}

function updateBlobsLogo() {
  logoLayer.clear();
  logoLayer.drawingContext.filter = 'url(#blur-logo)';
  //logoLayer.image(img, 200, 200)
  logoLayer.drawingContext.save();
  logoLayer.push()
  logoLayer.scale(zoom);
  logoLayer.noStroke();
  logoLayer.fill(220);
  letter_S.drawBlobs(logoLayer);
  letter_E.drawBlobs(logoLayer);
  letter_M.drawBlobs(logoLayer);
  logoLayer.pop()


  logoLayer.drawingContext.restore();
}

function drawBlobsLogo() {

  drawingContext.filter = 'url(#colormatrix-logo)';
  image(logoLayer, 0, 0);
  drawingContext.filter = 'none';

}
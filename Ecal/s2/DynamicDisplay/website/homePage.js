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
  createCanvas(windowWidth, windowHeight);
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
}

function draw() {
  background( '#430CE8 ');
  if (keyIsDown(UP_ARROW)) {
    mouseR = mouseR+10;
  } else   if (keyIsDown(DOWN_ARROW)) {
    mouseR = mouseR-10;
  }

  ////Update Layers
  updateBlobsLogo();
  drawTextLogo();
  drawBlobsLogo();
  updateCircles();


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

function updateCircles() {



  ////Draw Coordinates for Circles
  for (let y = 1; y < gridY; y++) {
    for (let x = 1; x < gridX; x++) {

      if (gridCoor.x.length < (gridX - 1) * (gridY - 1)) {
        gridCoor.x.push((x * windowWidth / gridX))
        gridCoor.y.push((y * windowHeight / gridY))
        // console.log(gridCoor.x)
      }
    }
  }


  ////Draw circle to right size

  ////Get number of days Between start and event
  let presDate = []
  let dateDiff = []
  let dataEvent = [];
  let startDate = new Date('08.10.2020');
  let oneDay = CALENDAR.dayDuration;

  for (let i = 0; i < TABLE.rows.length; i++) {

    let currRow = TABLE.rows[i];
    let [date, artist, country, type] = currRow.arr; //es6 destructuring

    presDate[i] = new Date(date)
    dataEvent.push(type)
    dateDiff.push(Math.floor(((presDate[i].getTime() - (oneDay / 24)) - startDate.getTime()) / oneDay), dataEvent[i])

  }
  ////Push event in correct array
  let myArray = dateDiff

  let arrays = {}
  for (let i = 0; i < myArray.length; i += 2) {
    const arrayName = myArray[i + 1];

    if (arrays[arrayName]) {
      arrays[arrayName].push(myArray[i])
    } else {
      arrays[arrayName] = [myArray[i]]
    }
  }

  circLayer.noStroke();
  circLayer.clear();
  circLayer.fill(220, 255);
  circLayer.drawingContext.filter = 'url(#blur)';

  xp += ((mouseX-xp)/6)
  yp += ((mouseY-yp)/6)
  circLayer.ellipse(xp, yp, mouseR)
  ////Draw the circles
  for (let i = 0; i < gridCoor.x.length; i++) {
    if (arrays['TALK'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount -1000) / 45) + 6) * 10)
    } else if (arrays['PERFORMANCE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount + 102) / 35) + 6) * 16)
    } else if (arrays['VERNISSAGE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount + 378) / 50) + 6) * 22)
    } else if (arrays['FINISSAGE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount + 499) / 40) + 6) * 22)
    } else if (arrays['MASTERCLASS'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount +222) / 30) + 6) * 18)
    } else if (arrays['INITIATION'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], (sin((frameCount - 467) / 55) + 6) * 12)
    } else {}
  }

  drawingContext.filter = 'url(#colormatrix)';
  noStroke();
  image(circLayer, 0, 0);
  drawingContext.filter = 'none';

}

function keyPressed() {

}
'use strict';

let ctx;

let circLayer; //layer where metaballs are drawn
let logoLayer;
let canvas;

let gridCoor = {
  x: [],
  y: [],
};

let TABLE;

let gridX, gridY, gridL;

let letter_S, letter_E, letter_M;

let paper = {
  width: 1 * 500,
  height: 1.41 * 500,
}

let paperPos = {
  x: 100,
  y: 100,
}

let enventDate = {
  perfo: [],
  vernis: [],
  master: [],
  innit: [],
  talk: []
}

let startDateForm = {
  d: 'hh',
  m: '',
  y: ''
}
let endDateForm = {
  d: '',
  m: '',
  y: ''
}

let printPoster = false;

let zoom = .41;

let parseData = [];
let dateDataNew = [];

let font, fontReg, fontIta

let GUI_APP;

const FILE = {
  "File": "input",
  "input": undefined,
}

const FILTER = {
  "inputThreshold": 75,
  "outputThreshold": 15,
  "blur": 20,
}

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

  get lastDay() { //getter
    let key = this["N of Days"];
    let nDays = this["eventDuration"][key];
    let startDate = this.input.valueAsDate;

    let endDay = new Date(startDate.getTime() + (this.dayDuration * nDays));

    return this.getFormattedDate(endDay);
  },

  get firstDay() {
    return this.getFormattedDate(this.input.valueAsDate);
  }
}
let palette;
const COLOR_SET = {

  "Set": "Set 1", //default value,

  get palette() { //getter
    let setName = this["Set"];
    return this.palettes[setName];
  },

  palettes: {
    "Set 1": {
      c1: '#FF0000',
      c2: 220,
      c3: 220,
      c4: 220,
    },

    "Set 2": {
      c1: '#D0FFFE',
      c2: 70,
      c3: 70,
      c4: 70,
    },

    "Set 3": {
      c1: '#430CE8',
      c2: 220,
      c3: 220,
      c4: 220,
    },

    "Set 4": {
      c1: '#8BFF0D',
      c2: 70,
      c3: 70,
      c4: 70,
    },
  }
}

const DISPLAY = {
  'guide': true,
  'text': true,
  'logo': true,
  'metaballs': true,
}

function preload() {
  font = loadFont('assets/font/SpaceMono-Bold.ttf');
  fontReg = loadFont('assets/font/SpaceMono-Italic.ttf');
  fontIta = loadFont('assets/font/SpaceMono-Regular.ttf');

  TABLE = loadTable('assets/sheet/program.csv', 'csv', 'header');
}

function setup() {

  canvas = createCanvas(paper.width, paper.height);
  let pxDensity = 4 || window.devicePixelRatio;


  circLayer = createGraphics(width, height);
  logoLayer = createGraphics(width, height);

  pixelDensity(pxDensity);
  circLayer.pixelDensity(pxDensity);
  logoLayer.pixelDensity(pxDensity);

  ctx = canvas.drawingContext;
  background(220);

  letter_S = new Letter({
    x: 40,
    y: 75,
    txt: 'S',
  });
  letter_E = new Letter({
    x: 200,
    y: 75,
    txt: 'E',
  });
  letter_M = new Letter({
    x: 380,
    y: 75,
    txt: 'M',
  });

  //init GUI————————————————————————————————————
  GUI_APP = new dat.GUI();

  let colorSetFolder = GUI_APP.addFolder('Colors');
  colorSetFolder.add(COLOR_SET, "Set", Object.keys(COLOR_SET.palettes).sort()).onChange(function () {
    updateLayers();
  });


  let calendarFolder = GUI_APP.addFolder('Calendar');
  CALENDAR.input = calendarFolder.add(CALENDAR, "Calendar").domElement.querySelector('input');
  CALENDAR.input.setAttribute("type", "date");
  CALENDAR.input.valueAsDate = new Date(); //set current date
  CALENDAR.input.valueAsDate = new Date('08.08.2020'); //set Base date
  calendarFolder.add(CALENDAR, "N of Days", Object.keys(CALENDAR.eventDuration)).onChange(function () {

    updateLayers();
  });
  CALENDAR.input.addEventListener('change', function () {
    updateLayers();
  });

  let displayFolder = GUI_APP.addFolder('Display');
  displayFolder.add(DISPLAY, 'guide');
  displayFolder.add(DISPLAY, 'logo');
  displayFolder.add(DISPLAY, 'text');
  displayFolder.add(DISPLAY, 'metaballs');

  FILE.input = GUI_APP.add(FILE, "File").domElement.querySelector('input');
  FILE.input.setAttribute("type", "file");
  FILE.input.addEventListener('change', read);

  let metaballsFolder = GUI_APP.addFolder('Metaballs');
  metaballsFolder.add(FILTER, 'inputThreshold').min(0).max(150);
  metaballsFolder.add(FILTER, 'outputThreshold').min(5).max(50);
  metaballsFolder.add(FILTER, 'blur').min(5).max(25).step(0.1).onChange(function () {
    updateLayers();
  });


  colorSetFolder.open();
  calendarFolder.open();
  metaballsFolder.open();
  displayFolder.open();
  //init GUI————————————————————————————————————

  palette = COLOR_SET.palette;
  updateLayers();
}

function updateLayers() {
  setLayout(CALENDAR["N of Days"]);
  palette = COLOR_SET.palette;
  updateBlobsLogo();
  updateCircles();
}

function drawGuides() {
  stroke(0, 255, 255)
  line(paper.width / 2 - 3, 0, paper.width / 2 - 3, paper.height);
  line(paper.width / 2 + 3, 0, paper.width / 2 + 3, paper.height);
  line(paper.width - 30, 0, paper.width - 30, paper.height);
  line(30, 0, 30, paper.height);
  line(0, 30, paper.width, 30);
  line(0, paper.height - 30, paper.width, paper.height - 30);
}

function drawTitle() {
  ////Title
  textFont(font);
  textSize(40);
  textLeading(42);

  let startDay = CALENDAR.firstDay;
  let endDay = CALENDAR.lastDay;
  let formatStartDay = ("0" + startDay.day).slice(-2);
  let formatStartMonth = ("0" + startDay.month).slice(-2);
  let formatEndDay = ("0" + startDay.day).slice(-2);
  let formatEndMonth = ("0" + startDay.month).slice(-2);
  let formatEndYear = ("0" + endDay.year).slice(3);

  let textDate = 'PROGRAMME \n' + formatStartDay + '.' + formatStartMonth + ' — \n' + formatEndDay + '.' + formatEndMonth + '.' + formatEndYear
  text(textDate, paper.width / 2 + 2, paper.height - 180, paper.width / 2 + 2, paper.height);
  textSize(8);
  textLeading(17)
  let textDisclaimer = '*Les evenements seront annoncés sur notre\nsites web et nos réseaux sociaux'
  text(textDisclaimer, paper.width / 2 + 3, paper.height - 46, paper.width / 2 + 3, paper.height);
}

function drawProgram() {

  for (let i = 0; i < TABLE.rows.length; i++) {

    let currRow = TABLE.rows[i];
    let [date, artist, country, type] = currRow.arr; //es6 destructuring

    let [year, month, day] = date.split('-');

    let column = 30
    let tab = 40
    let row = 156
    if (i >= 18) {
      column = paper.width / 2 + 5
      row = -500
    }
    fill(palette.c2)
    textSize(10);
    textFont(font)
    text(day + '.' + month, column, row + 30 * i, )
    text(artist, column + tab, row + 30 * i, )
    textFont(fontReg)
    text('→ ' + type, column + tab, (row + 10) + 30 * i, )
    textFont(fontIta)
  }
}

function draw() {

  updateFilter();
  ///Draw Poster
  fill(palette.c1);
  rect(0, 0, paper.width, paper.height);

  if (DISPLAY.guide)
    drawGuides();

  noStroke();
  fill(palette.c2);

  if (DISPLAY.logo)
    drawTextLogo();

  ////Draw Text 
  if (DISPLAY.text) {
    drawTitle();
  }

  if (DISPLAY.text) {
    drawProgram();
  }

  if (DISPLAY.metaballs)
    drawCircles();

  if (DISPLAY.logo)
    drawBlobsLogo();

    console.log(CALENDAR.input.valueAsDate)
}

function updateBlobsLogo() {
  logoLayer.clear();
  logoLayer.drawingContext.filter = 'url(#blur-logo)';

  logoLayer.drawingContext.save();
  logoLayer.scale(zoom);
  logoLayer.noStroke();
  logoLayer.fill(palette.c2);
  letter_S.drawBlobs(logoLayer);
  letter_E.drawBlobs(logoLayer);
  letter_M.drawBlobs(logoLayer);
  logoLayer.drawingContext.restore();
}

function drawBlobsLogo() {

  drawingContext.filter = 'url(#colormatrix-logo)';
  image(logoLayer, 0, 0);
  drawingContext.filter = 'none';

}

function drawTextLogo() {
  push();
  scale(zoom);
  letter_S.drawText();
  letter_E.drawText();
  letter_M.drawText();
  pop();
}

function updateCircles() {



  ////Draw Coordinates for Circles
  for (let y = 1; y < gridY; y++) {
    for (let x = 1; x < gridX; x++) {

      if (gridCoor.x.length < (gridX - 1) * (gridY - 1)) {
        gridCoor.x.push((x * paper.width / gridX))
        gridCoor.y.push((y * paper.height / gridY))
      }
    }
  }

  ////Draw circle to right size


  ////Get number of days Between start and event
  let presDate = []
  let dateDiff = []
  let dataEvent = [];
  let startDate = CALENDAR.input.valueAsDate;
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
  circLayer.fill(palette.c2, 255);
  circLayer.drawingContext.filter = 'url(#blur)';
  ////Draw the circles
  for (let i = 0; i < gridCoor.x.length; i++) {
    if (arrays['TALK'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 20)
    } else if (arrays['PERFORMANCE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 45)
    } else if (arrays['VERNISSAGE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 70)
    } else if (arrays['FINISSAGE'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 70)
    } else if (arrays['MASTERCLASS'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 55)
    } else if (arrays['INITIATION'].indexOf(i + 1) !== -1) {
      circLayer.ellipse(gridCoor.x[i], gridCoor.y[i], 30)
    } else {}
  }


}

function drawCircles() {
  drawingContext.filter = 'url(#colormatrix)';
  noStroke();
  image(circLayer, 0, 0);
  drawingContext.filter = 'none';
}


function setLayout(nDays) {

  const layout = {
    30: {
      gridCoorX: 0,
      gridCoorY: 0,
      gridX: 6,
      gridY: 7,
      gridL: 30,
    },

    35: {
      gridCoorX: 0,
      gridCoorY: 0,
      gridX: 6,
      gridY: 8,
      gridL: 35,
    },

    120: {
      gridCoorX: 0,
      gridCoorY: 0,
      gridX: 11,
      gridY: 13,
      gridL: 120,
    },

    140: {
      gridCoorX: 0,
      gridCoorY: 0,
      gridX: 11,
      gridY: 15,
      gridL: 140,
    },

    'default': {
      gridCoorX: 0,
      gridCoorY: 0,
      gridX: 0,
      gridY: 0,
      gridL: 0,
    }
  }

  let selectedLayout = layout[CALENDAR.eventDuration[nDays] || 'default'];

  gridCoor.x.length = selectedLayout.gridCoorX;
  gridCoor.y.length = selectedLayout.gridCoorY;
  gridX = selectedLayout.gridX;
  gridY = selectedLayout.gridY;
  gridL = selectedLayout.gridL;
}

function windowResized() {

  // resizeCanvas(windowWidth, windowHeight);

}

function updateFilter() {
  const colorMatrix = document.querySelector('#colormatrix feColorMatrix');
  colorMatrix.values.baseVal[18].value = FILTER.inputThreshold;
  colorMatrix.values.baseVal[19].value = -FILTER.outputThreshold;

  const blur = document.querySelector('#blur feGaussianBlur');
  blur.stdDeviationX.baseVal = FILTER.blur
  blur.stdDeviationY.baseVal = FILTER.blur;
}

//// Read CVS File
function read(event) {
  let cvs = this.files[0]
  let reader = new FileReader();
  reader.onload = function (e) {

    loadTable(reader.result, 'csv', 'header', function (table) {
      TABLE = table;
      console.log('New table loaded');
    });
  }
  reader.readAsDataURL(cvs);
}
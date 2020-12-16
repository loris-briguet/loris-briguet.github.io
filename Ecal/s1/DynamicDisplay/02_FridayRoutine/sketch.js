let capture;
let scanning;
var I = []
var I11 = [];
var I12 = [];
var I13 = [];
var I14 = [];
var I15 = [];
var I16 = [];
var I17 = [];
var I18 = [];
var I19 = [];
var I20 = [];


var images = {
    "work": [],
    "school": [],
    "hangover": [],
    "editing": [],
    "breakfast": [],
    // "gaming": [],
    //"clubbing": [],
    //"rave": [],
    //"vodka": [],
    //"sleep": [],
    //"alcohol": [],
    //"regrets": [],
    //"uber": [],
    //"youtube": [],
    //"puke": [],
    //"home": [],
    //"water": [],
    //"coffee": [],
    //"wakeup": [],
    //"shower": [],
    //"alarm": [],
    //"cuddles": [],
    //"bus": [],
    //"train": [],
    //"greentea": [],
    //"cook": [],
    //"makeup": [],
    //"dressup": [],
    //"workout": [],
    //"cigarette": [],
    //"meeting": [],
    //"break": [],
    //"toilets": [],
    //"music": [],
    //"code": [],
    //"lunch": [],
    //"kebab": [],
    //"babyfoot": [],
    //"talk": [],
    //"beer": [],
    //"car": [],
    //"drunk": [],
    //"joint": [],
    //"dinner": [],
    //"relax": [],
    //"netflix": [],
}

var hours = {

    0: ["clubbing", "rave", "clubbing", "vodka", "work", "sleep", "clubbing"],
    1: ["alcohol", "sleep", "regrets", "clubbing", "rave", "clubbing", "clubbing", "gaming", "clubbing"],
    2: ["uber", "rave", "uber", "clubbing", "youtube", "clubbing", ],
    3: ["puke", "sleep", "sleep", "sleep", "sleep", "clubbing", "rave", "home", "water", ],
    4: ["sleep", "sleep", "sleep", "sleep", "sleep", "rave", "regrets"],
    5: ["sleep", "sleep", "sleep", "sleep", "sleep", "sleep", "sleep"],
    6: ["breakfast", "coffee", "coffee", "wakeup", "wakeup", "wakeup", "wakeup", "shower", "alarm", "alarm", "cuddles", "sleep", "sleep", "sleep", ],
    7: ["bus", "breakfast", "train", "greentea", "alarm", "cook", "coffee", "makeup", "dressup", "bus", "workout", "sleep", "breakfast", "sleep", ],
    8: ["cigarette", "school", "work", "work", "sleep", "workout", "cigarette", "work", "school", "sleep", "school", "wakeup", "coffee", ],
    9: ["code", "work", "break", "break", "break", "break", "meeting", "wakeup", "work", "toilets", "sleep", "school", "train", "music", ],
    10: ["code", "coffee", "school", "work", "bus", "work", "hangover", "work", "school", "sleep", "work", "coffee", ],
    11: ["lunch", "kebab", "work", "lunch", "work", "work", "work", "lunch", "coffee", "cigarette", "school", ],
    12: ["coffee", "cigarette", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "lunch", "babyfoot", "work", "talk", ],
    13: ["hangover", "editing", "work", "work", "work", "work", "work", "gaming", "school", ],
    14: ["work", "work", "work", "work", "meeting", "work", "school", "gaming", "school"],
    15: ["work", "work", "work", "work", "work", "school", "school", "break", "break", "break", ],
    16: ["work", "work", "work", "school", "school", "school", "school", "break", "beer", "beer", "beer", ],
    17: ["beer", "beer", "beer", "gaming", "car", "train", "break", ],
    18: ["beer", "beer", "beer", "beer", "work", "work", "sleep", "home", "work", "work", "train"],
    19: ["work", "work", "sleep", "drunk", "joint", "alcohol", "sleep", "beer", "dinner", ],
    20: ["dinner", "dinner", "relax", "work", "vodka", "alcohol", "alcohol", "beer", ],
    21: ["dinner", "dinner", "relax", "work", "vodka", "alcohol", "alcohol", "beer", ],
    22: ["sleep", "puke", "alcohol", "alcohol", "alcohol", "clubbing", "beer", ],
    23: ["clubbing", "clubbing", "clubbing", "clubbing", "clubbing", "beer", "sleep", "work", "netflix", ],

}

let currArray = 11;

const inkOptions = {
    dither: 'none', //dithering: 'bayer', 'none', 'floyd-steinberg'
    invert: false, //invert frame: removes ghosting
    dimensions: [2560, 1440] //portrait orientation: [1440, 2560] 
}

function preload() {
    let directory = './rsrc/';

    for (let typeName in images) {
        images[typeName] = loadImages(directory + typeName + '/', 61);
    }
}

function loadImages(path, n) {
    let images = [];

    for (let i = 0; i < n; i++) {

        let img = loadImage(path + i + '.jpg');
        images.push(img);

    }

    return images;

}


function setup() {

    Clock.init({
        date: new Date(),
        trueTime: false
    }); //date: start time, trueTime: if false, the time is only updated by Clock.tick();

    Ink.connect({ id: 'FridayRoutine', options: inkOptions}); //connect to eInk via a server to display image

    createCanvas(...inkOptions.dimensions);
    pixelDensity(1);
    frameRate(1);
    background(0);
}

function randomImageByHour(hour) {

    let currTypes = hours[hour];
    let randomType;

    while (true) {
        let currType = UTILS.randomElem(currTypes);
        if (currType in images) {
            randomType = currType;
            break;
        }
    }

    return UTILS.randomElem(images[randomType]);

}

function draw() {
    rectMode(CENTER)
    blendMode(DIFFERENCE)
    frameRate(1);
    rectMode(CENTER)
    let i = Clock.getSeconds();
    let m = Clock.getMinutes();
    let h = Clock.getHours();


    let img = randomImageByHour(h);
    image(img, 0, 0, width, height);
    filter(GRAY);

    Clock.tick(); //updates clock when trueTime is set to false
    Clock.display({
        scale: 1,
        black: true
    }); //display time on top left of canvas    
    Ink.capture(); //send screenshot of canvas to eInk

    console.log(Clock.getSeconds());
}

Clock.onMinuteChange = function (event) { //other events examples: Clock.onSecondChange, Clock.onHourChange
    console.log('Minutes changed:', event.value);
    blendMode(BLEND)
    rect(0, 0, 2560 * 2, 1440 * 2)
    if (currArray <= 20) {
        currArray++
    } else {
        currArray = 11;
    }
}

const UTILS = {
    randomElem(arr) {
        let index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }


}
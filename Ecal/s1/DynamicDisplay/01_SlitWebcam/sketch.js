let CAPTURE = new Image();

let CORS_SERVER = 'http://localhost:3000/';
let WEBCAM_URL = 'http://166.254.49.241/mjpg/video.mjpg#.Xih4NQ_mVK8.link';
//let WEBCAM_URL = 'http://212.51.246.241/mjpg/video.mjpg#.Xig1Y5CBcF0.link';

let CV2;

function setup() {

    Clock.init({
        date: new Date(),
        trueTime: false
    }); //date: start time, trueTime: if false, the time is only updated by Clock.tick();

    const inkOptions = {
        dither: 'bayer', //dithering: 'bayer', 'none', 'floyd-steinberg'
        invert: false, //invert frame: removes ghosting
        dimensions: [2560, 1440] //portrait orientation: [1440, 2560] 
    }

   Ink.connect({ id: 'SlitWebcam', options: inkOptions}); //connect to eInk via a server to display image
    createCanvas(...inkOptions.dimensions);
    pixelDensity(1);
    //frameRate(1);

    CAPTURE.src = CORS_SERVER + WEBCAM_URL;
    CAPTURE.crossOrigin = "anonymous";
    // console.log(CORS)

    background(0);
    SCANNING = true;

    CV2 = createGraphics(width, height);

    
    noStroke();
}

function drawPixelsRectangle(startX, startY, endX, endY) {

    for (let x = startX; x < endX; x++) {
        for (let y = startY; y < endY; y++) {
            let col = CV2.get(x, y);
            fill(col);
            rect(x, y, 1, 1);
        }
    }
}

function draw() {

    let m = Clock.getMinutes();
    let s = Clock.getSeconds();

    //draw video on CV2
    CV2.drawingContext.drawImage(CAPTURE, 0, 0, CV2.width, CV2.height);

    let lineWeight = 200;

    let x1 = 0;
    let y1 = 0;
    let x2 = width;
    let y2 = height;


    if (UTILS.isUneven(s) === true) {
        //draw vertically
        x1 = random(0, width);
        x2 = x1+lineWeight;

    } else {
        //draw horizontally
        y1 = random(0, height);
        y2 = y1+lineWeight; 
    }

    drawPixelsRectangle(x1, y1, x2, y2);

    filter(GRAY);
    blendMode(BLEND)

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
}

const UTILS = {
    isUneven(n) {
        return !(n % 2 === 0);
    }

}



let capture;
let scanning;

let time = 0;
let img;
let myCityInfos = {};

let myCityOrder = ['Abidjan',
    'Kumasi',
    'Mopti',
    'Farafenni',
    'Bissau',
    'Conakry',
    'Touba',
    'Bo',
    'Lomé',
    'Monrovia',
    'Kakata',
    'Néma',
    'Banfora',
    'Arona',
    'Reykjavík',
    'London',
    'Porto',
    'Le Hocq',
    'Douglas',
    'Georgetown',
    'Funchal',
    'Miðvágur',
    'Rosso',
];


function preload() {
    img = loadImage('img/map.png');
}

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



    Ink.connect({ id: 'Its12Somewhere', options: inkOptions}); //connect to eInk via a server to display image

    createCanvas(...inkOptions.dimensions);
    pixelDensity(1);
    background(0);
    frameRate(1);

    myCityInfos = {
        'Abidjan': {
            x: 920,
            y: 200
        },
        'Kumasi': {
            x: 915,
            y: 215
        },
        'Mopti': {
            x: 950,
            y: 235
        },
        'Farafenni': {
            x: 1070,
            y: 230
        },
        'Bissau': {
            x: 1060,
            y: 215
        },
        'Conakry': {
            x: 1060,
            y: 195
        },
        'Touba': {
            x: 1065,
            y: 200
        },
        'Bo': {
            x: 1045,
            y: 175
        },
        'Lomé': {
            x: 940,
            y: 170
        },
        'Monrovia': {
            x: 1025,
            y: 165
        },
        'Kakata': {
            x: 1035,
            y: 165
        },
        'Néma': {
            x: 1030,
            y: 250
        },
        'Banfora': {
            x: 1000,
            y: 190
        },
        'Arona': {
            x: 1090,
            y: 265
        },
        'Reykjavík': {
            x: 1260,
            y: 545
        },
        'London': {
            x: 1120,
            y: 420
        },
        'Porto': {
            x: 1110,
            y: 350
        },
        'Le Hocq': {
            x: 1115,
            y: 405
        },
        'Douglas': {
            x: 1140,
            y: 425
        },
        'Georgetown': {
            x: 1830,
            y: 175
        },
        'Funchal': {
            x: 1115,
            y: 280
        },
        'Miðvágur': {
            x: 1180,
            y: 460
        },
        'Rosso': {
            x: 1070,
            y: 220
        },
    };
}

function draw() {
    let m = minute();
    let h = hour();

    ////add 0 before hour an minute
    if (m < 10) {
        m = '0' + m
    }
    if (h < 10) {
        h = '0' + m
    }

    /// BackGround Image
    image(img, 0, 0, 2560, 1440)

    /// Write GMT On Top Left
    if (h < 12 + 1) {
        GMTTime = 12 - h + 1;
        plusMinus = '+';
    } else if (h > 12 + 1) {
        GMTTime = h - 12 - 1;
        plusMinus = '-';
    } else if (h == 12 + 1) {
        GMTTime = '';
        plusMinus = '';
    }



    let currMinute = Clock.getSeconds();
    let cityIndex = Math.floor(map(currMinute, 0, 59, 0, myCityOrder.length - 1));
    let cityName = myCityOrder[cityIndex];
    let cityInfos = myCityInfos[cityName];

    myLatitude = cityInfos.x;
    myLongitude = cityInfos.y;
    margin = 10;
    fontSize = 200;


    console.log(cityIndex)


    if (myLongitude < 400) {
        if (myLatitude < 1580) {
            textAlign(LEFT);
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
            stroke(255);
            textSize(fontSize);
            push()
            translate(myLatitude, myLongitude)
            text("It’s 12:" + m + ' in', margin, fontSize - margin * 3);
            text(cityName, margin, fontSize * 2 - margin * 3)
            pop()
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
        } else {
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
            stroke(255);
            textSize(fontSize);
            push()
            translate(myLatitude, myLongitude)
            textAlign(RIGHT);
            text("It’s 12:" + m + ' in', -margin*2, fontSize - margin * 3);
            text(cityName, -margin*2, fontSize * 2 - margin * 3)
            pop()
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);

        }

    } else {
        if (myLatitude < 1580) {
            textAlign(LEFT);
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
            stroke(255);
            textSize(fontSize);
            text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize);
            text(cityName, myLatitude + margin, myLongitude - margin * 2)
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
        } else {
            textAlign(RIGHT);
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);
            stroke(255);
            textSize(fontSize);
            text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize);
            text(cityName, myLatitude + margin, myLongitude - margin * 2)
            line(myLatitude, 0, myLatitude, 1440);
            line(0, myLongitude, 2560, myLongitude);

        }
    }



    ///True Location

    ///GMT -12
    // if (h == 0) {
    //     frameRate(1 / 15)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Apia',
    //         'Nukunonu',
    //         'Alofi',
    //         'Tāfuna',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 1) {
    //     frameRate(1 / 6.6)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[1], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 2) {
    //     frameRate(1 / 7.5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 3) {
    //     frameRate(1 / 7.5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 4) {
    //     frameRate(1 / 8.5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 5) {
    //     frameRate(1 / 5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[1], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 6) {
    //     frameRate(1 / 5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 7) {
    //     frameRate(1 / 8.5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 8) {
    //     frameRate(1 / 5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 9) {
    //     frameRate(1 / 5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 10) {
    //     frameRate(1 / 2.7)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 11) {
    //     frameRate(1 / 1.6)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',
    //     'Brisbane',];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 12) {
    //     frameRate(1 / 1.25)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 13) {
    //     frameRate(1 / 2.6)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Abidjan',
    //         'Kumasi',
    //         'Mopti',
    //         'Farafenni',
    //         'Bissau',
    //         'Conakry',
    //         'Touba',
    //         'Bo',
    //         'Lomé',
    //         'Monrovia',
    //         'Kakata',
    //         'Néma',
    //         'Banfora',
    //         'Arona',
    //         'Reykjavík',
    //         'London',
    //         'Porto',
    //         'Le Hocq',
    //         'Douglas',
    //         'Georgetown',
    //         'Funchal',
    //         'Miðvágur',
    //         'Rosso',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 14) {
    //     frameRate(1 / 30)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Lagoa',
    //         'Praia'
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 15) {
    //     frameRate(1 / 30)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Grytviken',
    //         'Itamaracá',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    //     console.log(myCity[0])
    // } else if (h == 16) {
    //     frameRate(1 / 2.7)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 17) {
    //     frameRate(1 / 1.5)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 18) {
    //     frameRate(1 / 2.7)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 19) {
    //     frameRate(1 / 6)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 20) {
    //     frameRate(1 / 3.1)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //         'Brisbane',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 21) {
    //     frameRate(1 / 12)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Los Angeles',
    //         'Tijuana',
    //         'Vancouver',
    //         'Whitehorse',
    //         'Adamstown',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 22) {
    //     frameRate(1 / 12)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Anchorage',
    //         'Juneau',
    //         'Ketchikan',
    //         'Badger',
    //         'Fairbanks',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // } else if (h == 23) {
    //     frameRate(1 / 20)
    //     myLatitude = random(10, 1500);
    //     myLongitude = random(400, 1400);
    //     myCity = ['Honolulu',
    //         'Avarua',
    //         'Faaa',
    //     ];
    //     margin = 10;
    //     fontSize = 200;
    //     line(myLatitude, 0, myLatitude, 1440);
    //     line(0, myLongitude, 2560, myLongitude);
    //     stroke(255);
    //     textSize(fontSize);
    //     text("It’s 12:" + m + ' in', myLatitude + margin, myLongitude - fontSize - margin)
    //     text(myCity[0], myLatitude + margin, myLongitude - margin * 2)
    // }


    ///GMT Display
    textSize(60);
    text('UTC', 30, 90);
    text(plusMinus + GMTTime, 30, 150);
    fill(255);

    Clock.tick(); //updates clock when trueTime is set to false
    Clock.display({
        scale: 1,
        black: true
    }); //display time on top left of canvas    
    Ink.capture(); //send screenshot of canvas to eInk

    //console.log(Clock.getSeconds());
}

Clock.onMinuteChange = function (event) { //other events examples: Clock.onSecondChange, Clock.onHourChange
    console.log('Minutes changed:', event.value);
}
let batteryLevel = 0;
let imgArray = [];
let charging;
let unpluggedImg;

function preload() {
  console.log("preload");
  for (let i = 0; i < 100; i++) {
    let img = loadImage("./images/0" + i + ".png");
    unpluggedImg = loadImage("./images/unplugged.png");
    imgArray.push(img);
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(4);
  if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
      charging = battery.charging;
      function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
      }
      updateAllBatteryInfo();

      battery.addEventListener("chargingchange", function () {
        updateChargeInfo();
      });
      function updateChargeInfo() {
        charging = battery.charging;
      }

      battery.addEventListener("levelchange", function () {
        if (battery.charging == true) {
          updateLevelInfo();

          console.log("Battery level: " + batteryLevel + "%");
        } else {
          console.log("battery not charging");
          //create elem not charging
        }
      });

      function updateLevelInfo() {
        batteryLevel = battery.level * 100;
      }
    });
  } else {
    console.log("battery not suported");
  }
}

function draw() {
  if (charging == true) {
    background(0);

    //imgArray[batteryLevel].resize(width, height);
  } else {
    background(255, 0, 0);
    unpluggedImg;
    image(unpluggedImg, 0, 0, width, height);
  }
  // translate(width / 2, height / 2);
  // rotate(PI);
  // imageMode(CENTER);
  image(imgArray[batteryLevel], 0, 0, width, height);
}

function touchStarted() {
  let myCanvas = document.getElementsByTagName("canvas");
  myCanvas[0].requestFullscreen();
  console.log(charging);
  //onsole.log(width, height);
}

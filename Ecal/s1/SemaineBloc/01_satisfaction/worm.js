class Worm {

    constructor() {
        this.audiocontext = getAudioContext();
        this.luminosity = 100;
        this.saturation = 0;
        this.luminosity2 = 0; // 0 - 1
        this.saturation2 = 0;
        this.excitedValue = 0;
        this.r = 60;
        this.posX = 0;
        this.posY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.velX = 0;
        this.velY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.wormThick = 100 + this.posY / 9;
        this.drag = 0.1;
        this.strength = 0.01;
        this.eyeAngle1 = 0;
        this.eyeAngle2 = PI * 2;
    }


    draw() {

        //set up springs
        this.targetX = mouseX;
        this.targetY = mouseY;

        var forceX = this.targetX - this.posX;
        forceX *= this.strength;
        this.velX *= Math.exp(-this.drag);
        this.velX += forceX;

        var forceY = this.targetY - this.posY;
        forceY *= this.strength;
        this.velY *= Math.exp(-this.drag);
        this.velY += forceY;

        this.posX += this.velX;
        this.posY += this.velY;


        //position variable for bezier
        let p1 = {
            x: windowWidth / 2 + this.offsetX,
            y: windowHeight + 50 + this.offsetY
        };
        let p2 = {
            x: this.posX + this.offsetX,
            y: this.posY + this.offsetY
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

        let offset1 = Math.PI * this.posX / 900;
        let offset2 = Math.PI * this.posY / 900;
        let offset3 = Math.PI * this.posX / 900;
        let offset4 = Math.PI * -this.posY / 900;


        anchor1.x = p1.x + r1 * Math.cos(angle + offset1);
        anchor1.y = p1.y + r1 * Math.sin(angle + offset2);

        anchor2.x = p2.x + r2 * Math.cos(angle2 + offset3);
        anchor2.y = p2.y + r2 * Math.sin(angle2 + offset4);



        let acc = (winMouseY - pwinMouseY) ** 2 + (winMouseX - pwinMouseX) ** 2;

        //color red + change eyes when exited
        if (acc > 200 && this.saturation < 100) {
            this.excitedValue++;
            if (this.excitedValue > 50) {
                this.saturation = Math.min(this.saturation + 15, 100);
                this.saturation2 = Math.min(this.saturation2 + 1, 100);
                this.eyeAngle1 = 24 * PI / 12;
                this.eyeAngle2 = PI;
            }

        } else {
            this.excitedValue = Math.max(this.excitedValue - 1, 0);

            if (this.excitedValue <= 0) {
                this.saturation = Math.min(this.saturation - 1, 100);
                this.saturation2 = Math.max(this.saturation2 - 1, 0); //fade speed
            }
        }
        let col = color('hsl(0, 100%, ' + (this.luminosity * 100) + '%)');



        this.openX = 0;
        this.openY = 0;
        this.speedHigh = 2.2;
        this.speedLow = 0.5;


        //wiggle on mouse pressed
        if (mouseIsPressed) {
            // anchor2.y = p2.y + r3 * Math.sin(angle2 + offset4);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;

        } else {
            this.eyeAngle1 = 0;
            this.eyeAngle2 = PI * 2;
        }

        if (keyIsDown(65)) {
            mouseX = width / 4
            let rate = 1;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }

        if (keyIsDown(83)) {
            mouseX = width - width / 4
            let rate = 	1.122462;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }

        if (keyIsDown(68)) {
            mouseX = width / 2
            let rate = 	1.189207;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }
        if (keyIsDown(70)) {
            mouseX = width - width / 8
            let rate = 	1.334839;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }

        if (keyIsDown(71)) {
            mouseX = 0 + width / 5
            let rate = 1.498307	;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }


        if (keyIsDown(72)) {
            mouseX = width / 5 + width / 2
            let rate = 	1.587401;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }


        if (keyIsDown(74)) {
            mouseX = width / 2
            let rate = 	1.781797;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }

        if (keyIsDown(75)) {
            mouseX = width - width / 7
            let rate = 	2;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }

        if (keyIsDown(87)) {
            mouseX = 0 + width / 7
            let rate = 	1.059463;
            mouseY = map(rate, this.speedHigh, this.speedLow, 0.1, height);
            this.openX = 40 - this.posY / 50;
            this.openY = 20 + this.posY / 35;
            this.eyeAngle1 = 24 * PI / 12;
            this.eyeAngle2 = PI;
        }


  
        let info = 'Press i for infos';
        let textCol=255;
        noStroke()
        fill(textCol);
        textSize(20)
        text(info, 10, 10, width/2 + width/4, height);
        
        if (keyIsDown(73)) {
            fill(0)
            rect(0,0,200,30)
            noSmooth()
          noStroke()
          fill(255);
          textSize(100)
          text('Press on the mouse to make the worm sing. Press keys from A to K to make them sing pitch perfect & 1 to 3 to change the octave.', 10, 10, width/1.5, height);
      } else {
      }



        push();
        //set up bezier stroke
        strokeWeight(150 + this.posY / 10)
        colorMode(HSB);

        stroke(0, this.saturation, this.luminosity);
        noFill();
        bezier(p1.x, p1.y, anchor1.x, anchor1.y, anchor2.x, anchor2.y, p2.x, p2.y);


        pop();

        stroke(255);
        strokeWeight(2);
        let t = 0.98;
        let x = bezierPoint(p1.x, anchor1.x, anchor2.x, p2.x, t);
        let y = bezierPoint(p1.y, anchor1.y, anchor2.y, p2.y, t);
        let tx = bezierTangent(p1.x, anchor1.x, anchor2.x, p2.x, t);
        let ty = bezierTangent(p1.y, anchor1.y, anchor2.y, p2.y, t);
        let a = atan2(ty, tx);
        a -= HALF_PI;

        push();
        translate(x, y);
        rotate(a);

        ellipseMode(CENTER);
        noStroke();
        fill(0);
        arc(-22 - this.posY / 50, 0, 19 + this.posY / 35, 17 + this.posY / 35, this.eyeAngle1, this.eyeAngle2, CHORD);
        arc(22 + this.posY / 50, 0, 15 + this.posY / 35, 15 + this.posY / 35, this.eyeAngle1, this.eyeAngle2, CHORD);
        ellipse(0, -50, this.openX + random(0, 4), this.openY);

        pop();
    }
}
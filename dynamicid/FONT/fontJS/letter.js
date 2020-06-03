class Letter {

    constructor(options) {
        const defaults = {
            x: 0,
            y: 0,
            font: undefined,
            blobs: [],
            txt: '',
        }
        this.r = 36;

        Object.assign(this, defaults, options);



    }

    drawBlobs() {
        push();
        this.setTransformation();
        this["draw_" + this.txt]();
        pop();

    }

    setTransformation() {
        translate(this.x, this.y);
        //rotate
    }

    drawText() {
        push();
        this.setTransformation();
        this["rectDraw_" + this.txt]();
        pop();
    }

    draw_A() {
        translate(13,0)
        ellipse(59, 18, this.r)
        ellipse(99, 18, this.r)
        ellipse(49, 59, this.r)
        ellipse(109, 59, this.r)
        ellipse(38, 100, this.r)
        ellipse(120, 100, this.r)
        ellipse(28, 141, this.r)
        ellipse(79, 141, this.r)
        ellipse(130, 141, this.r)
        ellipse(18, 182, this.r)
        ellipse(140, 182, this.r)
    }
    rectDraw_A() {}

    draw_B() {
        translate(19,0)
        ellipse(59, 18, this.r)
        ellipse(100, 18, this.r)
        ellipse(129, 59, this.r)
        ellipse(59, 100, this.r)
        ellipse(100, 100, this.r)
        ellipse(129, 141, this.r)
        ellipse(59, 182, this.r)
        ellipse(100, 182, this.r)
    }
    rectDraw_B() {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_C() {
        translate(22,0)
        ellipse(122, 59, this.r)
        ellipse(90, 18, this.r)
        ellipse(50, 18, this.r)
        ellipse(18, 59, this.r)
        ellipse(18, 100, this.r)
        ellipse(18, 141, this.r)
        ellipse(50, 182, this.r)
        ellipse(90, 182, this.r)
        ellipse(122, 141, this.r)
    }
    rectDraw_C() {}

    draw_D() {
        translate(19,0)
        ellipse(59, 18, this.r)
        ellipse(100, 18, this.r)
        ellipse(129, 59, this.r)
        ellipse(129, 100, this.r)
        ellipse(129, 141, this.r)
        ellipse(59, 182, this.r)
        ellipse(100, 182, this.r)
    }
    rectDraw_D() {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_E() {}
    rectDraw_E() {
        translate(30,0)
        rect(0, 0, this.r, 200);
        rect(0, 0, 126, this.r);
        rect(0, 82, 122, this.r);
        rect(0, 164, 129, this.r);     
    }

    draw_F() {
    }
    rectDraw_F() {
        translate(28,0)
        rect(0, 0, this.r, 200);
        rect(0, 0, 126, this.r);
        rect(0, 82, 122, this.r);
    }

    draw_G() {
        translate(22,0)
        ellipse(122, 59, this.r)
        ellipse(90, 18, this.r)
        ellipse(50, 18, this.r)
        ellipse(18, 59, this.r)
        ellipse(18, 100, this.r)
        ellipse(18, 141, this.r)
        ellipse(42, 182, this.r)
        ellipse(82, 182, this.r)
    }
    rectDraw_G() {
        translate(22,0)
        rect(68, 100, 72, this.r);
        rect(104, 100, this.r, 100);
    }

    draw_H() {}
    rectDraw_H() {
        translate(22,0)
        rect(0, 0, this.r, 200);
        rect(104, 0, this.r, 200);
        rect(0, 82, 140, this.r);
    }

    draw_I() {}
    rectDraw_I() {
        translate(25,0)
        rect(48, 0, this.r, 200);
        rect(0, 0, 134, this.r);
        rect(0, 164, 134, this.r);
    }

    draw_J() {
        translate(22,0)
        ellipse(18, 141, this.r)
        ellipse(50, 182, this.r)
        ellipse(90, 182, this.r)
        ellipse(122, 141, this.r)
    }
    rectDraw_J() {
        translate(22,0)
        rect(104, 0, this.r, 118);
    }

    draw_K() {
        translate(22,0)
        ellipse(122, 18, this.r)
        ellipse(90, 59, this.r)
        ellipse(59, 100, this.r)
        ellipse(90, 141, this.r)
        ellipse(122, 182, this.r)
    }
    rectDraw_K() {
        translate(22,0)
        rect(0, 0, this.r, 200);
    }

    draw_L() {}
    rectDraw_L() {
        translate(28,0)
        rect(0, 0, this.r, 200);
        rect(0, 164, 128, this.r);
    }


    draw_M() {
        translate(11,0)
        ellipse(36, 18, this.r)
        ellipse(58, 59, this.r)
        ellipse(81, 100, this.r)
        ellipse(104, 59, this.r)
        ellipse(126, 18, this.r)
    }
    rectDraw_M() {
        translate(11,0)
        rect(0, 0, this.r, 200);
        rect(126, 0, this.r, 200);
    }

    draw_N() {
        translate(22,0)
        ellipse(36, 18, this.r)
        ellipse(58, 59, this.r)
        ellipse(70, 100, this.r)
        ellipse(82, 143, this.r)
        ellipse(104, 182, this.r)
    }
    rectDraw_N() {
        translate(22,0)
        rect(0, 0, this.r, 200);
        rect(104, 0, this.r, 200);
    }

    draw_O() {
        translate(22,0)
        ellipse(122, 59, this.r)
        ellipse(90, 18, this.r)
        ellipse(50, 18, this.r)
        ellipse(18, 59, this.r)
        ellipse(18, 100, this.r)
        ellipse(18, 141, this.r)
        ellipse(50, 182, this.r)
        ellipse(90, 182, this.r)
        ellipse(122, 141, this.r)
        ellipse(122, 59, this.r)
        ellipse(122, 100, this.r)
    }
    rectDraw_O() {}

    draw_P() {
        translate(19,0)
        ellipse(59, 18, this.r)
        ellipse(100, 18, this.r)
        ellipse(129, 59, this.r)
        ellipse(59, 100, this.r)
        ellipse(100, 100, this.r)
    }
    rectDraw_P() {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_Q() {
        translate(22,0)
        ellipse(122, 59, this.r)
        ellipse(90, 18, this.r)
        ellipse(50, 18, this.r)
        ellipse(18, 59, this.r)
        ellipse(18, 100, this.r)
        ellipse(18, 141, this.r)
        ellipse(50, 182, this.r)
        ellipse(122, 141, this.r)
        ellipse(122, 59, this.r)
        ellipse(122, 100, this.r)
    }
    rectDraw_Q() {
        translate(22,0)
        rect(72, 164, 68, this.r);
    }

    draw_R() {
        translate(22,0)
        ellipse(59, 18, this.r)
        ellipse(100, 18, this.r)
        ellipse(129, 59, this.r)
        ellipse(59, 100, this.r)
        ellipse(100, 100, this.r)
        ellipse(122, 141, this.r)
        ellipse(122, 182, this.r)
    }
    rectDraw_R() {
        translate(22,0)
        rect(0, 0, this.r, 200);
    }

    draw_S() {
        translate(23,0)
        ellipse(96, 18, this.r)
        ellipse(52, 18, this.r)
        ellipse(18, 59, this.r)
        ellipse(48, 100, this.r)
        ellipse(88, 100, this.r)
        ellipse(121, 141, this.r)
        ellipse(84, 182, this.r)
        ellipse(40, 182, this.r)
    }
    rectDraw_S() {}

    draw_T() {}
    rectDraw_T() {
        translate(20,0)
        rect(54, 0, this.r, 200);
        rect(0, 0, 144, this.r);
    }

    draw_U() {
        translate(22,0)
        ellipse(18, 141, this.r)
        ellipse(50, 182, this.r)
        ellipse(90, 182, this.r)
        ellipse(122, 141, this.r)
    }
    rectDraw_U() {
        translate(22,0)
        rect(104, 0, this.r, 118);
        rect(0, 0, this.r, 118);
    }

    draw_V() {
        translate(13,0)
        ellipse(18, 18, this.r)
        ellipse(28, 59, this.r)
        ellipse(38, 100, this.r)
        ellipse(49, 141, this.r)
        ellipse(59, 182, this.r)
        ellipse(99, 182, this.r)
        ellipse(109, 141, this.r)
        ellipse(120, 100, this.r)
        ellipse(130, 59, this.r)
        ellipse(140, 18, this.r)
    }
    rectDraw_V() {}

    draw_W() {
        translate(11,0)
        ellipse(36, 182, this.r)
        ellipse(58, 141, this.r)
        ellipse(81, 100, this.r)
        ellipse(104, 141, this.r)
        ellipse(126, 182, this.r)
    }
    rectDraw_W() {
        translate(11,0)
        rect(0, 0, this.r, 200);
        rect(126, 0, this.r, 200);
    }

    draw_X() {
        translate(14,0)
        ellipse(18, 18, this.r)
        ellipse(48, 59, this.r)
        ellipse(138, 18, this.r)
        ellipse(108, 59, this.r)
        ellipse(78, 100, this.r)
        ellipse(48, 141, this.r)
        ellipse(108, 141, this.r)
        ellipse(18, 182, this.r)
        ellipse(138, 182, this.r)
    }
    rectDraw_X() {}

    draw_Y() {
        translate(14,0)
        ellipse(18, 18, this.r)
        ellipse(48, 59, this.r)
        ellipse(138, 18, this.r)
        ellipse(108, 59, this.r)
        ellipse(78, 100, this.r)
    }
    rectDraw_Y() {
        translate(14,0)
        rect(60, 123, this.r, 77);

    }

    draw_Z() {
        translate(22,0)
        ellipse(122, 59, this.r)
        ellipse(90, 100, this.r)
        ellipse(50, 100, this.r)
        ellipse(18, 141, this.r)
    }
    rectDraw_Z() {
        translate(22,0)
        rect(0, 0, 140, this.r);
        rect(0, 164, 140, this.r);
    }

}
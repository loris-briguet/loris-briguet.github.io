class Letter {

    constructor(options) {
        const defaults = {
            x: 0,
            y: 0,
            txt: '',
        }
        this.r = 36;
        this.rR = [];

        for (let i = 0; i < 15; i++){
            this.rR.push(random(20,60))
        }

        Object.assign(this, defaults, options);
    }

    drawBlobs(layer) {
        layer.push();

        this.setTransformation(layer);

        this["draw_" + this.txt](layer);

        layer.pop();

    }

    setTransformation(layer) {
        layer.translate(this.x, this.y);
        //rotate
    }

    drawText() {
        push();
        // this.setTransformation();
        translate(this.x, this.y);
        this["rectDraw_" + this.txt]();
        pop();
    }

    draw_A(layer) {
        layer.translate(13,0)
        layer.ellipse(59, 18, this.r)
        layer.ellipse(99, 18, this.r)
        layer.ellipse(49, 59, this.r)
        layer.ellipse(109, 59, this.r)
        layer.ellipse(38, 100, this.r)
        layer.ellipse(120, 100, this.r)
        layer.ellipse(28, 141, this.r)
        layer.ellipse(79, 141, this.r)
        layer.ellipse(130, 141, this.r)
        layer.ellipse(18, 182, this.r)
        layer.ellipse(140, 182, this.r)
    }
    rectDraw_A(layer) {}

    draw_B(layer) {
        layer.translate(19,0)
        layer.ellipse(59, 18, this.r)
        layer.ellipse(100, 18, this.r)
        layer.ellipse(129, 59, this.r)
        layer.ellipse(59, 100, this.r)
        layer.ellipse(100, 100, this.r)
        layer.ellipse(129, 141, this.r)
        layer.ellipse(59, 182, this.r)
        layer.ellipse(100, 182, this.r)
    }
    rectDraw_B(layer) {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_C(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(90, 18, this.r)
        layer.ellipse(50, 18, this.r)
        layer.ellipse(18, 59, this.r)
        layer.ellipse(18, 100, this.r)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(50, 182, this.r)
        layer.ellipse(90, 182, this.r)
        layer.ellipse(122, 141, this.r)
    }
    rectDraw_C(layer) {}

    draw_D(layer) {
        layer.translate(19,0)
        layer.ellipse(59, 18, this.r)
        layer.ellipse(100, 18, this.r)
        layer.ellipse(129, 59, this.r)
        layer.ellipse(129, 100, this.r)
        layer.ellipse(129, 141, this.r)
        layer.ellipse(59, 182, this.r)
        layer.ellipse(100, 182, this.r)
    }
    rectDraw_D(layer) {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_E(layer) {}
    rectDraw_E(layer) {
        translate(30,0)
        rect(0, 0, this.r, 200);
        rect(0, 0, 126, this.r);
        rect(0, 82, 122, this.r);
        rect(0, 164, 129, this.r);     
    }

    draw_F(layer) {
    }
    rectDraw_F(layer) {
        translate(28,0)
        rect(0, 0, this.r, 200);
        rect(0, 0, 126, this.r);
        rect(0, 82, 122, this.r);
    }

    draw_G(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(90, 18, this.r)
        layer.ellipse(50, 18, this.r)
        layer.ellipse(18, 59, this.r)
        layer.ellipse(18, 100, this.r)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(42, 182, this.r)
        layer.ellipse(82, 182, this.r)
    }
    rectDraw_G(layer) {
        translate(22,0)
        rect(68, 100, 72, this.r);
        rect(104, 100, this.r, 100);
    }

    draw_H(layer) {}
    rectDraw_H(layer) {
        translate(22,0)
        rect(0, 0, this.r, 200);
        rect(104, 0, this.r, 200);
        rect(0, 82, 140, this.r);
    }

    draw_I(layer) {}
    rectDraw_I(layer) {
        translate(25,0)
        rect(48, 0, this.r, 200);
        rect(0, 0, 134, this.r);
        rect(0, 164, 134, this.r);
    }

    draw_J(layer) {
        layer.translate(22,0)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(50, 182, this.r)
        layer.ellipse(90, 182, this.r)
        layer.ellipse(122, 141, this.r)
    }
    rectDraw_J(layer) {
        translate(22,0)
        rect(104, 0, this.r, 118);
    }

    draw_K(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 18, this.r)
        layer.ellipse(90, 59, this.r)
        layer.ellipse(59, 100, this.r)
        layer.ellipse(90, 141, this.r)
        layer.ellipse(122, 182, this.r)
    }
    rectDraw_K(layer) {
        translate(22,0)
        rect(0, 0, this.r, 200);
    }

    draw_L(layer) {}
    rectDraw_L(layer) {
        translate(28,0)
        rect(0, 0, this.r, 200);
        rect(0, 164, 128, this.r);
    }


    draw_M(layer) {
        layer.translate(11,0)
        layer.ellipse(36, 18, this.rR[0])
        layer.ellipse(58, 59, this.rR[1])
        layer.ellipse(81, 100, this.rR[2])
        layer.ellipse(104, 59, this.rR[3])
        layer.ellipse(126, 18, this.rR[4])
    }
    rectDraw_M(layer) {
        translate(11,0)
        rect(0, 0, this.r, 200);
        rect(126, 0, this.r, 200);
    }

    draw_N(layer) {
        layer.translate(22,0)
        layer.ellipse(36, 18, this.r)
        layer.ellipse(58, 59, this.r)
        layer.ellipse(70, 100, this.r)
        layer.ellipse(82, 143, this.r)
        layer.ellipse(104, 182, this.r)
    }
    rectDraw_N(layer) {
        translate(22,0)
        rect(0, 0, this.r, 200);
        rect(104, 0, this.r, 200);
    }

    draw_O(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(90, 18, this.r)
        layer.ellipse(50, 18, this.r)
        layer.ellipse(18, 59, this.r)
        layer.ellipse(18, 100, this.r)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(50, 182, this.r)
        layer.ellipse(90, 182, this.r)
        layer.ellipse(122, 141, this.r)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(122, 100, this.r)
    }
    rectDraw_O(layer) {}

    draw_P(layer) {
        layer.translate(19,0)
        layer.ellipse(59, 18, this.r)
        layer.ellipse(100, 18, this.r)
        layer.ellipse(129, 59, this.r)
        layer.ellipse(59, 100, this.r)
        layer.ellipse(100, 100, this.r)
    }
    rectDraw_P(layer) {
        translate(19,0)
        rect(0, 0, this.r, 200);
    }

    draw_Q(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(90, 18, this.r)
        layer.ellipse(50, 18, this.r)
        layer.ellipse(18, 59, this.r)
        layer.ellipse(18, 100, this.r)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(50, 182, this.r)
        layer.ellipse(122, 141, this.r)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(122, 100, this.r)
    }
    rectDraw_Q(layer) {
        translate(22,0)
        rect(72, 164, 68, this.r);
    }

    draw_R(layer) {
        layer.translate(22,0)
        layer.ellipse(59, 18, this.r)
        layer.ellipse(100, 18, this.r)
        layer.ellipse(129, 59, this.r)
        layer.ellipse(59, 100, this.r)
        layer.ellipse(100, 100, this.r)
        layer.ellipse(122, 141, this.r)
        layer.ellipse(122, 182, this.r)
    }
    rectDraw_R(layer) {
        translate(22,0)
        rect(0, 0, this.r, 200);
    }

    draw_S(layer) {
        layer.translate(23,0)
        layer.ellipse(96, 18, this.rR[5])
        layer.ellipse(52, 18, this.rR[6])
        layer.ellipse(18, 59, this.rR[7])
        layer.ellipse(48, 100, this.rR[8])
        layer.ellipse(88, 100, this.rR[9])
        layer.ellipse(121, 141, this.rR[10])
        layer.ellipse(84, 182, this.rR[11])
        layer.ellipse(40, 182, this.rR[12])
    }
    rectDraw_S(layer) {}

    draw_T(layer) {}
    rectDraw_T(layer) {
        layer.translate(20,0)
        layer.rect(54, 0, this.r, 200);
        layer.rect(0, 0, 144, this.r);
    }

    draw_U(layer) {
        layer.translate(22,0)
        layer.ellipse(18, 141, this.r)
        layer.ellipse(50, 182, this.r)
        layer.ellipse(90, 182, this.r)
        layer.ellipse(122, 141, this.r)
    }
    rectDraw_U(layer) {
        translate(22,0)
        rect(104, 0, this.r, 118);
        rect(0, 0, this.r, 118);
    }

    draw_V(layer) {
        layer.translate(13,0)
        layer.ellipse(18, 18, this.r)
        layer.ellipse(28, 59, this.r)
        layer.ellipse(38, 100, this.r)
        layer.ellipse(49, 141, this.r)
        layer.ellipse(59, 182, this.r)
        layer.ellipse(99, 182, this.r)
        layer.ellipse(109, 141, this.r)
        layer.ellipse(120, 100, this.r)
        layer.ellipse(130, 59, this.r)
        layer.ellipse(140, 18, this.r)
    }
    rectDraw_V(layer) {}

    draw_W(layer) {
        layer.translate(11,0)
        layer.ellipse(36, 182, this.r)
        layer.ellipse(58, 141, this.r)
        layer.ellipse(81, 100, this.r)
        layer.ellipse(104, 141, this.r)
        layer.ellipse(126, 182, this.r)
    }
    rectDraw_W(layer) {
        translate(11,0)
        rect(0, 0, this.r, 200);
        rect(126, 0, this.r, 200);
    }

    draw_X(layer) {
        layer.translate(14,0)
        layer.ellipse(18, 18, this.r)
        layer.ellipse(48, 59, this.r)
        layer.ellipse(138, 18, this.r)
        layer.ellipse(108, 59, this.r)
        layer.ellipse(78, 100, this.r)
        layer.ellipse(48, 141, this.r)
        layer.ellipse(108, 141, this.r)
        layer.ellipse(18, 182, this.r)
        layer.ellipse(138, 182, this.r)
    }
    rectDraw_X(layer) {}

    draw_Y(layer) {
        layer.translate(14,0)
        layer.ellipse(18, 18, this.r)
        layer.ellipse(48, 59, this.r)
        layer.ellipse(138, 18, this.r)
        layer.ellipse(108, 59, this.r)
        layer.ellipse(78, 100, this.r)
    }
    rectDraw_Y(layer) {
        layer.translate(14,0)
        layer.rect(60, 123, this.r, 77);

    }

    draw_Z(layer) {
        layer.translate(22,0)
        layer.ellipse(122, 59, this.r)
        layer.ellipse(90, 100, this.r)
        layer.ellipse(50, 100, this.r)
        layer.ellipse(18, 141, this.r)
    }
    rectDraw_Z(layer) {
        translate(22,0)
        rect(0, 0, 140, this.r);
        rect(0, 164, 140, this.r);
    }

}
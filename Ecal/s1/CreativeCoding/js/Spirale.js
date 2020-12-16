spiralArray = function (edge) {
    var arr = Array(edge),
        x = 0,
        y = edge,
        total = edge * edge--,
        dx = 1,
        dy = 0,
        i = 0,
        j = 0;
    while (y) arr[--y] = [];
    while (i < total) {
        arr[y][x] = i++;
        x += dx;
        y += dy;
        if (++j == edge) {
            if (dy < 0) {
                x++;
                y++;
                edge -= 2
            }
            j = dx;
            dx = -dy;
            dy = j;
            j = 0;
        }
    }
    let fullArray = [];


    for (a of arr) {
        for (b of a) {
            fullArray.push(b);
        }
    }
    return fullArray;
}
class Case {
    constructor(_posX, _posY, _index) {
        this.posX = _posX;
        this.posY = _posY;
        this.index = _index
    }
}

class Spirale {
    constructor(_edge) {
        this.cases = [];
        this.edge = _edge
        var spirale = spiralArray(this.edge);
        for (let i = 0; i < spirale.length; i++) {
            let x = i % this.edge
            let y = Math.floor(i / this.edge)
            this.cases.push(new Case(x, y, spirale[i]))
        }
    }
    getIndex(_i) {
        let myCase;
        for (let c of this.cases) {
            if (c.index == _i) {
                myCase = c;
            }
        }


        return myCase;
    }
}
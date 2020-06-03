class agendaEvent{
    constructor(x, y, fontReg, fontIta, parseData, dateDataNew, color){

        this.x = x;
        this.y = y;
        this.fontReg = fontReg;
        this.fontIta = fontIta;
        this.parseData = parseData
        this.dateData = dateDataNew;
        this.color = color;
    }

    show(){
        fill(this.color)
        textFont(fontReg)
        text(this.dateData[0] + '.' +this.dateData[1], 0, 0,)
        console.log(this.dateData[0])
    }

}
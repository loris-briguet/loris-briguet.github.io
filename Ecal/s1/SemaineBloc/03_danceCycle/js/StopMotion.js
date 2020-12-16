const DIMENSION = {
    'width': 500,
    'height': 500,
    'scale': 2.5,
};
const FOLDER = './danceLoop/';
const MAX = 64;
const DELAY = 0.5;
class StopMotion {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = DIMENSION.width;
        this.canvas.height = DIMENSION.height;
        this.offsetX = window.innerWidth / 2 - (DIMENSION.width * DIMENSION.scale / 2);
        this.offsetY = window.innerHeight / 2 - (DIMENSION.height * DIMENSION.scale / 2);
        this.ctx = this.canvas.getContext('2d');
        this.counter = 0;
        this.frameCounter = 0;
        this.range = 200;
        this.zoom = 0.5;
        this.mouseIsDown = !1;
        this.particleCounter = 0;
        this.explosionState = !1;
        this.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        this.mouse = {
            x: 0,
            y: 0,
        }
        this.setup()
    }
    setup() {
        this.allImages = [];
        this.initGrid();
        this.initListener();
        this.loadImage(0);
        this.tool = new AudioTool('audio/snare.mp3');
        this.tool1 = new AudioTool('audio/kick.mp3');
        this.tool2 = new AudioTool('audio/crash.mp3');
    }
    initListener() {
        document.addEventListener('dblclick', this.mouseOnDBLClick.bind(this));
        document.addEventListener('click', this.mouseOnClick.bind(this));
        document.addEventListener('mousemove', this.OnMouseMove.bind(this));
        document.addEventListener('mousedown', this.mouseDown.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this))
    }
    mouseOnDBLClick(e) {
        this.explosionState = !this.explosionState
        if (!this.soundIsPlaying) {
            this.tool2.audio.play();
            this.soundIsPlaying = !0;
            setTimeout(() => {
                this.soundIsPlaying = !1
            }, 100)
        }
    }
    mouseOnClick(e) {
        if (this.explosionState) {
            this.explosionState = !this.explosionState
        }
    }
    OnMouseMove(e) {
        this.mouse.x = e.layerX;
        this.mouse.y = e.layerY
    }
    mouseDown(e) {
        this.mouseIsDown = !this.mouseIsDown;
        console.log(e)
    }
    mouseUp(e) {
        this.mouseIsDown = !this.mouseIsDown;
        console.log(e)
    }
    initGrid() {
        const PX = new PIXI.Application(window.innerWidth, window.innerHeight, {
            antialias: !0,
            transparent: !0
        });
        document.body.appendChild(PX.view);
        PX.render.backgroundColor;
        const textures = PIXI.Texture.fromImage('./tex/tex6.png');
        this.pixel1 = new PIXI.Texture(textures.baseTexture, new PIXI.math.Rectangle(0, 0, 20, 20));
        this.pixel2 = new PIXI.Texture(textures.baseTexture, new PIXI.math.Rectangle(0, 20, 20, 20));
        this.pixel3 = new PIXI.Texture(textures.baseTexture, new PIXI.math.Rectangle(20, 0, 40, 40));
        this.pixel4 = new PIXI.Texture(textures.baseTexture, new PIXI.math.Rectangle(20, 40, 40, 40));
        this.particles = [];
        const particleNumber = 45000;
        for (let i = 0; i < particleNumber; i++) {
            const particle = new PIXI.Sprite(this.pixel1);
            particle.anchor.set(0.5, 0.5);
            particle.x = -10;
            particle.y = -10;
            particle.scale.set(1);
            particle.alphaValue = 0.1;
            particle.alpha = particle.alphaValue;
            particle.o_speedX = Math.random() * 11;
            particle.o_speedY = -1 * Math.random() * 10 + 1;
            particle._speedX = particle.o_speedX;
            particle._speedY = particle.o_speedY;
            particle._speedXExplode = 10 - Math.random() * 20;
            particle._speedYExplode = 15 - Math.random() * 20;
            this.particles.push(particle)
        }
        this.grid = [];
        let angle = 0;
        const step = 1;
        for (let y = step; y < DIMENSION.height; y += step) {
            for (let x = step; x < DIMENSION.width; x += step) {
                angle += Math.PI / 28;
                this.grid.push({
                    x: x,
                    y: y,
                    angle: angle
                })
            }
        }
        const container = new PIXI.particles.ParticleContainer(this.particles.length, {
            scale: !0,
            position: !0,
            uvs: !0,
            alpha: !0,
        });
        for (let i = 0; i < this.particles.length; i++) {
            container.addChild(this.particles[i])
        }
        PX.stage.addChild(container);
        PX.ticker.add(this.draw, this)
    }
    loadImage(chiffre) {
        let leadingZero = '';
        if (chiffre < 10) {
            leadingZero = '00' + chiffre
        } else {
            leadingZero = '0' + chiffre
        }
        const url = FOLDER + 'danceLoop' + leadingZero + '.png';
        const image = new Image();
        image.src = url;
        this.allImages.push(image);
        if (this.allImages.length >= MAX) {
            this.draw()
        } else {
            chiffre++;
            this.loadImage(chiffre)
        }
    }
    moveParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            if (this.explosionState == !1) {
                particle.position.x += particle._speedX;
                particle.position.y += particle._speedY;
                particle.alpha = particle.alphaValue;
                particle.alphaValue -= 0.2;
                if (particle.alphaValue <= 0.3) {
                    particle.alphaValue = 0.3;
                    particle.texture = (particle.explosion) ? this.pixel3 : this.pixel2
                }
                if (this.mouseIsDown == !1) {
                    this.range -= 0.0005;
                    this.zoom = 0.5;
                    if (this.range <= 200) {
                        this.range = 200
                    }
                } else if (this.mouseIsDown == !0) {
                    this.range += 0.0005;
                    this.zoom = 0.5;
                    if (this.range >= 1000) {
                        this.range = 1000
                    }
                }
                let differenceX = this.mouse.x - particle.position.x;
                let differenceY = this.mouse.y - particle.position.y;
                let length = this.dist(this.mouse.x, this.mouse.y, particle.position.x, particle.position.y);
                if (length < this.range) {
                    particle.texture = (particle.explosion) ? this.pixel3 : this.pixel2;
                    const l = this.map(length, 0, this.range * 2, 0, Math.PI * 2);
                    const angle = Math.cos(l);
                    const amt = this.map(angle, -1, 1, 0, this.zoom);
                    differenceX *= amt;
                    differenceY *= amt;
                    particle.position.x -= differenceX;
                    particle.position.y -= differenceY
                }
            } else {
                particle._speedX += particle._speedXExplode;
                particle._speedY += particle._speedYExplode;
                particle.position.x += particle._speedX;
                particle.position.y += particle._speedY
            }
        }
    }
    draw() {
        if (this.frameCounter % DELAY == 0) {
            this.ctx.drawImage(this.allImages[this.counter], 0, 0, DIMENSION.width, DIMENSION.height);
            const data = this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
            this.processData(data);
            this.moveParticles();
            this.counter++;
            if (this.counter >= this.allImages.length) {
                this.counter = 0
            }
            this.frameCounter = 0
        }
        this.frameCounter++
    }
    processData(data) {
        if (this.explosionState == !1) {
            for (let i = 0; i < this.grid.length; i++) {
                const x = this.grid[i].x;
                const y = this.grid[i].y;
                const particle = this.particles[this.particleCounter];
                this.grid[i].angle += 5;
                const index = 4 * (y * DIMENSION.width + x);
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const luminance = (0.299 * r + 0.587 * g + 0.0722 * b) / 255;
                if (luminance < 0.2) {
                    particle.scale.set(0.15);
                    particle.position.x = x * DIMENSION.scale + this.offsetX;
                    particle.position.y = y * DIMENSION.scale + this.offsetY;
                    particle.alphaValue = 1;
                    particle.texture = this.pixel1;
                    particle.explosion = !1;
                    particle._speedX = particle.o_speedX;
                    particle._speedY = particle.o_speedY;
                    this.particleCounter++;
                    if (this.particleCounter >= this.particles.length) {
                        this.particleCounter = 0
                    }
                } else if (r >= 200 && g <= 100 && b <= 100) {
                    particle.scale.set(0.2);
                    particle._speedX = 30 - Math.random() * 60;
                    particle._speedY = 30 - Math.random() * 60;
                    particle.texture = this.pixel3;
                    particle.explosion = !0;
                    this.particleCounter++;
                    if (this.particleCounter >= this.particles.length) {
                        this.particleCounter = 0
                    }
                    let range = 100;
                    let zoom = 0.3;
                    let differenceX = this.mouse.x - particle.position.x;
                    let differenceY = this.mouse.y - particle.position.y;
                    let length = this.dist(this.mouse.x, this.mouse.y, particle.position.x, particle.position.y);
                    if (length < range) {
                        const l = this.map(length, 0, range * 2, 0, Math.PI * 2);
                        const angle = Math.cos(l);
                        const amt = this.map(angle, -1, 1, 0, zoom);
                        differenceX *= amt;
                        differenceY *= amt;
                        particle.position.x -= differenceX;
                        particle.position.y -= differenceY
                    }
                } else if (r <= 100 && g <= 100 && b >= 180) {
                    particle.scale.set(0.2);
                    particle._speedX = 30 - Math.random() * 60;
                    particle._speedY = 30 - Math.random() * 60;
                    particle.texture = this.pixel3;
                    particle.explosion = !0;
                    this.particleCounter++;
                    if (this.particleCounter >= this.particles.length) {
                        this.particleCounter = 0
                    }
                    let range = 100;
                    let zoom = 0.3;
                    let differenceX = this.mouse.x - particle.position.x;
                    let differenceY = this.mouse.y - particle.position.y;
                    let length = this.dist(this.mouse.x, this.mouse.y, particle.position.x, particle.position.y);
                    if (length < range) {
                        const l = this.map(length, 0, range * 2, 0, Math.PI * 2);
                        const angle = Math.cos(l);
                        const amt = this.map(angle, -1, 1, 0, zoom);
                        differenceX *= amt;
                        differenceY *= amt;
                        particle.position.x -= differenceX;
                        particle.position.y -= differenceY
                    }
                    if (!this.soundIsPlaying) {
                        this.tool.audio.play();
                        this.soundIsPlaying = !0;
                        setTimeout(() => {
                            this.soundIsPlaying = !1
                        }, 100)
                    }
                } else if (r <= 100 && g >= 200 && b <= 100) {
                    if (!this.soundIsPlaying) {
                        this.tool1.audio.play();
                        this.soundIsPlaying = !0;
                        setTimeout(() => {
                            this.soundIsPlaying = !1
                        }, 100)
                    }
                } else {
                    particle.explosion = !1;
                    particle.scale.set(0);
                    particle._speedX = particle.o_speedX;
                    particle._speedY = particle.o_speedY
                }
            }
        }
    }
    dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }
    map(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }
};
window.onload = function () {
    new StopMotion()
}
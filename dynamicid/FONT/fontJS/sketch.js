var blobs = [];
var canvas;
var ctx;

var zoom = 1;

var letter_s;


function setup() {
  var canvas = createCanvas(windowWidth, 1250, SVG);
  ctx = canvas.drawingContext;

  noStroke();

  letter_A = new Letter({x: 50, y: 50, txt: 'A', font, });
  letter_B = new Letter({x: 250, y: 50, txt: 'B', font});
  letter_C = new Letter({x: 450, y: 50, txt: 'C', font});
  letter_D = new Letter({x: 650, y: 50, txt: 'D', font});
  letter_E = new Letter({x: 850, y: 50, txt: 'E', font});
  letter_F = new Letter({x: 1050, y: 50, txt: 'F', font});
  letter_G = new Letter({x: 1250, y: 50, txt: 'G', font});
  letter_H = new Letter({x: 1450, y: 50, txt: 'H', font});

  letter_I = new Letter({x: 50, y: 350, txt: 'I', font});
  letter_J = new Letter({x: 250, y: 350, txt: 'J', font});
  letter_K = new Letter({x: 450, y: 350, txt: 'K', font});
  letter_L = new Letter({x: 650, y: 350, txt: 'L', font});
  letter_M = new Letter({x: 850, y: 350, txt: 'M', font});
  letter_N = new Letter({x: 1050, y: 350, txt: 'N', font});
  letter_O = new Letter({x: 1250, y: 350, txt: 'O', font});
  letter_P = new Letter({x: 1450, y: 350, txt: 'P', font});

  letter_Q = new Letter({x: 50, y: 650, txt: 'Q', font});
  letter_R = new Letter({x: 250, y: 650, txt: 'R', font});
  letter_S = new Letter({x: 450, y: 650, txt: 'S', font});
  letter_T = new Letter({x: 650, y: 650, txt: 'T', font});
  letter_U = new Letter({x: 850, y: 650, txt: 'U', font});
  letter_V = new Letter({x: 1050, y: 650, txt: 'V', font});
  letter_W = new Letter({x: 1250, y: 650, txt: 'W', font});
  letter_X = new Letter({x: 1450, y: 650, txt: 'X', font});

  letter_Y = new Letter({x: 50, y: 950, txt: 'Y', font});
  letter_Z = new Letter({x: 250, y: 950, txt: 'Z', font});
}

function draw() {

  push();

  background(0);
  blendMode(ADD);

  translate(width/2, height/2);
  scale(zoom);
  translate(-width/2, -height/2);

  //ctx.filter = 'blur(25px)';
  letter_A.drawBlobs();
  letter_B.drawBlobs();
  letter_C.drawBlobs();
  letter_D.drawBlobs();
  letter_E.drawBlobs();
  letter_F.drawBlobs();
  letter_G.drawBlobs();
  letter_H.drawBlobs();
  letter_I.drawBlobs();
  letter_J.drawBlobs();
  letter_K.drawBlobs();
  letter_L.drawBlobs();
  letter_M.drawBlobs();
  letter_N.drawBlobs();
  letter_O.drawBlobs();
  letter_P.drawBlobs();
  letter_Q.drawBlobs();
  letter_R.drawBlobs();
  letter_S.drawBlobs();
  letter_T.drawBlobs();
  letter_U.drawBlobs();
  letter_V.drawBlobs();
  letter_W.drawBlobs();
  letter_X.drawBlobs();
  letter_Y.drawBlobs();
  letter_Z.drawBlobs();

  filter(THRESHOLD, .2);
  blendMode(BLEND);
  ctx.filter = 'blur(0px)';
  letter_A.drawText();
  letter_B.drawText();
  letter_C.drawText();
  letter_D.drawText();
  letter_E.drawText();
  letter_F.drawText();
  letter_G.drawText();
  letter_H.drawText();
  letter_I.drawText();
  letter_J.drawText();
  letter_K.drawText();
  letter_L.drawText();
  letter_M.drawText();
  letter_N.drawText();
  letter_O.drawText();
  letter_P.drawText();
  letter_Q.drawText();
  letter_R.drawText();
  letter_S.drawText();
  letter_T.drawText();
  letter_U.drawText();
  letter_V.drawText();
  letter_W.drawText();
  letter_X.drawText();
  letter_Y.drawText();
  letter_Z.drawText();

  pop();

  noLoop(); // we just want to export once
}







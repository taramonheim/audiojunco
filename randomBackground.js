let numberDarks = 0;
let numberLights = 0;
let randomPosValues = [];
let randomSizeValues = [];
let randomPosXdark = [];
let randomPosYdark = [];
let randomDark = [];
let randomSizeXdark = [];
let randomSizeXlight = [];
let randomPosYlight = [];
let randomPosXlight = [];



function setup() {
  createCanvas(1920, 1080);
  randomPosValues = [0, 1920, height-750, height];
  randomSizeValues = [200, 550, 200, 550];
  numberDarks = 1 + (int)(Math.random() * (4 - 1 )+ 1);
  numberLights = 1 + (int)(Math.random() * (4 - 1 )+ 1);
  for (i = 0; i<= numberDarks; i++) {
    randomDark = randomPosValues[0] + (int)
    (Math.random() * ((randomPosValues[1] - randomPosValues[0]) + 1))
    randomPosYdark = randomPosValues[2] + (int)(Math.random() * ((randomPosValues[3] - randomPosValues[2]) + 1));
  }
    for (i = 0; i<= numberLights; i++) {
        
  }
  
  randomSizeXdark = randomSizeValues[0] + (int)(Math.random() * ((randomSizeValues[1] - randomSizeValues[0]) + 1));
  randomSizeXlight = randomSizeValues[0] + (int)(Math.random() * ((randomSizeValues[1] - randomSizeValues[0]) + 1));
  randomPosYlight = randomPosValues[2] + (int)(Math.random() * ((randomPosValues[3] - randomPosValues[2]) + 1));
  randomPosXlight = randomPosValues[0] + (int)(Math.random() * ((randomPosValues[1] - randomPosValues[0]) + 1));
  randomPosYdark = randomPosValues[2] + (int)(Math.random() * ((randomPosValues[3] - randomPosValues[2]) + 1));
  randomPosXdark = randomPosValues[0] + (int)(Math.random() * ((randomPosValues[1] - randomPosValues[0]) + 1));
}



function draw() {
  background(253, 244, 209);
  noStroke();
  for(i = 1; i < numberDarks; i++) {
  fill(72, 68, 97);
  rect(randomPosXdark, randomPosYdark, randomSizeXdark, 750);
  }    
  for(i = 1; i < numberDarks; i++) {
  fill(96, 82, 129);
  rect(randomPosXlight, randomPosYlight, randomSizeXlight, 750);
  }
  dotGrid(800, 600, 400, 300)
}

function dotGrid(x, y, w, h) {
  let delay = false;
  for (i = 0; i<h; i=i+8) {
    delay = !delay
    for(j = 0; j<w; j=j+8) {
      delay = !delay
      if (!delay) {
        fill(236, 111, 39);
        ellipse(x+j, y+i, 4);
      }
    }
  }
}
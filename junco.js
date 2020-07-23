const data = [{
  "time": 55,
  "freq": 131,
  "amp": 140,
}, {
  "time": 190,
  "freq": 131,
  "amp": 140,
}, {
  "time": 465,
  "freq": 104,
  "amp": 140,
}, {
  "time": 608,
  "freq": 87,
  "amp": 150,
}, {
  "time": 873,
  "freq": 65,
  "amp": 200,
}, {
  "time": 1424,
  "freq": 65,
  "amp": 180,
}, {
  "time": 1700,
  "freq": 87,
  "amp": 180,
}, {
  "time": 1972,
  "freq": 104,
  "amp": 180,
}, {
  "time": 2244,
  "freq": 131,
  "amp": 140,
}, {
  "time": 2375,
  "freq": 131,
  "amp": 140,
}, {
  "time": 2648,
  "freq": 104,
  "amp": 160,
}, {
  "time": 2790,
  "freq": 87,
  "amp": 180,
}, {
  "time": 3062,
  "freq": 65,
  "amp": 200,
}, {
  "time": 3606,
  "freq": 65,
  "amp": 180,
}, {
  "time": 3883,
  "freq": 87,
  "amp": 180,
}, {
  "time": 4152,
  "freq": 104,
  "amp": 180,
}, {
  "time": 4427,
  "freq": 98,
  "amp": 140,
}, {
  "time": 4563,
  "freq": 98,
  "amp": 140,
}, {
  "time": 4835,
  "freq": 86,
  "amp": 140,
}, {
  "time": 4971,
  "freq": 77,
  "amp": 150,
}, {
  "time": 5242,
  "freq": 116,
  "amp": 200,
}, {
  "time": 5791,
  "freq": 77,
  "amp": 180,
}, {
  "time": 6031,
  "freq": 77,
  "amp": 180,
}, {
  "time": 6335,
  "freq": 116,
  "amp": 200,
}, {
  "time": 6609,
  "freq": 98,
  "amp": 140,
}, {
  "time": 6746,
  "freq": 98,
  "amp": 140,
}, {
  "time": 7013,
  "freq": 86,
  "amp": 140,
}, {
  "time": 7151,
  "freq": 77,
  "amp": 150,
}, {
  "time": 7423,
  "freq": 116,
  "amp": 200,
}, {
  "time": 7969,
  "freq": 77,
  "amp": 180,
}, {
  "time": 8237,
  "freq": 77,
  "amp": 180,
}, {
  "time": 8518,
  "freq": 116,
  "amp": 200,
}];

let button;
let canvas;
let drums;
let started = false;
let startTime;
let song;
let junco_fft;
let sambesis = [];
let stair = [];
let trails = [];
let backgroundElements = [];
let interval1;
let interval2;

function preload() { //audio reinladen
  vocals = loadSound('vocals.mp3')
  bass = loadSound('bass.mp3');
  drums = loadSound('drums.mp3');
  marimba = loadSound('other.mp3');
  song = loadSound('Junco.mp3');
}

// const btn = document.querySelector('button'),
//   chunks = [];

// function record() {
//   chunks.length = 0;
//   let stream = document.querySelector('canvas').captureStream(30),
//     recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = e => {
//     if (e.data.size) {
//       chunks.push(e.data);
//     }
//   };
//   recorder.onstop = exportVideo;
//   btn.onclick = e => {
//     recorder.stop();
//     btn.textContent = 'start recording';
//     btn.onclick = record;
//   };
//   recorder.start();
//   btn.textContent = 'stop recording';
// }

// function exportVideo(e) {
//   var blob = new Blob(chunks);
//   var vid = document.createElement('video');
//   vid.id = 'recorded'
//   vid.controls = true;
//   vid.src = URL.createObjectURL(blob);
//   document.body.appendChild(vid);
//   vid.play();
// }
// btn.onclick = record;

function setup() {
  canvas = createCanvas(1920, 1080);
  button = createButton('play');
  button.position(canvas.height + 10); //10 pixel unter canvas
  button.mousePressed(toggleSong);
  marimba.disconnect();
  junco_fft = new p5.FFT(0.9, 1024);
  junco_fft.setInput(song); //nur drums spur analysieren
  canvas.position(window.innerWidth / 2 - canvas.width / 2, window.innerHeight / 2 - canvas.height / 2);
  interval1 = 2000;
  interval2 = 2000;
}

function toggleSong() {
  if (!song.isPlaying()) {
    setTimeout(() => {
      startTime = getMillis();
    });
    setTimeout(() => {
      song.play()
    }, 850);
  }
}

function getMillis() {
  return performance.now();
}

function draw() {
  background(253, 244, 209);
  drawBackgound();
  backgroundElements.forEach((bge, i) => {
    bge.update();
    bge.show();
  });
  backgroundElements.filter((element) => element.x < 0 - element.width);
  drawMarimba();
  trails.forEach((trail, i) => {
    trail.update();
    if (trail.alive === true) {
      trail.show();
    } else {
      trails.splice(i, 1);
    }
  });
  sambesis.forEach((sambesi, i) => {
    sambesi.update();
    if (sambesi.alive === true) {
      sambesi.show();
    } else {
      sambesis.splice(i, 1);
    }
  });
  stair.forEach((step, i) => {
    if (!!step) {
      step.update();
      if (step.alive === true) {
        step.show();
      } else {
        stair[i] = null;
        return;
      }
    }
  });
}

function drawBackgound() {
  if (interval1 >= 2000 && interval2 >= 2000) {
    if (performance.now() - 0 >= interval1) {
      const bge = new itsBackgroundBitch(color(72, 68, 97));
      stair.push(bge);
      interval1 += 500 + (int)(Math.random() * ((1500 - 500) + 1));
    }
    if (performance.now() - 0 >= interval2) {
      const bge = new itsBackgroundBitch(color(96, 82, 129));
      stair.push(bge);
      interval2 += 500 + (int)(Math.random() * ((1500 - 500) + 1));
    }
  }
}


let marimbaState = 0;


function drawMarimba() {
  if (marimbaState === 0) {
    started = true;
  }
  if (data[marimbaState] != undefined) {
    if (performance.now() - startTime >= data[marimbaState].time / baseSpeed) {
      const step = new Step(data[marimbaState].freq * 6, Math.floor(data[marimbaState].amp * 0.6));
      stair.push(step);
      const sambesi = new Sambesi(step);
      sambesis.push(sambesi);
      trails.push(new Trail(sambesi));
      marimbaState++;
    }
  } else {
    return;
  }
}

class itsBackgroundBitch {
  constructor(color) {
    this.color = color;
    this.width = 200 + (int)(Math.random() * ((550 - 200) + 1));
    this.height = 100 + (int)(Math.random() * ((750 - 100) + 1));
    this.x = canvas.width + this.width;
    this.y = canvas.height - this.height;
    this.speed = -7;
    this.alive = true;
  }

  show() {
    if (this.alive) {
      push();
      noStroke();
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
  }

  update() {
    this.x += this.speed;
  }
}

const baseSpeed = 1;

class Step {
  constructor(height, width) {
    this.width = width;
    this.x = canvas.width + this.width / 2;
    this.height = height;
    this.y = canvas.height - this.height;
    this.speed = -20 * baseSpeed;
    this.alive = true;
  }

  show() {
    if (this.alive) {
      push();
      noStroke();
      fill(236, 111, 39);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
  }

  update() {
    this.x += this.speed;
    if (this.x < 0 - this.width) {
      this.alive = false;
    }
  }
}

class Sambesi {
  constructor(step) {
    this.step = step;
    this.x = canvas.width * 0.382 + this.step.width / 2 + 10;
    this.y = -860 - canvas.height - this.step.height;
    this.dropSpeed = 50 * baseSpeed;
    this.alive = true;
  }

  show() { //Zeichnet Ball auf Funktion
    push(); //stylistische Parameter nur auf Ellipse weil push und pop 
    noStroke();
    fill(248, 170, 49, 200);
    rect(this.x - 10.5, this.y, 20, -1700);
    fill(84, 68, 134);
    ellipse(this.x, this.y, 20, 20);
    fill(52, 40, 90);
    arc(this.x, this.y, 20, 20, -PI, 0);
    pop();
  }

  update() {
    this.y += this.dropSpeed;
    if (this.y > height - this.step.height) {
      this.alive = false;
    }
  }
}

class Trail {
  constructor(Sambesi) {
    this.ball = Sambesi;
    this.color = color(245, 172, 32, 185);
    this.width = 20;
    this.height = -1200;
    this.x = this.ball.x - this.ball.width / 2 - this.width / 2;
    this.alive = true;
  }

  show() {
    push();
    noStroke();
    fill(this.color);
    rect(this.x, this.ball.y - 10, 20, this.height);
    pop();
  }

  update() {
    if (!this.ball.alive) {
      this.x = this.ball.step.x - 20 * baseSpeed + this.ball.step.width / 2 - this.width / 2;
      this.color = color(245, 172, 32);
    }
    if (!this.ball.step.alive) {
      this.alive = false;
    }
  }
}
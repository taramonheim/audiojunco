/*marimba
drums.mp3 
Bands: ? 
Peak:  ? noch rausfinden*/
//neues File anschauen freqfinder
//other.mp3 -marimba 
//TODO: freqfinder 
/*
75 has 120
*/

let marimbaNotes = [{ 
            hh: 131,
            peak: 199,
          } , {
            hh: 104,
            peak: 180,
          } , {
            hh: 87,
            peak: 205,
          } , {
            hh: 65,
            peak: 188,
          }];

let button;
let canvas;
let drums;
let song;
let junco_fft;
let marimba;
let bass;
let piano;
let vocals;
let drums_fft;
let ball_array = [];
let marimba_fft;
let marimba_array = [];
let bass_fft;
let vocals_fft;
let stair = [];
let startDelay = 40;
let spacer = 0;
let timer = 0;
let spacer2 = 0;
let timer2 = 0;
let timer3 = 0;
let spacer3 = 0;
let timer4 = 0;
let spacer4 = 0;

function preload() { //audio reinladen
  song = loadSound('Junco.mp3');
}

function setup() {
  canvas = createCanvas(1920, 1080);
  button = createButton('play or pause');
  button.position(canvas.width/2, canvas.height + 10); //10 pixel unter canvas
  button.mousePressed(toggleSong);
  junco_fft = new p5.FFT();
  junco_fft.setInput(song);
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
let debugValues = ""
function draw() {
  background(253, 244, 209);
  debugValues = ""
  for (let i = 0; i < marimbaNotes.length; i++) {
    if (startDelay > 0 && marimbaNotes[i].hh === 131) {
      peak = marimbaNotes[i].peak - 38;
    } else {
      peak = marimbaNotes[i].peak;
    }
    tone(marimbaNotes[i].hh, peak);
  }
  console.log(debugValues);
  //tone();
  stair.forEach((step, i) => {
    step.update();
    if (step.alive) {
      step.show();
    } else {
      stair.splice(i, 1);
    }
  });
  ball_array.forEach(function (ball, i) {
    ball.update();
    if (ball.alive) {
      ball.show();
    } else {
      ball_array.splice(i, 1);
    }
  });
  if (startDelay > 0) {
    startDelay--;
  }
  if (timer > 0) {
    timer=timer-2;
  }
  if (timer === 0) {
    spacer = 0;
  }
}

let lastHHval = 0;
let direction_hh = 1; // wenn HH ansteigt dann speichern wir einen positiven Wert in die Variable (einfache Werte)

function tone(hh, peak) {
  let spectrum = junco_fft.analyze();
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
  debugValues += hh_value.toString()
  debugValues += " - "
  if (lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if (direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
      if (hh === 131) {   
        if (spacer < 2 && timer < 5) {
          let step = new Step(hh * 6, Math.floor(peak * 0.5));
          stair.push(step);
          spacer++;
          if (spacer === 1) {
            timer = 10;
          } else if (spacer === 2) {
            timer = 10;
          }
        } else {
          return;
        }
      }
    }
    if (hh === 104) {
      if (spacer < 1 && timer === 0) {
        let step = new Step(hh * 6, Math.floor(peak * 0.5));
        stair.push(step);
        spacer++;
        console.log(spacer)
        timer = 15;
      } else {
        return;
      }
    }
    if (hh === 87) {
      if (spacer < 1 && timer === 0) {
        let step = new Step(hh * 6, Math.floor(peak * 0.4));
        stair.push(step);
        spacer++;
        console.log(spacer)
        timer = 15;
      } else {
        return;
      }
    }
    if (hh === 65) {
      if (spacer < 2 && timer < 5) {
        let step = new Step(hh * 6, Math.floor(peak));
        stair.push(step);
        spacer++;
        if (spacer === 1) {
          timer = 10;
        } else if (spacer === 2) {
          timer = 20;
        }
      } else {
        return;
      }
    }
    direction_hh = -1; //man schaut auf welcher Seite des Ausschlags man ist
  } else {
    direction_hh = 1;
  }
  lastHHval = hh_value;
}


class Step {
  constructor(height, width) {
    this.x = canvas.width;
    this.width = width;
    this.height = height;
    this.y = canvas.height - this.height;
    this.speed = -30;
    this.alive = true;
  }

  show() {
    push();
    noStroke();
    fill(236, 111, 39);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  update() {
    this.x += this.speed;
    if (this.x < 0 - this.width) {
      this.alive = false;
    }
  }
}

class Ball {
  constructor(name) {
    this.y = 50;
    this.name = name;
    this.speed = 1;
    this.accel = 1.6;
    this.alive = true;
  }

  show() { //Zeichnet Ball auf Funktion
    push(); //stylistische Parameter nur auf Ellipse weil push und pop 
    if (this.name === junco_fft) {
      noStroke();
      fill(52, 40, 90);
      ellipse(50, this.y, 16, 16);
      fill(84, 68, 134);
      arc(50, this.y, 16, 16, -PI, 0);
    } else if (this.name === bass_fft) {
      fill(52, 40, 90);
      arc(400, this.y, 80, 80, -PI, 0);
    } else if (this.name === vocals_fft) {
      fill(52, 40, 90);
      arc(500, this.y, 80, 80, -PI, 0);
    }
    pop();
  }

  update() {
    this.y += this.speed;
    this.speed *= this.accel;
    if (this.y > height + 100) {
      this.alive = false;
    }
  }
}
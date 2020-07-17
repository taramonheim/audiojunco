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

let marimbaNotes = [131, 104, 87, 65]

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
  vocals = loadSound('vocals.mp3')
  bass = loadSound('bass.mp3');
  drums = loadSound('drums.mp3');
  marimba = loadSound('other.mp3');
  song = loadSound('Junco.mp3');
}

function setup() {
  canvas = createCanvas(1920, 1080);
  button = createButton('play or pause');
  button.position(canvas.height + 10); //10 pixel unter canvas
  button.mousePressed(toggleSong);
  marimba.disconnect();
  junco_fft = new p5.FFT();
  junco_fft.setInput(song);
  marimba_fft = new p5.FFT(0.3, 1024);
  marimba_fft.setInput(marimba);
  drums.disconnect();
  drums_fft = new p5.FFT();
  drums_fft.setInput(drums);
  bass.disconnect();
  bass_fft = new p5.FFT();
  bass_fft.setInput(bass);
  vocals.disconnect();
  vocals_fft = new p5.FFT();
  vocals_fft.setInput(vocals); //nur drums spur analysieren
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
    drums.pause();
    marimba.pause();
  } else {
    song.play();
    drums.play();
    marimba.play();
    bass.play();
  }
}

function draw() {
  background(253, 244, 209);
  tone1();
  tone2();
  tone3();
  tone4();
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
  if (timer > 0) {
    timer--;
  }
  if (timer === 0) {
    spacer = 0;
  }
  if (timer2 > 0) {
    timer2--;
  } 
  if (timer2 === 0) {
    spacer2 = 0;
  }  
  if (timer3 > 0) {
    timer3--;
  } 
  if (timer3 === 0) {
    spacer3 = 0;
  }
  if (timer4 > 0) {
    timer4--;
  }
  if (timer4 === 0) {
    spacer4 = 0;
  }  
}

let lastHHval = 0;
let direction_hh = 1; // wenn HH ansteigt dann speichern wir einen positiven Wert in die Variable (einfache Werte)

function tone1() {
  let hh = 131;
  if (startDelay > 0) {
    peak = 150;
    startDelay--;
  } else {
    peak = 188;
  }
  let spectrum = junco_fft.analyze();
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
  if (lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if (direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
      if (spacer < 2 && timer < 38) {
        let step = new Step(hh*6, Math.floor(peak * 0.4));
        stair.push(step);
        spacer++;
        if (spacer === 1) {
        timer = 45;
        } else if (spacer === 2) {
          timer = 125;
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


function tone2() {
  let hh = 104;
  peak = 180;
  let spectrum = junco_fft.analyze();
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
  if (lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if (direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
      if (spacer2 < 1 && timer2 === 0) {
        let step = new Step(hh*6, Math.floor(peak * 0.4));
        stair.push(step);
        spacer2++;
        console.log(spacer2)
        timer2 = 50;
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

function tone3() {
  let hh = 87;
  peak = 205;
  let spectrum = junco_fft.analyze();
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
  if (lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if (direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
      if (spacer3 < 1 && timer3 === 0) {
        let step = new Step(hh*6, Math.floor(peak*0.3));
        stair.push(step);
        spacer3++;
        console.log(spacer2)
        timer3 = 70;
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

function tone4() {
  let hh = 65;
  let peak = 188;
  let spectrum = junco_fft.analyze();
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
  if (lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if (direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
      if (spacer4 < 2 && timer4 < 10) {
        let step = new Step(hh*6, Math.floor(peak));
        stair.push(step);
        spacer4++;
        if (spacer4 === 1) {
        timer4 = 45;
        } else if (spacer4 === 2) {
          timer4 = 90;
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
  constructor(x,y,r,name) {
    this.x =x;
    this.y =y;
    this.r = r;
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
  }
}

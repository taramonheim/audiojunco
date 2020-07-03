/*marimba
drums.mp3 
Bands: ? 
Peak:  ? noch rausfinden*/ 
//neues File anschauen freqfinder
//other.mp3 -marimba 
//TODO: freqfinder 


let button;
let canvas;
let drums;
let song;
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

function preload () { //audio reinladen
    vocals = loadSound('vocals.mp3')
    bass = loadSound('bass.mp3');
    drums = loadSound('drums.mp3');
    marimba = loadSound('other.mp3');
    song = loadSound('Junco.mp3');
}

function setup() {
    canvas = createCanvas(1920, 1080);
    button = createButton ('play or pause');
    button.position(canvas.height + 10); //10 pixel unter canvas
    button.mousePressed(toggleSong);
    marimba.disconnect();
    marimba_fft = new p5.FFT();
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
    //analysieren wenns soweit ist:
}

function toggleSong() {
  if(song.isPlaying()) {
    song.pause();
    drums.pause();
    marimba.pause();
} else {
    song.play();
    drums.play();
    marimba.play();
  }
}

function draw(){
  background(253, 244, 209);
  checkHH(drums_fft, 2, 196);
  checkHH(marimba_fft, 87, 70); //Highhead 
  checkHH(bass_fft, 3, 194); //Highhead 
  checkHH(vocals_fft, 10, 144); //Highhead 
    ball_array.forEach(function (ball, i){
      ball.update();
      if(ball.alive){
          ball.show();
      }else{
          ball_array.splice(i, 1);
      }
    }) 
}

let lastHHval = 0;
let direction_hh = 1; // wenn HH ansteigt dann speichern wir einen positiven Wert in die Variable (einfache Werte)

function checkHH(input, hh, peak) {
  let spectrum = input.analyze();
  console.log(spectrum);
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
    if(lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if(direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
     let ball = new Ball(input);
     ball_array.push(ball); 
    }
     direction_hh =-1; //man schaut auf welcher Seite des Ausschlags man ist
  } else {
   direction_hh= 1;
  }
  lastHHval = hh_value;
}

class Ball {
  constructor(name) {
    this.y = 50;
    this.name = name;
    this.speed = 0.8;
    this.accel=1.3;
    this.alive = true;
  }
 
  show() { //Zeichnet Ball auf Funktion
    push();  //stylistische Parameter nur auf Ellipse weil push und pop 
      if (this.name === marimba_fft) {
        noStroke();
        fill(52, 40, 90);
        ellipse(50, this.y, 16, 16);
        fill(84, 68, 134);
        arc(50, this.y, 16, 16, -PI, 0);
      } else if (this.name === drums_fft) {
        stroke(255);
        strokeWeight(3);
        fill(100);
        ellipse(200, this.y, 40);
      } else if (this.name === bass_fft) {
        fill(52, 40, 90);
        arc(400, this.y, 80, 80, -PI, 0);  
      } else if (rhis.name === vocals_fft) {
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
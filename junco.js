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

function preload () { //audio reinladen
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
    drums_fft = new p5.FFT()
    drums_fft.setInput(drums); //nur drums spur analysieren
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
  checkHH(drums_fft, 2, 196); //Highhead 
      ball_array.forEach(function (ball){
        ball.update();
        ball.show();
    });
    checkHH(marimba_fft, 87, 70); //Highhead 
    ball_array.forEach(function (ball){
      ball.update();
      ball.show();
  });
}

let lastHHval = 0;
let direction_hh = 1; // wenn HH ansteigt dann speichern wir einen positiven Wert in die Variable (einfache Werte)

function checkHH(input, hh, peak) {
  let spectrum = input.analyze();
  console.log(spectrum);
  let hh_value = spectrum[hh]; //TODO:ersetzten durch eigenes highhead value 
    if(lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
    if(direction_hh > 0 && lastHHval > peak) { //TODO: anderer Wert
     let ball = new Ball(50, 50, 20, input);
     ball_array.push(ball); 
    }
     direction_hh =-1; //man schaut auf welcher Seite des Ausschlags man ist
  } else {
   direction_hh= 1;
  }
  lastHHval = hh_value;
}

class Ball {
  constructor(x,y,r,name) {
    this.x =x;
    this.y =y;
    this.r = r;
    this.name = name;
    this.speed = 0.8;
    this.accel=1.3;
  }
 
  show() { //Zeichnet Ball auf Funktion
    push();  //stylistische Parameter nur auf Ellipse weil push und pop 
      if (this.name === marimba_fft) {
        noStroke();
        fill(52, 40, 90);
        ellipse(this.x, this.y, this.r*2, this.r*2);
        fill(84, 68, 134);
        arc(this.x, this.y, this.r*2, this.r*2, -PI, 0);
      } else if (this.name === drums_fft) {
        stroke(255);
        strokeWeight(3);
        fill(100);
        ellipse(this.x, this.y, this.r *2);
      }
    pop();
  }

  update() {
    this.y += this.speed;
    this.speed *= this.accel;
  }
}
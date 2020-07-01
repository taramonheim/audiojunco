/*marimba
drums.mp3 
Bands: ? 
Peak:  ? noch rausfinden*/ 
//neues File anschauen freqfinder
//other.mp3 -marimba 
//TODO: freqfinder 
//bass.mp3: Synthesiser 
//other.mp3: Marimba
//drums.pm3: Drums


let drums;
let song;
let other;
let drums_fft;
let ball_array = [];


function preload (){ //audio reinladen
    drums = loadSound('drums.mp3');
    song = loadSound('Junco.mp3');
}

let button;
let canvas;

function setup(){
    canvas = createCanvas(1920, 1080);
    button = createButton ('play or pause')
    button.position (canvas.height + 10) //10 pixel unter canvas
    button.mousePressed(toggleSong);
    drums.disconnect();
    //song.disconnect(); 
    drums_fft = new p5.FFT()
    drums_fft.setInput(drums); //nur drums spur analysieren
    //analysieren wenns soweit ist:
}

function toggleSong (){
  if(song.isPlaying()){
  song.pause();
  drums.pause();
} else {
song.play();
drums.play();
  }
}

function draw(){
  background(253, 244, 209);
  checkHH(); //Highhead 

      ball_array.forEach(function (ball){
        ball.update();
        ball.show();
    });
}

let lastHHval = 0;
let direction_hh = 1; // wenn HH ansteigt dann speichern wir einen positiven Wert in die Variable (einfache Werte)
function checkHH() {
 let drums_spectrum = drums_fft.analyze();
 console.log(drums_spectrum); 
 let hh_value = drums_spectrum [40]; //TODO:ersetzten durch eigenes highhead value 

 if(lastHHval > hh_value) { //vergleichen und schauen in welche Richtung der Track läuft 
   if(direction_hh > 0 && lastHHval > 70 ) { //TODO: anderer Wert
    let ball = new Ball(50, 50); 
    ball_array.push(ball); 
   }
    direction_hh =-1; //man schaut auf welcher Seite des Ausschlags man ist
 } else {
  direction_hh= 1;
 }

 lastHHval = hh_value; 

}

class Ball {
  constructor(x,y,r = 20) {
    this.x =x;
    this.y =y;
    this.r = r;
    this.speed = 0.8;
    this.accel=1.3;
  }
 
  show() { //Zeichnet Ball auf Funktion
  push();  //stylistische Parameter nur auf Ellipse weil push und pop 
  stroke(255);
  strokeWeight(3);
  fill(100);
  ellipse(this.x, this.y, this.r *2);
  pop();
  }

  update() {
    this.y += this.speed;
    this.speed *= this.accel;
  }
}
//TODO: nicht mehrere Kreise sondern nur einer 
/*marimba
other.mp3
Bands: ? 
Peak:  ? noch rausfinden*/

let drums
let song
let other

function preload (){ //audio reinladen
    drums = loadSound('drums.mp3')
    song = loadSound('Junco.mp3')
}

let canvas 
let button 

function setup(){
    canvas = createCanvas(1920, 1080);
    button = createButton ('play or pause')
    button.position (canvas.height + 10) //10 pixel unter canvas
    button.mousepressed(toggleSong);
}

function draw(){

}

class Sambesi {
  constructor(x,y,r = 20) {
    this.x =x;
    this.y =y;
    this.r = r;
    this.speed = 0.8;
    this.accel=1.3;
  }
  show() {//Zeichnet Ball auf Funktion
  push(); //stylistische Parameter nur auf Ellipse weil push und pop 
 stroke(255);
 strokeWeight(3);
 fill(100);
 ellipse(this.x, this.y, this.r *2);
pop(); 
  }
}
update () {
  this.y += this.speed;
  this.speed *= this.accel;
}
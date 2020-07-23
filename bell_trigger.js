const bellBands = [{b: 87, p:160, oV: 0, oD: 1}, {b:65, p:180, oV: 0, oD: 1}, {b:104, p:170, oV: 0, oD: 1}, {b:75, p:160, oV: 0, oD: 1}, {b:56, p:180, oV: 0, oD: 1}];
let oldBellVals = [0, 0, 0, 0, 0];

let bellData_FFT
let song, button, bell_fft

function preload(){
    song = loadSound('Junco.mp3');
}

function setup(){
    canvas = createCanvas(1920, 1080);
    button = createButton('play / pause');
    button.position(10, canvas.height + 10);
    button.mousePressed(toggleSong);

    //song.disconnect();
    // song.disconnect();

    bell_fft = new p5.FFT(0.95, 1024)
    bell_fft.setInput(song);
}

function draw(){
    background(230, 210, 200);

    bellData_FFT = bell_fft.analyze()
    bellBands.forEach((band, i) => {
        push();
        fill(0);
        textSize(30);
        text(band.b, 50 + i * 90, 100)
        rect(40 + i*90, 0, 60, bellData_FFT[band.b])
        //text(getTrigger(band), 50 + i * 90, 200) ;
        pop();
    })


}

function analyzeSound(){
    
    console.log(bellData_FFT);
}

let startTime;

function toggleSong(){
    if(song.isPlaying()){
        song.pause();
    }else{
        song.play();
        startTime = performance.now();
    }
}



// function getTrigger (band, index){
//     let trigger = false
//     if()
//     if(band.oV > bellData_FFT[band.b]){
//         if(band.oD > 0){
            
//         }
//         direction = -1;
//         band.oD = direction;
//     }else{
//         direction = 1;
//         band.oD = direction;
//     }
//     band.oV = bellData_FFT[band.b]
//     return trigger;
// }

class Ball{
    constructor(x, y, r = 20){
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = 0.8;
        this.accel = 1.3;
    }

    show(){
        push();
        stroke(255);b
        strokeWeight(3);
        fill(100);
        ellipse(this.x, this.y, this.r * 2);
        pop();
    }

    update(){
        this.y += this.speed;
        this.speed *= this.accel;
    }
}
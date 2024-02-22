
let human

let friends = []

let recordings
let recordingIndex = 0

class Robot {
  constructor (_x, _y, _w, _h, _tl, _tr, _bl, _br) {
    this.x = _x
    this.y = _y
    this.w = _w
    this.h = _h
    this.tl = _tl
    this.tr = _tr
    this.bl = _bl
    this.br = _br
    this.color = [random(0,255), random(0,255), random(0,255)]
  }

  head() {
    fill(this.color)
    rectMode(RADIUS)
    noStroke()
    // rect(this.x, this.y, this.w, this.h, this.tl, this.tr)
    rect(300, 200, 100, 60, 25, 25, 25, 25)
  }

  reye() {
    fill(0, 0, 0)
    noStroke()
    rectMode(RADIUS)
    rect(330, 200, 10, 15, 5, 5, 5, 5)
  }

  leye() {
    fill(0, 0, 0)
    noStroke()
    rectMode(RADIUS)
    rect(270, 200, 10, 15, 5, 5, 5, 5)
  }

  body() {
    fill(this.color)
    noStroke()
    rectMode(RADIUS)
    rect(300, 300, 55, 40, 0, 0, 50, 50)
  }

  antenna() {
    fill(0, 0, 0)
    rectMode(RADIUS)
    rect(300, 120, 5, 20)
  }

  bulb() {
    fill(this.color)
    noStroke()
    rectMode(RADIUS)
    rect(300, 100, 15, 15, 15, 15, 15, 15)
  }
}

function preload() {
  human = loadSound("assets/human.m4a")
}

function preload() {
  recordings = 
  [
    loadSound("assets/0.m4a"),
    loadSound("assets/1.m4a"),
    loadSound("assets/2.m4a"),
    loadSound("assets/3.m4a"),
    loadSound("assets/4.m4a"),
    loadSound("assets/5.m4a"),
    loadSound("assets/6.m4a"),
    loadSound("assets/7.m4a"),
    loadSound("assets/8.m4a"),
    loadSound("assets/9.m4a")
  ]

  //need to preload all the poems and store in an array
}

function setup() {
  let cnv = createCanvas(600, 600);
  background(210);

  human = loadSound('assets/human.m4a')

  cnv.mousePressed(userStartAudio)

  friends.push(new Robot())

}


function mousePressed() {
  if (human.isPlaying()) {
    // .isPlaying() returns a boolean
    human.stop();
    console.log("not playing")
  } else {
    human.play();
    console.log("playing")
  }
}

function keyPressed() {
    for (let i = 0; i < 9; i++) {
      a = 48 + i
      if(keyCode === a) {
        //play audio within in an array
        recordings[i].play()
        console.log("recording is playing")
      }
    }

    for (let i = 0; i < friends.length; i++) {
      friends[i].head();
      friends[i].body();
      friends[i].reye();
      friends[i].leye();
      friends[i].antenna();
      friends[i].bulb();

    }
  
    
  }


function draw() {

friends.push(new Robot())



}


// micLevel = mic.getLevel();
// let a = map(micLevel, 0, 0.075, 0, 360)
// let b = map(micLevel, 0, 0.075, 0, 100)
// let c = map(micLevel, 0, 0.075, 0, 100)

// bg = [a, b, c]

// // console.log(micLevel)

// if (micLevel > 0.05) {
//   outputVolume(0.5, 1)
// } else {
//   outputVolume(1)
// }

// let song;
// let bg = [0, 0, 0]

// function setup() {
//   //LOAD 
//   song = loadSound('bones_bones_bones_audio.mp3');
//   createCanvas(windowWidth, windowHeight);
//   background(bg);
// }

// function mousePressed() {
//   if (song.isPlaying()) {
//     // .isPlaying() returns a boolean
//     song.stop();
//     console.log("not playing")
//   } else {
//     song.play();
//     console.log("playing")
//   }
// }







// let mic
// let synth, soundLoop;
//   let notePattern = [60, 62, 64, 67, 69, 72]

// function setup() {
// let cnv = createCanvas(windowWidth,windowHeight);
// cnv.mousePressed(userStartAudio);
// textAlign(CENTER)
// mic = new p5.AudioIn()
// mic.start()

// cnv.mousePressed(canvasPressed)
// let intervalInSeconds = 0.5
// soundLoop = new p5.SoundLoop(onSoundLoop, intervalInSeconds)

// synth = new p5.MonoSynth

// }

// function canvasPressed() {
//   userStartAudio()
//   if(soundLoop.isPlaying){
//     soundLoop.stop()
//   } else{ 
//     soundLoop.start()
//   }
// }

// function onSoundLoop(timeFromNow) {
//   let noteIndex = (soundLoop.iterations - 1) % notePattern.length;
//   let note = midiToFreq(notePattern[noteIndex])
//     synth.play(note, 0.5, timeFromNow)
//     background(noteIndex * 360 / notePattern.length, 50, 100)
// }

// function draw() {
//  background(0)
//  fill(255)

//  micLevel = mic.getLevel()
//  let y = height - micLevel * height
//  ellipse(width/2, y, 10, 10)
// }


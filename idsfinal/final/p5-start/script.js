let bg = [255, 255, 255]
let imageIndex = 0
let images
function preload(){
  images = [
    loadImage('screen/blanksolid.png'),
    loadImage('screen/httpsolid.png'),
    loadImage('screen/dizzysolid.png'),
    loadImage('screen/mountainsolid.png'),
    loadImage('screen/bloodsolid.png'),
    loadImage('screen/crevsolid.png'),
    loadImage('screen/syringe.jpg'),
    loadImage('screen/blank.png'),
    loadImage('screen/http.png'),
    loadImage('screen/dizzyworld.png'),
    loadImage('screen/blinkmountain.png'),
    loadImage('screen/breadthblood.png'),
    loadImage('screen/presentmoment.png'),
  ]}


// sound setup
let mic, fft;


//glitch setup
let glitch, typeCounter = 0
let video
// let httpglitch


// lines setup
let newline
let lines = []
let numlines = 50
randomrgb = []
class Line {
  constructor(){
    this.x = random(0, windowWidth)
    this.y = random(0, windowHeight)
    this.speed = random(1, 15)
    this.length = random(20, 150)
    this.color = random(randomrgb)
  }


  display(){
  stroke(this.color)
  strokeWeight(random(1,5))
  line(this.x, this.y, this.x + this.length, this.y);
}


  update(){
    this.x += this.speed
    if (this.x > windowWidth) {
      this.x = 0;
      this.y = random(windowHeight);
      this.speed = random(1, 15);
      this.length = random(20, 150);
      this.color = random(randomrgb);
    }
  }
}


// final color transition
let colortransition = [
  [200, 51 , 92], // Red
  [255, 102, 102], // Dusk
  [255, 153, 102],
  [255, 204, 102],
  [255, 255, 102],
  [204, 255, 102],
  [102, 255, 102],
  [102, 255, 204],
  [102, 255, 255],
  [102, 204, 255],
  [102, 153, 255], // Dawn
  [255, 255, 255]
]
let currentColorIndex = 0;
let nextColorIndex = 1;
let blendAmount = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg)


  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);


  glitch = new Glitch();
  setupGlitch(); // load image w/ random type




randomrgb.push(color(200, 51 , 92))
randomrgb.push(color(14, 146 , 107))
randomrgb.push(color(25, 69 , 124))


  for (let i = 0; i < numlines; i++) {
    x = random(0, windowWidth)
    y = random(0, windowHeight)
    let newline = new Line(
        x,
        y,
        x + random(15, 140),
        y,
        random(1, 5))
    lines.push(newline);
}


//insert video so framecount doesnt break
video = createVideo('screen/glitch.mp4')


}




function draw() {
console.log(frameCount)
imageMode(CENTER);
image(images[imageIndex], windowWidth/2, windowHeight/2,windowWidth, windowHeight)




  //intro
  if (frameCount < 1400) {
    http()
    }


  //penicillin
  if (frameCount > 1400 & frameCount < 1700){
    rect(0, 0, windowWidth, windowHeight)
    fill(255, 255, 255)
    imageMode(CENTER);
    image(images[6], windowWidth/2, windowHeight/2)
  }


  //selfdiscovery
  if (frameCount > 1700 & frameCount < 3800){
    http()
  }


  //data uploaded
  if (frameCount > 3800 & frameCount < 6080){
    http()
    linesdisplay()
  }


  //q1
  if (frameCount > 6080 & frameCount < 7200){
    dizzy()
  }


  //post q1
  if (frameCount > 7200 & frameCount < 7450){
    http()
    linesdisplay()
  }


  //q1
  if (frameCount > 7450 & frameCount < 8900){
    mountain()
  }


  //post q2
  if (frameCount > 8900 & frameCount < 9100){
    http()
    linesdisplay()
  }


  //q3
  if (frameCount > 9100 & frameCount < 10250){
    blood()
  }


  //post q3
  if (frameCount > 10250 & frameCount < 10560){
    http()
    linesdisplay()
  }


//q4
  if (frameCount > 10560 & frameCount < 11850){
    moment()
  }


  //post q4
  if (frameCount > 11850 & frameCount < 12200){
    http()
    linesdisplay()
  }


  //miya voice
  if (frameCount > 12200 & frameCount < 15210){
    sound()
  }


  //angy miya
  if (frameCount > 15210 & frameCount < 16300){
    rect(0, 0, windowWidth, windowHeight)
    fill(200, 51 , 92)
    imageIndex = 8
    linesdisplay()
  }
 
  //poem reading
  if (frameCount > 16300 & frameCount < 29700){
  colorchange()
  }


}


// blank screen default
function blank() {
imageIndex = 0
}


//hypertext screen
function http(){
imageIndex = 1
}


//dizzy screen
function dizzy(){
  imageIndex = 2
}


//mountain screen
function mountain(){
  imageIndex = 3
}


//blood screen
function blood(){
  imageIndex = 4
}


//moment screen
function moment(){
  imageIndex = 5
}



// sound interaction screen
function sound(){
  rect(0, 0, windowWidth, windowHeight)
  fill(255, 255, 255)
    // Get the amplitude and frequency data from the microphone input
    let waveform = fft.waveform();

    // Set the stroke color based on the amplitude of the sound input
    let amplitude = mic.getLevel();
    let strokeColor = map(amplitude, 0, 1, 0, 255);
    stroke(strokeColor, 255, 255);
   
    // Set the thickness of the line based on the frequency data
    let freq = fft.getEnergy("bass");
    let thickness = map(freq, 0, 255, 1, 10);
    strokeWeight(thickness);
 
    // Draw a line that changes based on the sound input
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
}


function linesdisplay(){
  for (let i = 0; i < lines.length; i++) {
  lines[i].update()
  lines[i].display()
    }}


function colorchange(){
  blendAmount += 0.002; // Adjust the speed of transition


  // Blend between current and next color
  let currentColor = colortransition[currentColorIndex];
  let nextColor = colortransition[nextColorIndex];
  let blendedColor = lerpColor(color(currentColor[0], currentColor[1], currentColor[2]), color(nextColor[0], nextColor[1], nextColor[2]), blendAmount);


  rect(0, 0, windowWidth, windowHeight)
  fill(blendedColor)


  if (blendAmount >= 1) {
    currentColorIndex = (currentColorIndex + 1) % colortransition.length;
    nextColorIndex = (nextColorIndex + 1) % colortransition.length;
    blendAmount = 0;
  }
}

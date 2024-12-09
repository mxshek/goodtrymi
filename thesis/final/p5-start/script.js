let bg = [255, 255, 255]
let imageIndex = 0
let images
function preload(){
  images = [
    loadImage("screen/blanksolid.png"),
    loadImage("screen/httpsolid.png"),
    loadImage("screen/dizzysolid.png"),
    loadImage("screen/mountainsolid.png"),
    loadImage("screen/bloodsolid.png"),
    loadImage("screen/crevsolid.png"),
    loadImage("screen/syringe.jpg"),
    loadImage("screen/blank.png"),
    loadImage("screen/http.png"),
    loadImage("screen/dizzyworld.png"),
    loadImage("screen/blinkmountain.png"),
    loadImage("screen/breadthblood.png"),
    loadImage("screen/presentmoment.png"),
  ]}


// sound setup
let mic, fft;


// lines setup
let newline
let lines = []
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
  [200, 51 , 92],
  [200, 51 , 92], // Red
  [200, 51 , 92], // Red
  [200, 51 , 92], // Red  // Red
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
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
]

let currentColorIndex = 0;
let nextColorIndex = 1;
let blendAmount = 0;

// took inspiration from Thiago's glitchy typewriter
class FadingWord {
  constructor(_word, _wordDelay) {
    this.word = _word;
    this.alpha = 255;
    this.startTime = millis();
    this.letterDelay = _wordDelay / this.word.length;

    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.font = "sans-serif";
    this.size = minTextSize;
    this.yOffset = 0;
    this.fadeVel = -0.5;

    // red = (200, 51 , 92))
    // green = (14, 146 , 107))
    // blue = color(25, 69 , 124))

    if (this.word.toLowerCase() == "down" || this.word.toLowerCase() == "dizzy" || this.word.toLowerCase() == "world" || this.word.toLowerCase() == "base" || random() > 0.95) {
      this.word = this.word.toUpperCase();
      this.red = 25
      this.green = 69
      this.blue = 124;
      this.font = "monospace";
      this.size = maxTextSize;
      this.yOffset = -this.size / 6;
      this.fadeVel = -0.05;
    }

    if (this.word.toLowerCase() == "blink" || this.word.toLowerCase() == "mountain" || random() > 0.95) {
      this.word = this.word.toUpperCase();
      this.red = 14
      this.green = 146
      this.blue = 107;
      this.font = "monospace";
      this.size = maxTextSize;
      this.yOffset = -this.size / 6;
      this.fadeVel = -0.05;
    }

    if (this.word.toLowerCase() == "breadth" || this.word.toLowerCase() == "blood" || random() > 0.95) {
      this.word = this.word.toUpperCase();
      this.red = 200;
      this.green = 51;
      this.blue = 92;
      this.font = "monospace";
      this.size = maxTextSize;
      this.yOffset = -this.size / 6;
      this.fadeVel = -0.05;
    }

    if (this.word.toLowerCase() == "crevasses" || this.word.toLowerCase() == "present" || this.word.toLowerCase() == "moment" || random() > 0.95) {
      this.word = this.word.toUpperCase();
      // try gray?
      this.red = 128;
      this.green = 128;
      this.blue = 128;
      this.font = "monospace";
      this.size = maxTextSize;
      this.yOffset = -this.size / 6;
      this.fadeVel = -0.05;
    }

    textFont(this.font);
    textSize(this.size);
    this.width = textWidth(this.word);

    // update cx and cy and set this.x and this.y
    // if placing the next word on this line causes overflow
    if (cx + textWidth(this.word) > width - MARGIN) {
      // reset x, increment y
      cx = MARGIN;
      cy += lineHeight;

      // if larger than canvas
      if (cy > height - MARGIN) {
        // reset y
        cy = MARGIN;
      }
    }

    this.x = cx;
    this.y = cy;

    // update cx for next word
    cx += this.width + spaceWidth;
  }

  update() {
    this.alpha += this.fadeVel;
  }

  draw() {
    let elapsed = millis() - this.startTime;
    let lastLetter = min(floor(elapsed / this.letterDelay), this.word.length);
    let letters = this.word.slice(0, lastLetter);

    fill(this.red, this.green, this.blue, this.alpha);
    textFont(this.font);
    textSize(this.size);
    text(letters, this.x, this.y + this.yOffset);
  }
}

let q1words = [ 
  "DOWN",
  "AT",
  "THE",
  "BASE",
  "OF",
  "A",
  "DIZZY",
  "WORLD",
  "You",
  "explore",
  "themes",
  "related",
  "to", 
  "perspective,",
  "existence", 
  "or", 
  "the", 
  "complexities", 
  "of", 
  "life.", 
  "You", 
  "are", 
  "confused,", 
  "looking", 
  "for", 
  "somewhere", "to", "be", "in", "the", "world,", "carving", "your", "edges,", "your", "puzzle", "piece", "limbs.", "You", "focus", "on", "fitting", "into", "a", "world", "that", "does", "not", "even", "know", "you’re", "speaking", "to", "it."
]

let q2words = [
  "THE",
  "BLINK",
  "OF",
  "A",
  "MOUNTAIN",
  "This", "phrase", "suggests", "a", "blend", "of", "natural", "beauty", "and", "transience.", "You", "appreciate", "the", "fleeting", "moments", "of", "awe-inspiring", "experiences.", "You", "marvel", "at", "majesty.", "You", "seek", "to", "build.", "And", "fear", "what", "would", "be", "made.", "You", "are", "paralyzed", "by", "your", "indecision", "and", "your", "idealism.", "You", "will", "never", "be", "enough."
]

let q3words = [
  "THE",
  "BREADTH",
  "OF",
  "BLOOD",
  "You", "have", "a", "depth", "of", "feeling", "or", "a", "sense", "of", "visceral", "connection.", "Your", "pain", "spans", "time", "periods", "and", "people", "and", "politics.", "You", "speak", "of", "the", "human", "experience", "and", "capturing", "all", "that", "it", "is,", "but", "all", "you", "write", "about", "is", "pain.", "Because", "that", "is", "all", "you", "see."
]

let q4words = [
  "THE",
  "CREVASSES",
  "OF",
  "MY",
  "PRESENT",
  "MOMENT",
  'You', 'carry', 'yourself', 'with', 'an', 'air', 'of', 'vulnerability', 'and', 'introspection.', 'You', 'are', 'grappling', 'with', 'internal', 'struggles', 'or', 'uncertainties', 'and', 'this', 'is', 'why', 'you', 'always', 'fall.', 'No', 'matter', 'how', 'happy,', 'no', 'matter', 'how', 'high', 'you', 'feel,', 'no', 'matter', 'if', 'the', 'signs', 'of', 'danger', 'are', 'obvious,', 'you', 'always', 'step', 'into', 'the', 'pitfall.', 'Your', 'crash', 'is', 'inevitable.'
]

let MARGIN = 40;

let drawnWords;

let wordCount;
let nextUpdateMillis;

let minTextSize;
let maxTextSize;

let cx;
let cy;

let spaceWidth;
let lineHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg)
  frameRate(60)

  drawnWords = []

  cx = MARGIN
  cy = MARGIN

  wordCount = 0;
  nextUpdateMillis = 0;

  minTextSize = 40;
  maxTextSize = 50;

  textAlign(LEFT, TOP);
  textFont("sans-serif");
  textSize(minTextSize);

  spaceWidth = textWidth(" ");
  lineHeight = 1.5 * minTextSize;

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  amplitude = new p5.Amplitude()
  let waveform = fft.waveform();
  numlines = map(max(waveform), -1, 1, 0, 50)
  let amp = mic.getLevel();
  let s = map(amp, 0, 1, 1, 15);
  let freq = fft.getEnergy("bass");
  let l = map(freq, 0, 255, 20, 150);

  randomrgb.push(color(200, 51 , 92))
  randomrgb.push(color(14, 146 , 107))
  randomrgb.push(color(25, 69 , 124))

  for (let i = 0; i < numlines; i++) {
    x = random(0, windowWidth)
    y = random(0, windowHeight)
    let testline = new Line(
        x,
        y,
        x + l,
        y,
        s)
    lines.push(testline);
}
}

function isVisible(fw) {
  return fw.alpha > 0;
}


function draw() {
  console.log(frameCount)
  imageMode(CENTER);
  image(images[imageIndex], windowWidth/2, windowHeight/2,windowWidth, windowHeight)

  drawnWords = drawnWords.filter(isVisible);

  //intro
  if (frameCount < 1800) {
    http()
    }


  //penicillin
  if (frameCount > 1800 & frameCount < 2400){
    rect(0, 0, windowWidth, windowHeight)
    fill(255, 255, 255)
    imageMode(CENTER);
    image(images[6], windowWidth/2, windowHeight/2)
  }


  //selfdiscovery
  if (frameCount > 2400 & frameCount < 4980){
    http()
  }


  //data uploaded
  if (frameCount > 4980 & frameCount < 8220){
    http()
    linesdisplay()
  }


  //q1
  if (frameCount > 8220 & frameCount < 8520){
    dizzy()
  }


  //post q1
  if (frameCount > 8520 & frameCount < 11640){
    for (wi = 0; wi < drawnWords.length; wi++) {
      let nextWord = drawnWords[wi];
      nextWord.update();
      nextWord.draw();
    }
  
    // check if it's time to add a new FadingWord to array
    if (millis() > nextUpdateMillis) {
      let nextWordIndex = wordCount % q1words.length;
      let nextWord = q1words[nextWordIndex];
  
      // add word to array
      let wordDelay = random(450, 600);
      drawnWords.push(new FadingWord(nextWord, wordDelay));
  
      // always increment the word count
      wordCount += 1;
  
      // next update time in millis, with some variation
      nextUpdateMillis = millis() + 1.2 * wordDelay;
    }
  }


  //q2
  if (frameCount > 11640 & frameCount < 11940){
    mountain()
  }


  //post q2
  if (frameCount > 11940 & frameCount < 14880){
    for (wi = 0; wi < drawnWords.length; wi++) {
      let nextWord = drawnWords[wi];
      nextWord.update();
      nextWord.draw();
    }
  
    // check if it's time to add a new FadingWord to array
    if (millis() > nextUpdateMillis) {
      let nextWordIndex = wordCount % q2words.length;
      let nextWord = q2words[nextWordIndex];
  
      // add word to array
      let wordDelay = random(450, 600);
      drawnWords.push(new FadingWord(nextWord, wordDelay));
  
      // always increment the word count
      wordCount += 1;
  
      // next update time in millis, with some variation
      nextUpdateMillis = millis() + 1.2 * wordDelay;
    }
  }


  //q3
  if (frameCount > 14880 & frameCount < 15180){
    blood()
  }


  //post q3
  if (frameCount > 15180 & frameCount < 18240){
    for (wi = 0; wi < drawnWords.length; wi++) {
      let nextWord = drawnWords[wi];
      nextWord.update();
      nextWord.draw();
    }
  
    // check if it's time to add a new FadingWord to array
    if (millis() > nextUpdateMillis) {
      let nextWordIndex = wordCount % q3words.length;
      let nextWord = q3words[nextWordIndex];
  
      // add word to array
      let wordDelay = random(450, 600);
      drawnWords.push(new FadingWord(nextWord, wordDelay));
  
      // always increment the word count
      wordCount += 1;
  
      // next update time in millis, with some variation
      nextUpdateMillis = millis() + 1.2 * wordDelay;
    }
  }


//q4
  if (frameCount > 18240 & frameCount < 18540){
    moment()
  }


  //post q4
  if (frameCount > 18540 & frameCount < 20400){
    for (wi = 0; wi < drawnWords.length; wi++) {
      let nextWord = drawnWords[wi];
      nextWord.update();
      nextWord.draw();
    }
  
    // check if it's time to add a new FadingWord to array
    if (millis() > nextUpdateMillis) {
      let nextWordIndex = wordCount % q4words.length;
      let nextWord = q4words[nextWordIndex];
  
      // add word to array
      let wordDelay = random(450, 600);
      drawnWords.push(new FadingWord(nextWord, wordDelay));
  
      // always increment the word count
      wordCount += 1;
  
      // next update time in millis, with some variation
      nextUpdateMillis = millis() + 1.2 * wordDelay;
    }
  }


  //miya voice
  if (frameCount > 20400 & frameCount < 24180){
    // sound()
    http()
    linesdisplay()
  }


  //angy miya
  if (frameCount > 24180 & frameCount < 25680){
    rect(0, 0, windowWidth, windowHeight)
    fill(200, 51 , 92)
    imageIndex = 8
    linesdisplay()
  }
 
  //poem reading
  if (frameCount > 25680 & frameCount < 33660){
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


// sound interaction screen
function soundline(){
  rect(0, 0, windowWidth, windowHeight)
  fill(255, 255, 255)

    for (let i = 0; i < numlines; i++) {
      x = random(0, windowWidth)
      y = random(0, windowHeight)
      let testline = new Line(
          x,
          y,
          x + l,
          y,
          s)
      lines.push(testline);
  }

  for (let i = 0; i < lines.length; i++) {
    lines[i].update()
    lines[i].display() 

}}

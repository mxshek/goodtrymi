class FadingWord {
  constructor(_word, _wordDelay) {
    this.word = _word;
    this.alpha = 255;
    this.startTime = millis();
    this.letterDelay = _wordDelay / this.word.length;

    this.red = 0;
    this.font = "sans-serif";
    this.size = minTextSize;
    this.yOffset = 0;
    this.fadeVel = -0.3;

    if (random() > 0.90) {
      this.word = this.word.toUpperCase();
      this.red = 200;
      this.font = "monospace";
      this.size = maxTextSize;
      this.yOffset = -this.size / 6;
      this.fadeVel = -0.01;
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

    fill(this.red, 0, 0, this.alpha);
    textFont(this.font);
    textSize(this.size);
    text(letters, this.x, this.y + this.yOffset);
  }
}

let words = [ 
  "There",
  "is",
  "so",
  "much",
  "to",
  "do.",
  "Shop",
  "Black",
  "Friday",
  "sales!",
  "People",
  "are",
  "dying.",
  "Breaking",
  "news.",
  "Everyone!",
  "I",
  "have",
  "an",
  "announcement.",
  "Did",
  "you",
  "watch",
  "the",
  "new",
  "Netflix",
  "special?",
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

  drawnWords = [];

  cx = MARGIN;
  cy = MARGIN;

  wordCount = 0;
  nextUpdateMillis = 0;

  minTextSize = 20;
  maxTextSize = 30;

  textAlign(LEFT, TOP);
  textFont("sans-serif");
  textSize(minTextSize);

  spaceWidth = textWidth(" ");
  lineHeight = 1.5 * minTextSize;
}

function isVisible(fw) {
  return fw.alpha > 0;
}

function draw() {
  background(220);

  drawnWords = drawnWords.filter(isVisible);

  // iterate over drawn words, update and draw them
  for (wi = 0; wi < drawnWords.length; wi++) {
    let nextWord = drawnWords[wi];
    nextWord.update();
    nextWord.draw();
  }

  // check if it's time to add a new FadingWord to array
  if (millis() > nextUpdateMillis) {
    let nextWordIndex = wordCount % words.length;
    let nextWord = words[nextWordIndex];

    // add word to array
    let wordDelay = random(450, 600);
    drawnWords.push(new FadingWord(nextWord, wordDelay));

    // always increment the word count
    wordCount += 1;

    // next update time in millis, with some variation
    nextUpdateMillis = millis() + 1.2 * wordDelay;
  }
}

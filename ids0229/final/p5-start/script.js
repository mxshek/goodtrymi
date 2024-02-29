// add the same uuid as your arduino
let serial;
let latestData = "waiting for data";

let buttonCharacteristic;
let buttontwoCharacteristic;

let buttonValue = 0;
let buttontwoValue = 0;

let bg = [0, 0, 0];

let images = [];
let imageIndex = 32
let audio = [];
let audioIndex = 0

function preload(){
  images = [
    loadImage('poem/1.png'), 
    loadImage('poem/2.png'), 
    loadImage('poem/3.png'), 
    loadImage('poem/4.png'), 
    loadImage('poem/5.png'), 
    loadImage('poem/6.png'),     
    loadImage('poem/7.png'), 
    loadImage('poem/8.png'), 
    loadImage('poem/9.png'), 
    loadImage('poem/10.png'), 
    loadImage('poem/11.png'), 
    loadImage('poem/12.png'), 
    loadImage('poem/13.png'), 
    loadImage('poem/14.png'), 
    loadImage('poem/15.png'), 
    loadImage('poem/16.png'), 
    loadImage('poem/17.png'), 
    loadImage('poem/18.png'), 
    loadImage('poem/19.png'), 
    loadImage('poem/20.png'),     
    loadImage('poem/21.png'),     
    loadImage('poem/22.png'),     
    loadImage('poem/23.png'),     
    loadImage('poem/24.png'),     
    loadImage('poem/25.png'),     
    loadImage('poem/26.png'),     
    loadImage('poem/27.png'),     
    loadImage('poem/28.png'),     
    loadImage('poem/29.png'), 
    loadImage('poem/30.png'),   
    loadImage('poem/31.png'),   
    loadImage('poem/32.png'), 
  ]
}

function preload(){
  audio = [
    loadSound("audio/oh.m4a"),
    loadSound("audio/oh_1.m4a"),
    loadSound("audio/ah.m4a"),
    loadSound("audio/mm.m4a"),
    loadSound("audio/traffic.m4a"),
    loadSound("audio/traffic2.m4a"),
    loadSound("audio/traffic3.m4a"),
    loadSound("audio/traffic4.m4a"),
    loadSound("audio/traffic5.m4a"),
    loadSound("audio/park.m4a"),
  ]

}



function setup() {
  createCanvas(1400, 700)

  serial = new p5.SerialPort();
  serial.list();
  serial.open('COM3');
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('closer', gotClose);
}

function serverConnected(){
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i])
  }
}

function gotOpen() {
  print("Serial Port is Open")
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed"
}

function gotError(theerror) {
  print(theerror)
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  console.log(currentString)
  latestData = currentString;
}

function draw() {
  background(bg)
  console.log(imageIndex)
  image (images[imageIndex], 0, 0)

if (buttonValue === 1) {
  for(let i = 32; i = images.length; i--) {
    console.log("button 1 pressed")
    imageIndex = i
  }}

  if (buttontwoValue === 1) {
    for(let i = 0; i = audio.length; i++) {
      console.log("button 2 pressed")
      audioIndex = i
      audio[audioIndex].play()
    }
  }
    }
  





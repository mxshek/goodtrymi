// add the same uuid as your arduino
const serviceUuid = "5af87508-4bf9-4852-8faf-91252c8afef0";


let buttonCharacteristic;
let buttontwoCharacteristic;
let photoCharacteristic;


let buttonValue = 0;
let buttontwoValue = 0;
let photoValue = 0;

let myBLE;

let currentTemp;
let daynight;

let bg = [0, 0, 0];

let images;
//can set number to test specific portions
let imageIndex = 0;
let auraArray;
let selection;

let capture;

function preload(){
  images = [
    loadImage('poem/32.png'), 
    loadImage('poem/31.png'), 
    loadImage('poem/30.png'), 
    loadImage('poem/29.png'), 
    loadImage('poem/28.png'), 
    loadImage('poem/27.png'),     
    loadImage('poem/26.png'), 
    loadImage('poem/25.png'), 
    loadImage('poem/24.png'), 
    loadImage('poem/23.png'), 
    loadImage('poem/22.png'), 
    loadImage('poem/21.png'), 
    loadImage('poem/20.png'), 
    loadImage('poem/19.png'), 
    loadImage('poem/18.png'), 
    loadImage('poem/17.png'), 
    loadImage('poem/16.png'), 
    loadImage('poem/15.png'), 
    loadImage('poem/14.png'), 
    loadImage('poem/13.png'),     
    loadImage('poem/12.png'),     
    loadImage('poem/11.png'),     
    loadImage('poem/10.png'),     
    loadImage('poem/9.png'),     
    loadImage('poem/8.png'),     
    loadImage('poem/7.png'),     
    loadImage('poem/6.png'),     
    loadImage('poem/5.png'),     
    loadImage('poem/4.png'), 
    loadImage('poem/3.png'),   
    loadImage('poem/2.png'),   
    loadImage('poem/1.png'), 
  ],
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


// function preload(){
//   audio = [
//     loadSound("audio/oh.m4a"),
//     loadSound("audio/oh_1.m4a"),
//     loadSound("audio/ah.m4a"),
//     loadSound("audio/mm.m4a"),
//     loadSound("audio/traffic.m4a"),
//     loadSound("audio/traffic2.m4a"),
//     loadSound("audio/traffic3.m4a"),
//     loadSound("audio/traffic4.m4a"),
//     loadSound("audio/traffic5.m4a"),
//     loadSound("audio/park.m4a"),
//   ]

// }


function setup() {
  createCanvas(1400, 700)
  //object will let us read to the bluetooth and write to it as well
  myBLE = new p5ble();


  //turn on bluetooth connection
  const connectButton = createButton("Connect");
  connectButton.mousePressed(connectToBLE);



  //weather api
  apiRequest()


  //changing to hsb
  colorMode(HSB)

  //got info on capture in this example https://p5js.org/examples/dom-video-capture.html


}

function draw() {
  background(bg)
  console.log(imageIndex)
  image( images[imageIndex], 0, 0)

if (buttontwoValue === 1) {
  console.log("button two press")
  image(images[31], 0, 0)
  
}

if (buttonValue === 1){
  setTimeout(moveFrame(), 2000)
  console.log("button pressed")
}}


function keyPressed() {
  for(let i = 0; i < audio.length; i++)
    if(keyCode === 32) {
      //play audio within in an array
      audio[i].play()
      console.log("recording is playing")
    }
  }

function moveFrame() {
  imageIndex++
  if (imageIndex > images.length - 1) {
    imageIndex = 0
  }
}

// function moveFrame2() {
//   imageIndex = 2;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }

// function moveFrame3() {
//   imageIndex = 3;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }

// function moveFrame4() {
//   imageIndex = 4;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }
// function moveFrame5() {
//   imageIndex = 5;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }
// function moveFrame6() {
//   imageIndex = 6;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }
// function moveFrame7() {
//   imageIndex = 7;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }
// function moveFrame2() {
//   imageIndex = 2;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }

// function moveFrame2() {
//   imageIndex = 2;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }
// function moveFrame2() {
//   imageIndex = 2;
//   if (imageIndex > images.length - 1) {
//     imageIndex = 0
//   }
// }




  
//  if (imageIndex === 0 && buttonValue === 1){
//   for (let i = 0; i < 2; i++ ){
//   imageIndex = i
//   }}

//   if (imageIndex === 1 && buttonValue === 1){
//     for (let i = 1; i < 3; i++ ){
//     imageIndex = i
//   }}

//   if (imageIndex === 2 && buttonValue === 1){
//     for (let i = 2; i < 4; i++ ){
//     imageIndex = i
//   }}

//   if (imageIndex === 3 && buttonValue === 1){
//     for (let i = 3; i < 5; i++ ){
//     imageIndex = i
//   }}

  // for (let i = 0; i < images.length; i++) {
  //   if (imageIndex = i && buttonValue === 1) {
  //     imageIndex = i + 1
  //   } 
  // }

  // }
  



  // if (buttontwoValue === 1) {
  //   for(let i = 0; i = audio.length; i++) {
  //     console.log("button 2 pressed")
  //     audioIndex = i
  //     audio[audioIndex].play()
  //   }
  // }


// function audioPlay() {
//   for (let i = 0; i < audi; i++) {
//     a = 48 + i
//     if(keyCode === a) {
//       //play audio within in an array
//       audioIndex[i].play()
//       console.log("recording is playing")
//     }
//   }

//ESTABLISH BUTTON is YES
//BUTTONTWO is NO

// function draw() {
//   background(bg)
 
//   console.log(imageIndex)
//  image (images[imageIndex], 0, 0)


//  if (imageIndex === 0 && buttonValue === 1) {
//   for (let i = 0; i < 2; i++ ){
//     imageIndex = i
//   }
//  }

//  if (imageIndex === 1 && buttonValue === 1){
//   for (let i = 1; i < 3; i++ ){
//     imageIndex = i
//   }
//  }

// }

//  if (imageIndex === 1 && buttonValue === 1){
//   for (let i = 1; i < 3; i++ ){
//     imageIndex = i
//   }
//  }


// //TRANSITION TO 3
// if (imageIndex === 2) {
//     setTimeout( function() {for(let i = 2; i < 4; i++){
//       imageIndex = i
//     }}, 2000)
//    }


//    if (imageIndex === 3) {
//     setTimeout( function() {for(let i = 3; i < 5; i++){
//       imageIndex = i
//     }}, 2000)
//    }


//    if (imageIndex === 4 && buttonValue === 1) {
//     for(let i = 4; i < 6; i++){
//       imageIndex = i
//     }
//    }


//    if (imageIndex === 5) {
//     setTimeout( function() {for (let i = 5; i < 7; i++ ){
//       imageIndex = i
//    }}, 2000)}


//    if (imageIndex === 6) {
//     setTimeout( function() {for(let i = 6; i < 8; i++){
//       imageIndex = i
//     }}, 2000)
//     fill(photoValue, 100, 100)
//     noStroke()
//     ellipse(1050, 450, 300)
//    }


//    if (imageIndex === 7 && buttonValue === 1) {
//     for(let i = 7; i < 9; i++){
//       imageIndex = i
//     }
//    }

//    if (imageIndex === 7) {
//     fill(photoValue, 100, 100)
//     noStroke()
//     ellipse(1050, 450, 300)
//    }
   
//    if (imageIndex === 8) {
//     setTimeout( function() {for(let i = 8; i < 10; i++){
//       imageIndex = i
//     }}, 2000)
//     fill(photoValue, 100, 100)
//     noStroke()
//     ellipse(1050, 450, 300)
//    }


//    if (imageIndex === 9) {
//     setTimeout( function() {for(let i = 9; i < 11; i++){
//       imageIndex = i
//     }}, 2000)
//     fill(photoValue, 100, 100)
//     noStroke()
//     ellipse(1050, 450, 300)
//    }


//    //we are at imageindex 11
//    if (imageIndex === 10 && buttonValue === 1) {
//     setTimeout( function() {  
//     for(let i = 10; i < 12; i++){
//       imageIndex = i
//     }
//    }, 2000)}


//    if (imageIndex === 10) {
//     fill(photoValue, 100, 100)
//     noStroke()
//     ellipse(1050, 450, 300)
//    }


//    //picking back up here
//    if (imageIndex === 11) {
//     setTimeout( function() {for(let i = 11; i < 13; i++){
//       imageIndex = i
//     }}, 2000)
//    }
 
//    if (imageIndex === 12) {
//     setTimeout( function() {for(let i = 12; i < 14; i++){
//       imageIndex = i
//     }}, 2000)
//    }


//    if (imageIndex === 13) {
//     setTimeout( function() {for(let i = 13; i < 15; i++){
//       imageIndex = i
//     }}, 2000)
//    }


//    if (imageIndex === 14 && buttonValue === 1) {
//     setTimeout( function() {  
//     // from here we have to randomly select an aura
//     // must randomly route to 15, 18, 20, 22, 24, or 26
//     for(let i = 0; i < 2; i++){
//     let auraArray = [15, 18, 20, 22, 24, 26]
//     let selection = random(auraArray)
//     imageIndex = selection
//   }
//   if (imageIndex === 15) {
//     {for(let i = 15; i < 17; i++){
//       imageIndex = i}
//     }
//   }

//    if (imageIndex === 18) {
//     for(let i = 18; i < 20; i++){
//       imageIndex = i
//     }
//    }
//    if (imageIndex === 20) {
//     for(let i = 20; i < 22; i++){
//       imageIndex = i
//     }
//    }
//    if (imageIndex === 22) {
//     for(let i = 22; i < 24; i++){
//       imageIndex = i
//     }
//    }
//    if (imageIndex === 24) {
//     for(let i = 24; i < 26; i++){
//       imageIndex = i
//     }
//    }
//    if (imageIndex === 26) {
//     for(let i = 26; i < 28; i++){
//       imageIndex = i
//     }
//    }

// }, 2000)}

//    //IF RED
//   //  if (imageIndex === 15) {
//   //   setTimeout( function() {for(let i = 15; i < 17; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }

//    if(imageIndex === 16 && buttonValue === 1){
//     setTimeout( function() {  
//     for(let i = 16; i < 29; i+= 11){
//       //yes image index is 28
//       imageIndex = i
//     }
//    }, 2000)}

//    if(imageIndex === 16 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 16; i < 30; i+=13){
//       //no image index is 29
//       imageIndex = i
//     }
//   }, 2000)}


//    //IF ORANGE
//   //  if (imageIndex === 18) {
//   //   setTimeout( function() {for(let i = 18; i < 20; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }

//    if(imageIndex === 19 && buttonValue === 1){
//     setTimeout( function() {  

//     for(let i = 19; i < 29; i+=8){
//       //yes image index is 28
//       imageIndex = i
//     }
//   }, 2000)}

//    if(imageIndex === 19 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 19; i < 30; i+=10){
//       //no image index is 29
//       imageIndex = i
//     }
//   }, 2000)}



//    //IF YELLOW
//   //  if (imageIndex === 20) {
//   //   setTimeout( function() {for(let i = 20; i < 22; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }
   

//    if(imageIndex === 21 && buttonValue === 1){
//     setTimeout( function() {  

//     for(let i = 21; i < 29; i+=6){
//       //yes image index is 28
//       imageIndex = i
//     }
//   }, 2000)}


//    if(imageIndex === 21 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 21; i < 30; i+=8){
//       //no image index is 29
//       imageIndex = i
//     }
//   }, 2000)}



//    //IF GREEN
//   //  if (imageIndex === 22) {
//   //   setTimeout( function() {for(let i = 22; i < 24; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }

//    if(imageIndex === 23 && buttonValue === 1){
//     setTimeout( function() {  

//     for(let i = 23; i < 29; i+=4){
//       imageIndex = i
//     }
//   }, 2000)}

//    if(imageIndex === 23 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 23; i < 30; i+=6){
//       //no image index is 29
//       imageIndex = i
//     }
//   }, 2000)}

//    //IF BLUE
//   //  if (imageIndex === 24) {
//   //   setTimeout( function() {for(let i = 24; i < 26; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }

//    if(imageIndex === 25 && buttonValue === 1){
//     setTimeout( function() {  

//     for(let i = 25; i < 29; i+=2){
//       //yes image index is 28
//       imageIndex = i
//     }
//   }, 2000)}

//    if(imageIndex === 25 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 25; i < 30; i+=4){
//       //no image index is 29
//       imageIndex = i
//     }
//   }, 2000)}


//    //IF PURPLE
//   //  if (imageIndex === 26) {
//   //   setTimeout( function() {for(let i = 26; i < 28; i++){
//   //     imageIndex = i
//   //   }}, 2000)
//   //  }

//    if(imageIndex === 27 && buttonValue === 1){
//     setTimeout( function() {  

//     for(let i = 27; i < 29; i++){
//       //yes image index is 28
//       imageIndex = i
//     }
//   }, 2000)}


//    if(imageIndex === 27 && buttontwoValue === 1){
//     setTimeout( function() {  

//     for(let i = 27; i < 30; i+=2){
//       //no image index is 29
//       imageIndex = i
//     }  }, 2000)}




//     //go to ...
//   // if(imageIndex === 28 && buttonValue === 1){
//   //   for(let i = 28; i < 35; i+=6){
//   //     imageIndex = i
//   //   }
//   // }

//   // if(imageIndex === 29 && buttonValue === 1){
//   //   for(let i = 29; i < 35; i+=5){
//   //     imageIndex = i 
//   //   }
//   // }

//   //let's try adding weather back in
//   if (daynight === 0){
//   if(imageIndex === 28 && buttonValue === 1){
//     setTimeout( function(){
//       for(let i = 28; i < 32; i+=3){
//       imageIndex = i
//     }}, 2000)}

//       if(imageIndex === 29 && buttonValue === 1){
//       setTimeout( function(){
//       for(let i = 29; i < 32; i+=2){
//         imageIndex = i
//       }}, 2000)}
//     } 

//   else{
//   if(imageIndex === 28 && buttonValue === 1){
//   setTimeout( function(){
//   for(let i = 28; i < 31; i+=2){
//     imageIndex = i
//   }}, 2000)}


//     if(imageIndex === 29 && buttonValue === 1){
//     setTimeout( function(){
//     for(let i = 29; i < 31; i++){
//       imageIndex = i
//     }}, 2000)
//       }}
    
//        if(imageIndex === 30){
//         fill (0, 0, 0)
//         textAlign(CENTER)
//         textSize (72)
//         text(currentTemp, 700, 484)
//       }
    
    
//       if(imageIndex === 31){
//         fill (0, 0, 0)
//         textAlign(CENTER)
//         textSize (72)
//         text(currentTemp, 700, 484)
//       }
    
//  if(imageIndex === 30 && buttonValue === 1){
//   setTimeout( function(){
//   for(let i = 30; i < 33; i+=2){
//     imageIndex = i
//   }
// }, 2000)}
 
//   if(imageIndex === 31 && buttonValue === 1){
//     setTimeout( function(){
//     for(let i = 31; i < 33; i++){
//       imageIndex = i
//     }
//    }, 2000)}


//    if(imageIndex === 32 && buttonValue === 1){
//     setTimeout( function(){
//     for(let i = 32; i < 34; i++){
//       imageIndex = i
//     }
//   }, 2000)}

//    if(imageIndex === 32 && buttontwoValue === 1){
//     setTimeout( function(){

//     for(let i = 32; i < 34; i++){
//       imageIndex = i
//     }
//   }, 2000)}


//    if(imageIndex === 33 && buttonValue === 1){
//     setTimeout( function(){

//     for(let i = 33; i < 35; i++){
//       imageIndex = i
//     }
//   }, 2000)}


//   if(imageIndex === 34){
//     setTimeout( function() {for(let i = 34; i < 36; i++){
//       imageIndex = i
//     }}, 2000)
//    }

//    if ( buttonValue === 1 && imageIndex === 35 ) {
//     setTimeout( function(){
//     for(let i = 35; i < 37; i++){
//       imageIndex = i
//     }}, 2000)
//    }

//     if (imageIndex === 36) {      
//         if (buttonValue === 1){
//         setTimeout( function() {
//         for(let i = 36; i < 39; i+=2){
//           imageIndex = i
//       }}, 2000)}

//       if (buttontwoValue === 1){
//         setTimeout( function() {
//         for(let i = 36; i < 38; i++){
//           imageIndex = i}
//       }, 2000)
//     }}
  

//   //  if(imageIndex === 36 && buttonValue === 1){
//   //   for(let i = 36; i < 39; i+=2){
//   //     imageIndex = i
//   //   }
//   //  }

//   //  if(imageIndex === 36 && buttontwoValue === 1){
//   //   for(let i = 36; i < 38; i++){
//   //     imageIndex = i
//   //   }
//   //  }
   
//    if(imageIndex === 37 && buttonValue === 1){
//     setTimeout( function() {  
//     for(let i = 37; i < 39; i++){
//       imageIndex = i}}
//     , 2000)}


//    if(imageIndex === 38 && buttonValue === 1){
//     setTimeout( function() {  
//     for(let i = 38; i < 40; i++){
//       imageIndex = i
//     }  }, 2000)}

  
//     if(imageIndex === 39 && buttonValue === 1){
//       setTimeout( function() {  
//       for(let i = 39; i < 41; i++){
//         imageIndex = i
//       }
//     }
//     , 2000)}

//     if(imageIndex === 39 && buttontwoValue === 1){
//       setTimeout( function() {  

//       for(let i = 39; i < 41; i++){
//         imageIndex = i
//       }
//     }    , 2000)}


//     if(imageIndex === 40 && buttonValue === 1){
//       setTimeout( function() {  
//       for(let i = 40; i < 42; i++){
//         imageIndex = i
//       }
//     }
//     , 2000)}

//     if(imageIndex === 40 && buttontwoValue === 1){
//       setTimeout( function() {  

//       for(let i = 40; i < 43; i+=2){
//         imageIndex = i
//       }
//     }    , 2000)}

//     if(imageIndex === 41 && buttonValue === 1){
//       setTimeout( function() {  

//       for(let i = 41; i < 44; i+=2){
//         imageIndex = i
//       }
//     }
//     , 2000)}

//     if(imageIndex === 41 && buttontwoValue === 1){
//       setTimeout( function() {  

//       for(let i = 41; i < 46; i+=3){
//         imageIndex = i
//       }
//     }
//     , 2000)}

//     if(imageIndex === 42 && buttonValue === 1){
//       setTimeout( function() {  
//       for(let i = 42; i < 44; i++){
//         imageIndex = i
//       }
//     }
//     , 2000)}


//     if(imageIndex === 42 && buttontwoValue === 1){
//       setTimeout( function() {  
//       for(let i = 42; i < 45; i+=2){
//         imageIndex = i + 1
//       }
//     }
//     , 2000)}

   
//     if(imageIndex === 43 && buttonValue === 1){
//       setTimeout( function() {  

//       for(let i = 43; i < 46; i+=2){
//         imageIndex = i
//       }
//     }
//     , 2000)}


//     if(imageIndex === 43 && buttontwoValue === 1){
//       setTimeout( function() {  
//         for(let i = 43; i < 46; i+=2){
//         imageIndex = i
//       }
//     }
//     , 2000)}


//     if(imageIndex === 44 && buttonValue === 1){
//       setTimeout( function() {  
//         for (let i = 44; i < 46; i++){
//           imageIndex = i
//         }}
//       , 2000)}


//     if(imageIndex === 44 && buttontwoValue === 1){
//       setTimeout( function() {  
//         for (let i = 44; i < 46; i++){
//           imageIndex = i
//         }}
//       , 2000)}


//     if(imageIndex === 45){
//       if(buttonValue === 1){
//         setTimeout( function() {
//         capture = createCapture(VIDEO);
//         capture.size(350, 350)
//         image(capture, 1050, 350)
//       }, 2000)} 
//       else if(buttontwoValue === 1) {   
//         setTimeout( function() {     
//         capture = createCapture(VIDEO);
//         capture.size(350, 350)
//         image(capture, 1050, 350);
//       }, 2000)}
//     } 


     
      

//     }
//   // }





function connectToBLE() {
  myBLE.connect(serviceUuid, gotCharacteristics)
}

function gotCharacteristics(error, characteristics) {
  if (error) console.error(error)
  // console.log("characteristics: ", characteristics)
  console.log("Connected to Service")
 
  console.log("Characteristics: ", characteristics)

  //check console of sketch and then double check arduino which uuid is which
  buttonCharacteristic = characteristics[0]
  myBLE.read(buttonCharacteristic, gotButtonValue)

  buttontwoCharacteristic = characteristics[1]
  myBLE.read(buttontwoCharacteristic, gotbuttontwoValue)

  photoCharacteristic = characteristics[2]
  myBLE.read(photoCharacteristic, gotPhotoValue)
}


function gotButtonValue(error, value) {
  if (error) console.error(error)
  buttonValue = value
// console.log("button value: ", value)
  myBLE.read(buttonCharacteristic, gotButtonValue)
}


function gotbuttontwoValue(error, value) {
  if (error) console.error(error)
  buttontwoValue = value
// console.log("button value: ", value)
  myBLE.read(buttontwoCharacteristic, gotbuttontwoValue)
}


//getting bluetooth error that photovalue has error
//after commenting out, bluetooth is functional. something wrong with photovalue function
//restarted it, bluetooth is now working DO NOT NEED SERIAL OPEN


function gotPhotoValue(error, value) {
  if (error) console.error(error)
  photoValue = value
// console.log("photocell value: ", value)
  myBLE.read(photoCharacteristic, gotPhotoValue)
}


async function apiRequest() {
    let request = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,weather_code&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=1")
    console.log(request)
   
    let data = await request.json()
    console.log(data)

    let nowTemp = data.current
    console.log("the current values are:")
    console.log(nowTemp)

    currentTemp = nowTemp.temperature_2m
    console.log("the current temperature is ")
    console.log(currentTemp)

    daynight = nowTemp.is_day
    console.log("is it day")
    console.log(daynight)
  }

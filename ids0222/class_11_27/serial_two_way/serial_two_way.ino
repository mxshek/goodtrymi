// make a potentiometer pin at A0
const int potPin = A0;

//make a photo pin at A1
const int photoPin = A1;

//connect button 
const int buttonPin = 2;

//led
const int ledPin = 10;

void setup() {
  // put your setup code here, to run once:

  //open up serial port and set boed rate to 9600
  Serial.begin(9600);

  //set input and output modes of digital pins (button and LED)
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:

  //set potentiometer value 
  int potValue = analogRead(potPin);

  //now we can send along as a serial message
  //label it by doing println and words in quotation marks
  Serial.println("potentiometer");
  Serial.println(potValue);

  //do the same thing for photo
  int photoValue = analogRead(photoPin);
  Serial.println("photocell");
  Serial.println(photoValue);

  //and for the button but remember button is digital so you must use digitalRead
  int buttonValue = digitalRead(buttonPin);
  Serial.println("button");
  Serial.println(buttonValue);

//this is checking the message incoming to serial 
  if (Serial.available() > 0) {
    //read the byte of information coming over the wire (in this case it is H)
    int incomingByte = Serial.read();

    //use if statements to compare it to other values
    // note, single apostrophe instead of quote so that it is being compared to other incoming byte of information, H is a value. also only two ==
    if(incomingByte == 'H') {
      digitalWrite(ledPin, HIGH);
    }

    //we changed vscode to add L so now we tell arduino what to do with it
    if(incomingByte == 'L') {
      digitalWrite(ledPin, LOW);
    }
  }

  delay(10);
}

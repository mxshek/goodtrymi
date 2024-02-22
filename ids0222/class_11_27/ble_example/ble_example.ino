#include <ArduinoBLE.h>

// get a uuid from https://www.uuidgenerator.net/
const auto myUuid = "3fdbea33-5c5c-4b78-b782-1e4e5f0826a8";
const auto buttonID = "33559562-1440-4e0d-8199-c1f076b6a830";
const auto potID = "427bcdea-4cf5-4e45-bbf4-a3886a093a45";
const auto photoID = "43ab08db-3e4e-46e7-b98e-7e8204853fcd";

// pins for the led and sensors
const int ledPin = 10;
const int buttonPin = 2;
const int potPin = A0;
const int photoPin = A1;

// make a service with your uuid
BLEService sensorService(myUuid);

// sensor characteristics are read-only
BLEIntCharacteristic buttonCharacteristic(buttonID, BLERead | BLENotify);
BLEIntCharacteristic potCharacteristic(potID, BLERead | BLENotify);
BLEIntCharacteristic photoCharacteristic(photoID, BLERead | BLENotify);

// led characteristic can be read and written to
BLEByteCharacteristic ledCharacteristic(myUuid, BLERead | BLEWrite);

void setup() {
  // Initiate Serial and wait for the port to open
  // not needed for communication, but helpful for debugging
  Serial.begin(9600);
  while (!Serial); 

  // assign the digital pins
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  pinMode(potPin, INPUT);

  // throw an error if Bluetooth doesn't work
  if (!BLE.begin()) {
    Serial.println("starting BLE module failed...");
    while (1);
  }

  // set the name of the peripheral
  BLE.setLocalName("My Arduino");
  // set uuid of the peripheral
  BLE.setAdvertisedService(sensorService);

  // add characteristics
  sensorService.addCharacteristic(buttonCharacteristic);
  sensorService.addCharacteristic(potCharacteristic);
  sensorService.addCharacteristic(photoCharacteristic);

  // add the service
  BLE.addService(sensorService);

  // set initial values
  ledCharacteristic.writeValue(0);
  buttonCharacteristic.writeValue(0);
  potCharacteristic.writeValue(0);
  photoCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();
  
  Serial.println("Bluetooth device activated, waiting for connections...");
}

void loop() {
  // poll for BLE events
  BLE.poll();

  // read sensor states
  auto buttonValue = digitalRead(buttonPin);
  auto potValue = analogRead(potPin) / 4;
  auto photoValue = analogRead(photoPin) / 4;

  // check if states have changed
  bool buttonChanged = (buttonCharacteristic.value() != buttonValue);
  bool potChanged = (potCharacteristic.value() != potValue);
  bool photoChanged = (photoCharacteristic.value() != photoValue);

  // update the BLE characteristic if the state has changed
  if (buttonChanged) {
    buttonCharacteristic.writeValue(buttonValue);
    // Serial.println(buttonValue);
  }
  if (potChanged) {
    potCharacteristic.writeValue(potValue);
    // Serial.println(potValue);
  } 
  // if (photoChanged) {
    photoCharacteristic.writeValue(photoValue);
    Serial.println(photoValue);
  // }

  // respond to and events which write to the LED characteristic
  if (ledCharacteristic.written()) {
    // true if high, false if low
    if (ledCharacteristic.value()) {
      Serial.println("LED on");
      digitalWrite(ledPin, HIGH);
    } else {
      Serial.println("LED off");
      digitalWrite(ledPin, LOW);
    }
  }

  delay(100);
}

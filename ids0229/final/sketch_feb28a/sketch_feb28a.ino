//open library manager
//download it
#include <ArduinoBLE.h>

// get a uuid from https://www.uuidgenerator.net/
// version 4 uuid (first one on page) is good
// new UUID for each thingy
const auto myUuid = "c2832a48-cf80-4aa6-95d4-49ee8f025aa5";
const auto buttonID = "c020bced-2edf-4363-8fa3-4ae1a1fa64d7";
const auto buttontwoID = "d595f62d-4fe0-42bb-b543-b51e22237c4e";

// pins for the led and sensors
const int ledPin = 10;
const int buttonPin = 2;
const int buttontwoPin = 3;

// make a service with your uuid 
// make a variable called sensor service (name is sensor Service) and we are passing main UUID into this
// BLE = Bluetooth Low Energy
BLEService sensorService(myUuid);

// sensor characteristics are read-only
BLEIntCharacteristic buttonCharacteristic(buttonID, BLERead | BLENotify);
BLEIntCharacteristic buttontwoCharacteristic(buttontwoID, BLERead | BLENotify);

void setup() {
  // Initiate Serial and wait for the port to open
  // not needed for communication, but helpful for debugging
  Serial.begin(9600);
  // pausing the code until the serial port opens, so comment this out for bluetooth
  // while (!Serial); 

  // assign the digital pins
  pinMode(buttonPin, INPUT);
  pinMode(buttontwoPin, INPUT);
  // pinMode(photoPin, INPUT);

  // throw an error if Bluetooth doesn't work
  // if our bluetooth low energy device attached to arduino doesn't work, give us a message
  if (!BLE.begin()) {
    Serial.println("starting BLE module failed...");
    while (1);
  }

  // set the name of the peripheral
  // BLE.setLocalName("My Arduino");
  // set uuid of the peripheral
  // BLE.setAdvertisedService(sensorService);
  
  //in class example of setting the name of the peripheral
  BLE.setLocalName("Miya's Arduino");
  BLE.setAdvertisedService(sensorService);

  // add characteristics
  sensorService.addCharacteristic(buttonCharacteristic);
  sensorService.addCharacteristic(buttontwoCharacteristic);

  // add the service
  BLE.addService(sensorService);

  // set initial values
  // ledCharacteristic.writeValue(0);  
  buttonCharacteristic.writeValue(0);
  buttontwoCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();
  
  Serial.println("Bluetooth device activated, waiting for connections...");
}

void loop() {
  // poll for BLE events
  BLE.poll();

  // read sensor states
  auto buttonValue = digitalRead(buttonPin);
  auto buttontwoValue = digitalRead(buttontwoPin);
  //divide by 4 because of bytes that bluetooth can get

  // check if states have changed
  bool buttonChanged = (buttonCharacteristic.value() != buttonValue);
  bool buttontwoChanged = (buttontwoCharacteristic.value() != buttontwoValue);

  // update the BLE characteristic if the state has changed
  if (buttonChanged) {
    buttonCharacteristic.writeValue(buttonValue);
    Serial.println("button: ");
    Serial.println(buttonValue);
  }
  if (buttontwoChanged) {
    buttontwoCharacteristic.writeValue(buttontwoValue);
    Serial.println("button two: ");
    Serial.println(buttontwoValue);
  } 


  delay(10);
}

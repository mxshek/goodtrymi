#include <IRremote.h>

const int RECV_PIN = 11;
IRrecv irrecv(RECV_PIN);
decode_results results;

void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn(); // Start the receiver
  irrecv.blink13(true);
}

void loop()
{
  if (irrecv.decode(&results))
    {
     Serial.println(results.value, HEX);
     Serial.print("Received IR signal: ");

     irrecv.resume(); // Receive the next value
    }

delay(1000); 
}



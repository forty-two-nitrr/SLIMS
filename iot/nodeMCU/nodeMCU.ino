#include <SoftwareSerial.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include "rbt.h"

const char* ssid = "Aditya Ray";
const char* password = "ankuria98";

//Your Domain name with URL path or IP address with path
const char* serverName = "http://192.168.246.115:4000/api/esp";

int d5 = 14, d6 = 12;
SoftwareSerial s(d6,d5);
unsigned long timer_start = 0;
rbNode *set = NULL;
unsigned long timeout = 2700;

void push_data (rbNode *node) {
  if (!node)
    return;

  push_data(node->link[0]);
  push_data(node->link[1]);
    
  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
    
    // If you need an HTTP request with a content type: application/json, use the following:
    http.addHeader("Content-Type", "application/json");
    static char json_data[1024];
    sprintf(json_data, "{\"id\": \"%d\", \"time\": \"%d\", \"status\": \"%d\"}", node->data.id, node->data.time, node->data.status);
    int httpResponseCode = http.POST(json_data);
   
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
      
    // Free resources
    http.end();

    rbNode *newHead = deletion(set, node->data);
    if (newHead)
      set = newHead;
    else
      Serial.println("Unable to remove data");
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}

void setup() {
  timer_start = millis();
  Serial.begin(9600);
  s.begin(9600);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
  while (!Serial) continue;
}

void loop() { // run over and over
  while (Serial.available()) {
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(s);
    if (root == JsonObject::invalid())
      break;

    payload_t data;
    data.id = root["id"];
    data.time = root["time"];
    data.status = root["status"];
    
    //Serial.write(Serial.read());
    
    rbNode *newHead = insertion(set, data);
    if (!newHead) {
      push_data(set);
    }
    newHead = insertion(set, data);
    if (newHead)
      set = newHead;
    else
      Serial.println("can't recieve data");
  }

  if ((millis() - timer_start) / 1000 > timeout) {
    push_data(set);
    timer_start = millis();
  }
}

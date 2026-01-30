window.projectsData = [
    {
        id: 1,
        title: "The Smart Blinker",
        level: "beginner",
        components: ["Arduino Uno", "LED", "220-ohm Resistor", "Breadboard", "Jumper Wires"],
        description: "The 'Hello World' of robotics. Learn how to send electricity to an output device.",
        wiring: "1. Insert LED into breadboard (long leg positive, short leg negative)\n2. Connect 220-ohm resistor to LED's negative leg\n3. Connect resistor's other end to Arduino GND\n4. Connect LED's positive leg to Arduino Pin 13\n5. Ensure proper polarity - LED won't work if reversed",
        steps: [
            "Step 1: Identify LED legs (long = positive/Anode, short = negative/Cathode)",
            "Step 2: Place LED on breadboard across center gap",
            "Step 3: Connect 220Ω resistor from LED negative leg to breadboard negative rail",
            "Step 4: Connect breadboard negative rail to Arduino GND pin",
            "Step 5: Connect LED positive leg to Arduino Digital Pin 13",
            "Step 6: Upload the code and watch LED blink every second!"
        ],
        code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
        logic: "Basic digital output control - sending electricity to an output device. This is the fundamental concept of robotics: controlling hardware with code.",
        timeEstimate: "30-45 mins",
        linesOfCode: 10
    },
    {
        id: 2,
        title: "Digital Doorbell",
        level: "beginner",
        components: ["Arduino Uno", "Push Button", "Piezo Buzzer", "10k Resistor", "Jumper Wires"],
        description: "Learn how to use a digital input (button) to trigger a sound output.",
        wiring: "1. Button one side to Pin 2, other to 5V (with 10k pull-down resistor)\n2. Buzzer red wire to Pin 8, black to GND\n3. Connect components on breadboard",
        steps: [
            "Step 1: Place push button on breadboard (straddles center gap)",
            "Step 2: Connect 10kΩ resistor from one button pin to GND rail",
            "Step 3: Connect same button pin to Arduino Digital Pin 2",
            "Step 4: Connect opposite button pin to 5V pin on Arduino",
            "Step 5: Connect buzzer positive (+) to Arduino Pin 8",
            "Step 6: Connect buzzer negative (-) to GND rail",
            "Step 7: Upload code, press button to hear sound!"
        ],
        code: `void setup() {
  pinMode(2, INPUT);
  pinMode(8, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(2);
  if (buttonState == HIGH) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
}`,
        logic: "Digital input triggering output - learn how physical buttons interact with microcontrollers to create sound feedback systems.",
        timeEstimate: "30-45 mins",
        linesOfCode: 15
    },
    {
        id: 3,
        title: "Automatic Night Light",
        level: "beginner",
        components: ["LDR (Light Sensor)", "LED", "10k Resistor", "Arduino Uno", "Breadboard"],
        description: "Learn how robots 'feel' the environment using analog sensors.",
        wiring: "1. Create voltage divider with LDR and 10k Resistor\n2. Connect junction point to Analog Pin A0\n3. Connect LED to Pin 9",
        steps: [
            "Step 1: Place LDR on breadboard (2 legs in different rows)",
            "Step 2: Connect 10kΩ resistor in series with LDR",
            "Step 3: Connect junction between LDR and resistor to Arduino A0",
            "Step 4: Connect LDR other end to 5V, resistor other end to GND",
            "Step 5: Connect LED with 220Ω resistor to Pin 9",
            "Step 6: Cover LDR with hand - LED should turn on automatically!"
        ],
        code: `void setup() {
  pinMode(9, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(A0);
  Serial.println(lightLevel);
  
  if (lightLevel < 500) {
    digitalWrite(9, HIGH);
  } else {
    digitalWrite(9, LOW);
  }
  delay(100);
}`,
        logic: "Analog sensing and conditional control - robots 'feel' their environment using sensors and react autonomously.",
        timeEstimate: "30-45 mins",
        linesOfCode: 17
    },
    {
        id: 4,
        title: "Temperature Monitor",
        level: "beginner",
        components: ["DHT11 Sensor", "16x2 LCD Display", "Arduino Uno", "Breadboard", "10k Potentiometer"],
        description: "Display real-time temperature and humidity on LCD screen.",
        wiring: "1. DHT11 VCC to 5V, GND to GND, DATA to Pin 2\n2. LCD: RS-Pin12, E-Pin11, D4-Pin5, D5-Pin4, D6-Pin3, D7-Pin2\n3. LCD VSS to GND, VDD to 5V, V0 to potentiometer",
        steps: [
            "Step 1: Connect DHT11 sensor to Arduino",
            "Step 2: Connect LCD display using proper pins",
            "Step 3: Install DHT11 and LiquidCrystal libraries",
            "Step 4: Upload temperature monitoring code",
            "Step 5: See real-time temperature readings"
        ],
        code: `#include <DHT.h>
#include <LiquidCrystal.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  dht.begin();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(t);
  lcd.print("C");
  
  lcd.setCursor(0, 1);
  lcd.print("Humidity: ");
  lcd.print(h);
  lcd.print("%");
  
  delay(2000);
}`,
        logic: "Sensor data acquisition and display - learn to read environmental data and present it visually.",
        timeEstimate: "45-60 mins",
        linesOfCode: 24
    },
    {
        id: 5,
        title: "Ultrasonic Distance Meter",
        level: "beginner",
        components: ["HC-SR04 Ultrasonic Sensor", "Arduino Uno", "Breadboard", "Jumper Wires"],
        description: "Measure distance using sound waves and display on Serial Monitor.",
        wiring: "1. HC-SR04 VCC to 5V, GND to GND\n2. TRIG to Pin 9, ECHO to Pin 10",
        steps: [
            "Step 1: Connect HC-SR04 sensor to Arduino",
            "Step 2: Open Serial Monitor in Arduino IDE",
            "Step 3: Upload distance measurement code",
            "Step 4: See distance readings in centimeters",
            "Step 5: Test with objects at different distances"
        ],
        code: `#define trigPin 9
#define echoPin 10

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, distance;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(500);
}`,
        logic: "Ultrasonic wave measurement - learn how robots can 'see' distances using sound waves.",
        timeEstimate: "30-45 mins",
        linesOfCode: 22
    },
    {
        id: 6,
        title: "Servo Motor Control",
        level: "intermediate",
        components: ["SG90 Servo Motor", "Arduino Uno", "Potentiometer", "Breadboard"],
        description: "Control a servo motor position using a potentiometer.",
        wiring: "1. Servo red wire to 5V, brown to GND, orange to Pin 9\n2. Potentiometer outer pins to 5V and GND, middle pin to A0",
        steps: [
            "Step 1: Connect servo motor to Arduino",
            "Step 2: Connect potentiometer for control",
            "Step 3: Upload servo control code",
            "Step 4: Rotate potentiometer to move servo",
            "Step 5: Observe precise angular movement"
        ],
        code: `#include <Servo.h>

Servo myservo;
int potpin = A0;
int val;

void setup() {
  myservo.attach(9);
}

void loop() {
  val = analogRead(potpin);
  val = map(val, 0, 1023, 0, 180);
  myservo.write(val);
  delay(15);
}`,
        logic: "Precise angular control - learn how to control mechanical position with feedback systems.",
        timeEstimate: "45-60 mins",
        linesOfCode: 14
    },
    {
        id: 7,
        title: "4-Digit 7-Segment Display",
        level: "intermediate",
        components: ["4-Digit 7-Segment Display", "Arduino Uno", "Breadboard", "220Ω Resistors x4"],
        description: "Create a digital counter using 4-digit 7-segment display.",
        wiring: "1. Display pins to Arduino Pins 2-13\n2. Add 220Ω resistors to segment pins",
        steps: [
            "Step 1: Connect 7-segment display to Arduino",
            "Step 2: Install SevSeg library",
            "Step 3: Upload counter program",
            "Step 4: Watch numbers count from 0000 to 9999",
            "Step 5: Modify code for different display patterns"
        ],
        code: `#include "SevSeg.h"

SevSeg sevseg;

void setup() {
  byte numDigits = 4;
  byte digitPins[] = {10, 11, 12, 13};
  byte segmentPins[] = {9, 2, 3, 5, 6, 8, 7, 4};
  
  sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins);
  sevseg.setBrightness(90);
}

void loop() {
  static unsigned long timer = millis();
  static int deciSeconds = 0;
  
  if (millis() - timer >= 100) {
    timer += 100;
    deciSeconds++;
    if (deciSeconds == 10000) {
      deciSeconds = 0;
    }
    sevseg.setNumber(deciSeconds, 1);
  }
  sevseg.refreshDisplay();
}`,
        logic: "Multiplexed display control - learn how to efficiently control multiple digits with limited pins.",
        timeEstimate: "60-90 mins",
        linesOfCode: 28
    },
    {
        id: 8,
        title: "Soil Moisture Sensor",
        level: "intermediate",
        components: ["Soil Moisture Sensor", "LED", "Arduino Uno", "Breadboard", "220Ω Resistor"],
        description: "Detect soil moisture levels and indicate with LED.",
        wiring: "1. Moisture sensor VCC to 5V, GND to GND, SIG to A0\n2. LED with resistor to Pin 13",
        steps: [
            "Step 1: Connect soil moisture sensor",
            "Step 2: Insert sensor into soil",
            "Step 3: Calibrate for dry and wet conditions",
            "Step 4: LED indicates dry soil condition",
            "Step 5: Test with different soil types"
        ],
        code: `int sensorPin = A0;
int ledPin = 13;
int sensorValue = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  Serial.print("Moisture: ");
  Serial.println(sensorValue);
  
  if (sensorValue > 800) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(1000);
}`,
        logic: "Analog sensing with threshold control - learn to monitor environmental conditions and trigger actions.",
        timeEstimate: "45-60 mins",
        linesOfCode: 19
    },
    {
        id: 9,
        title: "RGB LED Color Mixer",
        level: "intermediate",
        components: ["RGB LED", "3x 220Ω Resistors", "Arduino Uno", "Breadboard", "3x Potentiometers"],
        description: "Create custom colors by mixing red, green, and blue using potentiometers.",
        wiring: "1. RGB LED common cathode to GND\n2. R,G,B pins with resistors to Pins 9,10,11\n3. Potentiometers to A0,A1,A2",
        steps: [
            "Step 1: Connect RGB LED with resistors",
            "Step 2: Connect three potentiometers",
            "Step 3: Upload color mixing code",
            "Step 4: Adjust pots to create different colors",
            "Step 5: Observe color spectrum creation"
        ],
        code: `int redPin = 9;
int greenPin = 10;
int bluePin = 11;

int redPot = A0;
int greenPot = A1;
int bluePot = A2;

int redValue, greenValue, blueValue;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  redValue = analogRead(redPot) / 4;
  greenValue = analogRead(greenPot) / 4;
  blueValue = analogRead(bluePot) / 4;
  
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
  
  Serial.print("R:");
  Serial.print(redValue);
  Serial.print(" G:");
  Serial.print(greenValue);
  Serial.print(" B:");
  Serial.println(blueValue);
  
  delay(100);
}`,
        logic: "PWM color control - learn about pulse width modulation and additive color mixing.",
        timeEstimate: "60-90 mins",
        linesOfCode: 28
    },
    {
        id: 10,
        title: "PIR Motion Detector",
        level: "intermediate",
        components: ["PIR Motion Sensor", "Buzzer", "LED", "Arduino Uno", "Breadboard"],
        description: "Detect motion and trigger alarm with buzzer and LED.",
        wiring: "1. PIR VCC to 5V, GND to GND, OUT to Pin 2\n2. Buzzer to Pin 8, LED to Pin 13",
        steps: [
            "Step 1: Connect PIR motion sensor",
            "Step 2: Add buzzer and LED as outputs",
            "Step 3: Adjust PIR sensitivity and delay",
            "Step 4: Test motion detection range",
            "Step 5: Create security alarm system"
        ],
        code: `int pirPin = 2;
int buzzerPin = 8;
int ledPin = 13;
int pirState = LOW;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  pirState = digitalRead(pirPin);
  
  if (pirState == HIGH) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH);
    Serial.println("Motion detected!");
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(buzzerPin, LOW);
  }
  delay(100);
}`,
        logic: "Motion sensing and alarm systems - learn about security systems and event detection.",
        timeEstimate: "45-60 mins",
        linesOfCode: 23
    },
    {
        id: 11,
        title: "Obstacle Avoiding Robot",
        level: "advanced",
        components: ["HC-SR04 Ultrasonic", "L298N Driver", "2WD Chassis", "2 DC Motors", "Arduino Uno"],
        description: "Build a robot that navigates autonomously avoiding obstacles.",
        wiring: "1. Ultrasonic sensor to Pins 9,10\n2. L298N motor driver to Pins 5,6,10,11\n3. Motors to L298N",
        steps: [
            "Step 1: Assemble robot chassis with motors",
            "Step 2: Mount ultrasonic sensor at front",
            "Step 3: Connect motor driver to Arduino",
            "Step 4: Upload obstacle avoidance code",
            "Step 5: Test robot navigation in different environments"
        ],
        code: `#include <NewPing.h>

#define TRIGGER_PIN 9
#define ECHO_PIN 10
#define MAX_DISTANCE 200

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

int motor1A = 5;
int motor1B = 6;
int motor2A = 10;
int motor2B = 11;

void moveForward() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void moveBackward() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnRight() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnLeft() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void stopRobot() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}

void setup() {
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  delay(50);
  int distance = sonar.ping_cm();
  
  Serial.print("Distance: ");
  Serial.println(distance);
  
  if (distance > 0 && distance < 20) {
    moveBackward();
    delay(500);
    turnRight();
    delay(500);
  } else {
    moveForward();
  }
}`,
        logic: "Autonomous navigation - learn about sensor-based decision making and real-time robot control.",
        timeEstimate: "90-120 mins",
        linesOfCode: 70
    },
    {
        id: 12,
        title: "Line Following Robot",
        level: "advanced",
        components: ["IR Sensor Pair", "L298N Driver", "2WD Chassis", "2 DC Motors", "Arduino Uno"],
        description: "Create a robot that follows black lines on white surface.",
        wiring: "1. IR sensors to Pins A0,A1\n2. Motor driver to Pins 5,6,9,10\n3. Adjust IR sensor sensitivity",
        steps: [
            "Step 1: Mount IR sensors close to ground",
            "Step 2: Calibrate sensors for line detection",
            "Step 3: Create black line track",
            "Step 4: Implement PID control for smooth following",
            "Step 5: Test on complex track layouts"
        ],
        code: `int leftSensor = A0;
int rightSensor = A1;

int motor1A = 5;
int motor1B = 6;
int motor2A = 9;
int motor2B = 10;

int leftValue, rightValue;

void setup() {
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  leftValue = analogRead(leftSensor);
  rightValue = analogRead(rightSensor);
  
  Serial.print("Left: ");
  Serial.print(leftValue);
  Serial.print(" Right: ");
  Serial.println(rightValue);
  
  if (leftValue > 500 && rightValue > 500) {
    // Both on white - move forward
    digitalWrite(motor1A, HIGH);
    digitalWrite(motor1B, LOW);
    digitalWrite(motor2A, HIGH);
    digitalWrite(motor2B, LOW);
  }
  else if (leftValue > 500 && rightValue < 500) {
    // Left on white, right on black - turn right
    digitalWrite(motor1A, HIGH);
    digitalWrite(motor1B, LOW);
    digitalWrite(motor2A, LOW);
    digitalWrite(motor2B, LOW);
  }
  else if (leftValue < 500 && rightValue > 500) {
    // Left on black, right on white - turn left
    digitalWrite(motor1A, LOW);
    digitalWrite(motor1B, LOW);
    digitalWrite(motor2A, HIGH);
    digitalWrite(motor2B, LOW);
  }
  else {
    // Both on black - stop or special action
    digitalWrite(motor1A, LOW);
    digitalWrite(motor1B, LOW);
    digitalWrite(motor2A, LOW);
    digitalWrite(motor2B, LOW);
  }
  delay(10);
}`,
        logic: "Line detection and following - learn about optical sensors and automated guidance systems.",
        timeEstimate: "90-120 mins",
        linesOfCode: 58
    },
    {
        id: 13,
        title: "Weather Station",
        level: "advanced",
        components: ["DHT11 Sensor", "BMP180 Pressure Sensor", "16x2 LCD", "Arduino Uno", "Breadboard"],
        description: "Build a complete weather station measuring temperature, humidity and pressure.",
        wiring: "1. DHT11 to Pin 2\n2. BMP180 via I2C (A4,A5)\n3. LCD to Pins 12,11,5,4,3,2",
        steps: [
            "Step 1: Connect all sensors to Arduino",
            "Step 2: Install required libraries",
            "Step 3: Calibrate pressure sensor",
            "Step 4: Display all readings on LCD",
            "Step 5: Log data for weather analysis"
        ],
        code: `#include <Wire.h>
#include <Adafruit_BMP085.h>
#include <DHT.h>
#include <LiquidCrystal.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP085 bmp;
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  dht.begin();
  
  if (!bmp.begin()) {
    Serial.println("BMP180 not found");
    while (1);
  }
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float p = bmp.readPressure() / 100.0F;
  
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(t, 1);
  lcd.print("C H:");
  lcd.print(h, 0);
  lcd.print("%");
  
  lcd.setCursor(0, 1);
  lcd.print("P:");
  lcd.print(p, 1);
  lcd.print(" hPa");
  
  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" *C, Humidity: ");
  Serial.print(h);
  Serial.print(" %, Pressure: ");
  Serial.print(p);
  Serial.println(" hPa");
  
  delay(2000);
}`,
        logic: "Multi-sensor data acquisition - learn about environmental monitoring and data fusion.",
        timeEstimate: "90-120 mins",
        linesOfCode: 43
    },
    {
        id: 14,
        title: "RFID Security System",
        level: "advanced",
        components: ["MFRC522 RFID Module", "Servo Motor", "Buzzer", "Arduino Uno", "LCD Display"],
        description: "Create an access control system using RFID cards.",
        wiring: "1. RFID module via SPI (Pins 10,9,8,7)\n2. Servo to Pin 6\n3. Buzzer to Pin 5\n4. LCD to standard pins",
        steps: [
            "Step 1: Connect RFID reader to Arduino",
            "Step 2: Program authorized RFID cards",
            "Step 3: Connect servo as door lock",
            "Step 4: Test access with valid/invalid cards",
            "Step 5: Add logging and alerts"
        ],
        code: `#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
#include <LiquidCrystal.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 mfrc522(SS_PIN, RST_PIN);
Servo myServo;
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

String authorizedCard = "A1 B2 C3 D4"; // Replace with your card UID

void setup() {
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
  myServo.attach(6);
  lcd.begin(16, 2);
  pinMode(5, OUTPUT);
  
  myServo.write(0); // Locked position
  lcd.print("RFID Security");
  lcd.setCursor(0, 1);
  lcd.print("Scan Card...");
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }
  
  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  
  lcd.clear();
  lcd.setCursor(0, 0);
  
  if (content.substring(1) == authorizedCard) {
    lcd.print("Access Granted!");
    myServo.write(90); // Unlock
    delay(3000);
    myServo.write(0); // Relock
  } else {
    lcd.print("Access Denied!");
    digitalWrite(5, HIGH); // Sound buzzer
    delay(1000);
    digitalWrite(5, LOW);
  }
  
  delay(1000);
  lcd.clear();
  lcd.print("Scan Card...");
}`,
        logic: "RFID authentication and access control - learn about security systems and identification technologies.",
        timeEstimate: "120-150 mins",
        linesOfCode: 62
    },
    {
        id: 15,
        title: "Bluetooth Controlled Car",
        level: "advanced",
        components: ["HC-05 Bluetooth Module", "L298N Driver", "2WD Chassis", "2 DC Motors", "Arduino Uno"],
        description: "Control your robot wirelessly using a smartphone app via Bluetooth.",
        wiring: "1. HC-05 TX to Arduino RX (Pin 0)\n2. HC-05 RX to Arduino TX (Pin 1)\n3. Motors to L298N\n4. L298N to Pins 5,6,10,11",
        steps: [
            "Step 1: Disconnect Arduino from USB before connecting HC-05",
            "Step 2: Connect HC-05: TX to RX (Pin 0), RX to TX (Pin 1), VCC to 5V, GND to GND",
            "Step 3: Connect motors to L298N driver",
            "Step 4: Connect L298N to Arduino Pins 5,6,10,11",
            "Step 5: Download Bluetooth RC Car app on smartphone",
            "Step 6: Upload Bluetooth car code",
            "Step 7: Pair HC-05 with phone (default PIN: 1234 or 0000)",
            "Step 8: Use app to control robot: F(Forward), B(Back), L(Left), R(Right), S(Stop)",
            "Step 9: Test control range (typically 10 meters)",
            "Step 10: Add obstacle avoidance for autonomous mode"
        ],
        code: `int motor1A = 5;
int motor1B = 6;
int motor2A = 10;
int motor2B = 11;

void moveForward() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void moveBackward() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnLeft() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void turnRight() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void stopRobot() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}

void setup() {
  Serial.begin(9600);
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    
    switch (command) {
      case 'F':
        moveForward();
        break;
      case 'B':
        moveBackward();
        break;
      case 'L':
        turnLeft();
        break;
      case 'R':
        turnRight();
        break;
      case 'S':
        stopRobot();
        break;
    }
  }
}`,
        logic: "Bluetooth serial communication and motor control - wireless robot control, smartphone integration, and IoT applications.",
        timeEstimate: "90-120 mins",
        linesOfCode: 71
    },
    {
        id: 16,
        title: "WiFi Controlled Robot",
        level: "expert",
        components: ["ESP8266 NodeMCU", "L298N Driver", "2WD Chassis", "2 DC Motors", "Battery Pack"],
        description: "Control robot over WiFi using web interface from any device.",
        wiring: "1. ESP8266 to motor driver\n2. Motors to L298N\n3. External power supply for motors",
        steps: [
            "Step 1: Program ESP8266 as WiFi access point",
            "Step 2: Create web interface for robot control",
            "Step 3: Connect motor driver to ESP8266",
            "Step 4: Test control via smartphone browser",
            "Step 5: Add camera for live video streaming"
        ],
        code: `#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "RobotControl";
const char* password = "12345678";

ESP8266WebServer server(80);

int motor1A = D1;
int motor1B = D2;
int motor2A = D3;
int motor2B = D4;

void setup() {
  Serial.begin(115200);
  
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  
  WiFi.softAP(ssid, password);
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
  
  server.on("/", handleRoot);
  server.on("/forward", handleForward);
  server.on("/backward", handleBackward);
  server.on("/left", handleLeft);
  server.on("/right", handleRight);
  server.on("/stop", handleStop);
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
}

void handleRoot() {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>button{width:100px;height:100px;font-size:20px;margin:5px;}</style>";
  html += "</head><body><h1>WiFi Robot Control</h1>";
  html += "<button onclick=\"fetch('/forward')\">FORWARD</button><br>";
  html += "<button onclick=\"fetch('/left')\">LEFT</button>";
  html += "<button onclick=\"fetch('/stop')\">STOP</button>";
  html += "<button onclick=\"fetch('/right')\">RIGHT</button><br>";
  html += "<button onclick=\"fetch('/backward')\">BACKWARD</button>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void moveForward() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void moveBackward() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnLeft() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
  delay(200);
  stopRobot();
}

void turnRight() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
  delay(200);
  stopRobot();
}

void stopRobot() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}

void handleForward() { moveForward(); server.send(200, "text/plain", "Forward"); }
void handleBackward() { moveBackward(); server.send(200, "text/plain", "Backward"); }
void handleLeft() { turnLeft(); server.send(200, "text/plain", "Left"); }
void handleRight() { turnRight(); server.send(200, "text/plain", "Right"); }
void handleStop() { stopRobot(); server.send(200, "text/plain", "Stop"); }`,
        logic: "IoT and web control - learn about wireless networking, web servers, and remote device control.",
        timeEstimate: "120-180 mins",
        linesOfCode: 95
    },
    {
        id: 17,
        title: "Voice Controlled Robot",
        level: "expert",
        components: ["Bluetooth Module", "Smartphone with Voice", "L298N Driver", "2WD Chassis", "Arduino Uno"],
        description: "Control robot using voice commands through smartphone.",
        wiring: "1. Bluetooth module to Arduino\n2. Motor driver connections\n3. External power for motors",
        steps: [
            "Step 1: Install voice control app on smartphone",
            "Step 2: Program Arduino to recognize voice commands",
            "Step 3: Map voice commands to robot actions",
            "Step 4: Test with basic commands: 'forward', 'stop'",
            "Step 5: Add advanced commands and gestures"
        ],
        code: `#include <SoftwareSerial.h>

SoftwareSerial BT(10, 11); // RX, TX

int motor1A = 5;
int motor1B = 6;
int motor2A = 9;
int motor2B = 10;

String command = "";

void setup() {
  Serial.begin(9600);
  BT.begin(9600);
  
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  
  Serial.println("Voice Controlled Robot Ready");
}

void loop() {
  while (BT.available()) {
    char c = BT.read();
    if (c == '#') {
      processCommand(command);
      command = "";
    } else {
      command += c;
    }
  }
}

void processCommand(String cmd) {
  cmd.toLowerCase();
  Serial.println("Command: " + cmd);
  
  if (cmd.indexOf("forward") >= 0 || cmd.indexOf("go") >= 0) {
    moveForward();
    delay(1000);
    stopRobot();
  } else if (cmd.indexOf("backward") >= 0 || cmd.indexOf("back") >= 0) {
    moveBackward();
    delay(1000);
    stopRobot();
  } else if (cmd.indexOf("left") >= 0) {
    turnLeft();
    delay(500);
    stopRobot();
  } else if (cmd.indexOf("right") >= 0) {
    turnRight();
    delay(500);
    stopRobot();
  } else if (cmd.indexOf("stop") >= 0) {
    stopRobot();
  } else if (cmd.indexOf("dance") >= 0) {
    dance();
  }
}

void moveForward() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void moveBackward() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnLeft() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void turnRight() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void stopRobot() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}

void dance() {
  for (int i = 0; i < 3; i++) {
    turnLeft();
    delay(300);
    turnRight();
    delay(300);
  }
  stopRobot();
}`,
        logic: "Voice recognition and natural language processing - learn about human-machine interaction and command parsing.",
        timeEstimate: "120-180 mins",
        linesOfCode: 89
    },
    {
        id: 18,
        title: "Self-Balancing Robot",
        level: "expert",
        components: ["MPU6050 Gyroscope", "L298N Driver", "2 DC Motors", "Arduino Uno", "Custom Chassis"],
        description: "Build a robot that balances itself like a Segway.",
        wiring: "1. MPU6050 via I2C (A4,A5)\n2. Motor driver to PWM pins\n3. Batteries for stable power",
        steps: [
            "Step 1: Build balanced chassis with low center of gravity",
            "Step 2: Calibrate MPU6050 for accurate angle readings",
            "Step 3: Implement PID control algorithm",
            "Step 4: Tune PID constants for stable balancing",
            "Step 5: Add remote control capability"
        ],
        code: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

// PID constants
float Kp = 15;
float Ki = 0.005;
float Kd = 0.1;

float error = 0;
float previous_error = 0;
float integral = 0;
float derivative = 0;
float output = 0;

int motor1A = 5;
int motor1B = 6;
int motor2A = 9;
int motor2B = 10;

float setpoint = 0; // Desired angle (vertical)

void setup() {
  Serial.begin(9600);
  Wire.begin();
  mpu.initialize();
  
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  
  // Calibrate MPU6050
  delay(1000);
  mpu.CalibrateAccel(6);
  mpu.CalibrateGyro(6);
}

void loop() {
  // Read angle from MPU6050
  float angle = getAngle();
  
  // PID calculation
  error = setpoint - angle;
  integral += error;
  derivative = error - previous_error;
  
  output = Kp * error + Ki * integral + Kd * derivative;
  previous_error = error;
  
  // Constrain output
  output = constrain(output, -255, 255);
  
  // Apply motor control
  if (output > 0) {
    moveForward(abs(output));
  } else if (output < 0) {
    moveBackward(abs(output));
  } else {
    stopMotors();
  }
  
  delay(10);
}

float getAngle() {
  int16_t ax, ay, az;
  int16_t gx, gy, gz;
  
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  
  // Convert accelerometer data to angle
  float accel_angle = atan2(ay, az) * 180 / PI;
  
  // Complementary filter
  static float angle = 0;
  static unsigned long last_time = 0;
  unsigned long current_time = millis();
  float dt = (current_time - last_time) / 1000.0;
  
  float gyro_rate = gx / 131.0;
  angle = 0.98 * (angle + gyro_rate * dt) + 0.02 * accel_angle;
  
  last_time = current_time;
  return angle;
}

void moveForward(int speed) {
  analogWrite(motor1A, speed);
  analogWrite(motor1B, 0);
  analogWrite(motor2A, speed);
  analogWrite(motor2B, 0);
}

void moveBackward(int speed) {
  analogWrite(motor1A, 0);
  analogWrite(motor1B, speed);
  analogWrite(motor2A, 0);
  analogWrite(motor2B, speed);
}

void stopMotors() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}`,
        logic: "PID control and sensor fusion - learn about feedback control systems and inertial measurement.",
        timeEstimate: "180-240 mins",
        linesOfCode: 101
    },
    {
        id: 19,
        title: "IoT Smart Home System",
        level: "expert",
        components: ["ESP8266 NodeMCU", "DHT11 Sensor", "Relay Module", "LED Lights", "Buzzer"],
        description: "Create a smart home system with remote monitoring and control.",
        wiring: "1. ESP8266 to sensors and relays\n2. DHT11 for temperature\n3. Relay for appliance control",
        steps: [
            "Step 1: Program ESP8266 for WiFi connection",
            "Step 2: Create web dashboard for control",
            "Step 3: Add temperature monitoring",
            "Step 4: Implement remote light/appliance control",
            "Step 5: Add security features and alerts"
        ],
        code: `#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

ESP8266WebServer server(80);
DHT dht(D4, DHT11);

int relay1 = D1;
int relay2 = D2;
int led = D3;
int buzzer = D0;

float temperature, humidity;

void setup() {
  Serial.begin(115200);
  
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
  
  digitalWrite(relay1, HIGH); // Relay off
  digitalWrite(relay2, HIGH);
  
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  server.on("/", handleRoot);
  server.on("/temperature", handleTemperature);
  server.on("/humidity", handleHumidity);
  server.on("/relay1on", [](){ digitalWrite(relay1, LOW); server.send(200, "text/plain", "Relay1 ON"); });
  server.on("/relay1off", [](){ digitalWrite(relay1, HIGH); server.send(200, "text/plain", "Relay1 OFF"); });
  server.on("/relay2on", [](){ digitalWrite(relay2, LOW); server.send(200, "text/plain", "Relay2 ON"); });
  server.on("/relay2off", [](){ digitalWrite(relay2, HIGH); server.send(200, "text/plain", "Relay2 OFF"); });
  server.on("/alarm", handleAlarm);
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();
  updateSensorData();
  delay(100);
}

void updateSensorData() {
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
}

void handleRoot() {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<style>";
  html += "body{font-family:Arial;text-align:center;margin:20px;}";
  html += "button{padding:15px 30px;margin:10px;font-size:16px;}";
  html += ".sensor{background:#f0f0f0;padding:20px;margin:10px;border-radius:10px;}";
  html += "</style>";
  html += "</head><body>";
  html += "<h1>Smart Home Control</h1>";
  html += "<div class='sensor'>";
  html += "<h2>Temperature: " + String(temperature) + "°C</h2>";
  html += "<h2>Humidity: " + String(humidity) + "%</h2>";
  html += "</div>";
  html += "<button onclick=\"fetch('/relay1on')\">Light ON</button>";
  html += "<button onclick=\"fetch('/relay1off')\">Light OFF</button><br>";
  html += "<button onclick=\"fetch('/relay2on')\">Fan ON</button>";
  html += "<button onclick=\"fetch('/relay2off')\">Fan OFF</button><br>";
  html += "<button onclick=\"fetch('/alarm')\">Test Alarm</button>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleTemperature() {
  server.send(200, "text/plain", String(temperature));
}

void handleHumidity() {
  server.send(200, "text/plain", String(humidity));
}

void handleAlarm() {
  for(int i=0; i<5; i++) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(led, HIGH);
    delay(200);
    digitalWrite(buzzer, LOW);
    digitalWrite(led, LOW);
    delay(200);
  }
  server.send(200, "text/plain", "Alarm Tested");
}`,
        logic: "Home automation and IoT - learn about remote monitoring, control systems, and smart home technologies.",
        timeEstimate: "150-210 mins",
        linesOfCode: 115
    },
    {
        id: 20,
        title: "Drone Flight Controller",
        level: "expert",
        components: ["Arduino Nano", "MPU6050", "4 ESCs", "4 Brushless Motors", "Quadcopter Frame"],
        description: "Build and program a quadcopter flight controller from scratch.",
        wiring: "1. MPU6050 to Arduino via I2C\n2. ESCs to PWM pins\n3. Receiver to signal pins",
        steps: [
            "Step 1: Assemble quadcopter frame with motors",
            "Step 2: Calibrate ESCs and motors",
            "Step 3: Implement flight stabilization algorithm",
            "Step 4: Add radio control receiver",
            "Step 5: Test in safe environment with safety precautions"
        ],
        code: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

// Motor pins
int motor1 = 3;
int motor2 = 5;
int motor3 = 6;
int motor4 = 9;

// PID variables
float Kp = 1.5, Ki = 0.05, Kd = 0.3;
float rollError = 0, pitchError = 0, yawError = 0;
float rollIntegral = 0, pitchIntegral = 0, yawIntegral = 0;
float rollPrevError = 0, pitchPrevError = 0, yawPrevError = 0;

float throttle = 1000; // Minimum throttle

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  // Initialize MPU6050
  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("MPU6050 connection failed");
    while(1);
  }
  
  // Calibrate sensors
  mpu.CalibrateAccel(6);
  mpu.CalibrateGyro(6);
  
  // Initialize motor pins
  pinMode(motor1, OUTPUT);
  pinMode(motor2, OUTPUT);
  pinMode(motor3, OUTPUT);
  pinMode(motor4, OUTPUT);
  
  // Arm ESCs
  armESCs();
  
  Serial.println("Flight Controller Ready");
}

void loop() {
  // Read sensor data
  float roll = getRoll();
  float pitch = getPitch();
  float yaw = getYaw();
  
  // Calculate PID
  float rollOutput = calculatePID(roll, 0, rollError, rollIntegral, rollPrevError);
  float pitchOutput = calculatePID(pitch, 0, pitchError, pitchIntegral, pitchPrevError);
  float yawOutput = calculatePID(yaw, 0, yawError, yawIntegral, yawPrevError);
  
  // Mixer algorithm
  int m1 = throttle + rollOutput + pitchOutput + yawOutput;
  int m2 = throttle - rollOutput + pitchOutput - yawOutput;
  int m3 = throttle - rollOutput - pitchOutput + yawOutput;
  int m4 = throttle + rollOutput - pitchOutput - yawOutput;
  
  // Constrain motor values
  m1 = constrain(m1, 1000, 2000);
  m2 = constrain(m2, 1000, 2000);
  m3 = constrain(m3, 1000, 2000);
  m4 = constrain(m4, 1000, 2000);
  
  // Write to motors
  writeMotor(motor1, m1);
  writeMotor(motor2, m2);
  writeMotor(motor3, m3);
  writeMotor(motor4, m4);
  
  delay(10);
}

float getRoll() {
  // Simplified roll calculation
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  return atan2(ay, az) * 180 / PI;
}

float getPitch() {
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  return atan2(-ax, sqrt(ay*ay + az*az)) * 180 / PI;
}

float getYaw() {
  int16_t gx, gy, gz;
  mpu.getRotation(&gx, &gy, &gz);
  static float yaw = 0;
  static unsigned long lastTime = 0;
  unsigned long currentTime = millis();
  float dt = (currentTime - lastTime) / 1000.0;
  yaw += gz * dt / 131.0;
  lastTime = currentTime;
  return yaw;
}

float calculatePID(float input, float setpoint, float &error, float &integral, float &prevError) {
  error = setpoint - input;
  integral += error;
  float derivative = error - prevError;
  float output = Kp * error + Ki * integral + Kd * derivative;
  prevError = error;
  return output;
}

void writeMotor(int pin, int value) {
  // Convert to microseconds for ESC
  int us = map(value, 1000, 2000, 1000, 2000);
  analogWrite(pin, us / 8); // Approximate conversion
}

void armESCs() {
  // Send minimum throttle to arm ESCs
  for (int i = 0; i < 100; i++) {
    writeMotor(motor1, 1000);
    writeMotor(motor2, 1000);
    writeMotor(motor3, 1000);
    writeMotor(motor4, 1000);
    delay(10);
  }
}`,
        logic: "Multi-rotor flight dynamics - learn about aerial robotics, sensor fusion, and real-time control systems.",
        timeEstimate: "240-300 mins",
        linesOfCode: 124
    },
    {
        id: 21,
        title: "Computer Vision Robot",
        level: "expert",
        components: ["Raspberry Pi", "Pi Camera", "L298N Driver", "Robot Chassis", "Arduino"],
        description: "Build a robot that sees and recognizes objects using computer vision.",
        wiring: "1. Raspberry Pi to Arduino via USB/GPIO\n2. Camera to Raspberry Pi\n3. Motor driver connections",
        steps: [
            "Step 1: Install OpenCV on Raspberry Pi",
            "Step 2: Program object detection algorithm",
            "Step 3: Interface Raspberry Pi with Arduino",
            "Step 4: Test object tracking",
            "Step 5: Implement autonomous following"
        ],
        code: `# Python code for Raspberry Pi with OpenCV
import cv2
import numpy as np
import serial
import time

# Initialize serial connection to Arduino
arduino = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
time.sleep(2)

# Initialize camera
cap = cv2.VideoCapture(0)
cap.set(3, 320)  # Width
cap.set(4, 240)  # Height

# Color range for object detection (adjust for your object)
lower_color = np.array([100, 150, 0])
upper_color = np.array([140, 255, 255])

def send_command(command):
    arduino.write(command.encode())
    print(f"Sent: {command}")

def process_frame(frame):
    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    # Create mask for specified color
    mask = cv2.inRange(hsv, lower_color, upper_color)
    
    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    if len(contours) > 0:
        # Find largest contour
        largest_contour = max(contours, key=cv2.contourArea)
        
        # Get bounding rectangle
        x, y, w, h = cv2.boundingRect(largest_contour)
        
        # Calculate center
        center_x = x + w // 2
        center_y = y + h // 2
        
        # Draw rectangle and center
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.circle(frame, (center_x, center_y), 5, (0, 0, 255), -1)
        
        # Determine robot action based on object position
        frame_center = frame.shape[1] // 2
        
        if center_x < frame_center - 50:
            send_command('L')  # Turn left
        elif center_x > frame_center + 50:
            send_command('R')  # Turn right
        elif w * h > 10000:  # Object too close
            send_command('B')  # Move backward
        elif w * h < 2000:  # Object too far
            send_command('F')  # Move forward
        else:
            send_command('S')  # Stop
        
        return frame, True
    
    send_command('S')  # No object found, stop
    return frame, False

print("Starting Computer Vision Robot...")
print("Press 'q' to quit")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Process frame
    processed_frame, object_found = process_frame(frame)
    
    # Display
    cv2.imshow('Computer Vision Robot', processed_frame)
    
    # Exit on 'q' press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()
arduino.close()
print("Robot stopped")`,
        logic: "Computer vision and machine perception - learn about image processing, object detection, and visual servoing.",
        timeEstimate: "180-240 mins",
        linesOfCode: 86
    },
    {
        id: 22,
        title: "Smart Irrigation System",
        level: "advanced",
        components: ["Soil Moisture Sensors", "Water Pump", "Relay Module", "Arduino Uno", "LCD Display"],
        description: "Automated plant watering system based on soil moisture levels.",
        wiring: "1. Moisture sensors to analog pins\n2. Relay to control water pump\n3. LCD for status display",
        steps: [
            "Step 1: Install soil moisture sensors",
            "Step 2: Connect water pump via relay",
            "Step 3: Calibrate moisture thresholds",
            "Step 4: Program automatic watering schedule",
            "Step 5: Test with different soil types"
        ],
        code: `#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

int moistureSensor1 = A0;
int moistureSensor2 = A1;
int relayPin = 8;
int ledPin = 13;

int moistureThreshold = 400; // Adjust based on calibration
int wateringDuration = 5000; // 5 seconds

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  
  pinMode(relayPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(relayPin, HIGH); // Relay off initially
  
  lcd.print("Smart Irrigation");
  lcd.setCursor(0, 1);
  lcd.print("System Ready");
  delay(2000);
}

void loop() {
  int moisture1 = analogRead(moistureSensor1);
  int moisture2 = analogRead(moistureSensor2);
  int avgMoisture = (moisture1 + moisture2) / 2;
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Moisture: ");
  lcd.print(avgMoisture);
  
  Serial.print("Moisture Level: ");
  Serial.println(avgMoisture);
  
  if (avgMoisture > moistureThreshold) {
    lcd.setCursor(0, 1);
    lcd.print("Watering Needed");
    
    digitalWrite(ledPin, HIGH);
    digitalWrite(relayPin, LOW); // Turn on pump
    lcd.setCursor(0, 1);
    lcd.print("Watering...      ");
    
    delay(wateringDuration);
    
    digitalWrite(relayPin, HIGH); // Turn off pump
    digitalWrite(ledPin, LOW);
    
    lcd.setCursor(0, 1);
    lcd.print("Watering Done   ");
    delay(2000);
  } else {
    lcd.setCursor(0, 1);
    lcd.print("Soil Moist OK   ");
    digitalWrite(ledPin, LOW);
  }
  
  // Log data every hour
  static unsigned long lastLog = 0;
  if (millis() - lastLog > 3600000) {
    logData(avgMoisture);
    lastLog = millis();
  }
  
  delay(10000); // Check every 10 seconds
}

void logData(int moisture) {
  Serial.print("Data Log - Time: ");
  Serial.print(millis() / 1000);
  Serial.print("s, Moisture: ");
  Serial.println(moisture);
  
  lcd.clear();
  lcd.print("Data Logged");
  lcd.setCursor(0, 1);
  lcd.print("Moisture: ");
  lcd.print(moisture);
  delay(2000);
}`,
        logic: "Automated agricultural systems - learn about precision farming, sensor networks, and automated control.",
        timeEstimate: "120-180 mins",
        linesOfCode: 73
    },
    {
        id: 23,
        title: "Gesture Controlled Robot",
        level: "advanced",
        components: ["MPU6050 Gyroscope", "Arduino Uno", "L298N Driver", "Robot Chassis", "Bluetooth Module"],
        description: "Control robot movements using hand gestures detected by gyroscope.",
        wiring: "1. MPU6050 to Arduino via I2C\n2. Motor driver connections\n3. Bluetooth for optional remote monitoring",
        steps: [
            "Step 1: Mount MPU6050 on glove or handheld device",
            "Step 2: Calibrate gyroscope for gesture recognition",
            "Step 3: Program gesture detection algorithm",
            "Step 4: Map gestures to robot movements",
            "Step 5: Test with different users"
        ],
        code: `#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

// Motor pins
int motor1A = 5;
int motor1B = 6;
int motor2A = 9;
int motor2B = 10;

// Gesture thresholds
int tiltForward = 15;
int tiltBackward = -15;
int tiltLeft = 15;
int tiltRight = -15;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("MPU6050 connection failed");
    while(1);
  }
  
  // Calibrate
  mpu.CalibrateAccel(6);
  mpu.CalibrateGyro(6);
  
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  
  Serial.println("Gesture Controlled Robot Ready");
}

void loop() {
  // Read accelerometer data
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  
  // Convert to angles (simplified)
  float angleX = atan2(ay, az) * 180 / PI;
  float angleY = atan2(-ax, sqrt(ay*ay + az*az)) * 180 / PI;
  
  Serial.print("Angle X: ");
  Serial.print(angleX);
  Serial.print("  Angle Y: ");
  Serial.println(angleY);
  
  // Detect gestures
  if (angleY > tiltForward) {
    Serial.println("Gesture: Tilt Forward");
    moveForward();
  } else if (angleY < tiltBackward) {
    Serial.println("Gesture: Tilt Backward");
    moveBackward();
  } else if (angleX > tiltLeft) {
    Serial.println("Gesture: Tilt Left");
    turnLeft();
  } else if (angleX < tiltRight) {
    Serial.println("Gesture: Tilt Right");
    turnRight();
  } else {
    Serial.println("Gesture: Neutral");
    stopRobot();
  }
  
  delay(100);
}

void moveForward() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void moveBackward() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void turnLeft() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, HIGH);
  digitalWrite(motor2A, HIGH);
  digitalWrite(motor2B, LOW);
}

void turnRight() {
  digitalWrite(motor1A, HIGH);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, HIGH);
}

void stopRobot() {
  digitalWrite(motor1A, LOW);
  digitalWrite(motor1B, LOW);
  digitalWrite(motor2A, LOW);
  digitalWrite(motor2B, LOW);
}`,
        logic: "Gesture recognition and human-computer interaction - learn about inertial sensing and intuitive control interfaces.",
        timeEstimate: "120-180 mins",
        linesOfCode: 88
    },
    {
        id: 24,
        title: "3D Printed Robotic Arm",
        level: "expert",
        components: ["SG90 Servos x6", "Arduino Mega", "3D Printed Parts", "Joystick Module", "Power Supply"],
        description: "Build a 6-DOF robotic arm with 3D printed parts and precise control.",
        wiring: "1. Servos to PWM pins on Arduino Mega\n2. Joysticks for manual control\n3. External power for servos",
        steps: [
            "Step 1: 3D print all arm components",
            "Step 2: Assemble mechanical structure",
            "Step 3: Install and calibrate servo motors",
            "Step 4: Program inverse kinematics",
            "Step 5: Test pick and place operations"
        ],
        code: `#include <Servo.h>

// Define servo objects
Servo baseServo;
Servo shoulderServo;
Servo elbowServo;
Servo wristServo;
Servo gripperServo;

// Joystick pins
int joyX = A0;  // Base control
int joyY = A1;  // Shoulder control
int joyZ = A2;  // Elbow control
int joyGrip = A3; // Gripper control

// Servo angles
int baseAngle = 90;
int shoulderAngle = 90;
int elbowAngle = 90;
int wristAngle = 90;
int gripperAngle = 90;

// Speed control
int moveSpeed = 10;

void setup() {
  Serial.begin(9600);
  
  // Attach servos to pins
  baseServo.attach(2);
  shoulderServo.attach(3);
  elbowServo.attach(4);
  wristServo.attach(5);
  gripperServo.attach(6);
  
  // Move to initial position
  baseServo.write(baseAngle);
  shoulderServo.write(shoulderAngle);
  elbowServo.write(elbowAngle);
  wristServo.write(wristAngle);
  gripperServo.write(gripperAngle);
  
  delay(1000);
  Serial.println("Robotic Arm Ready");
}

void loop() {
  // Read joystick values
  int xValue = analogRead(joyX);
  int yValue = analogRead(joyY);
  int zValue = analogRead(joyZ);
  int gripValue = analogRead(joyGrip);
  
  // Map joystick to servo movements
  if (xValue < 400) {
    baseAngle -= moveSpeed;
  } else if (xValue > 600) {
    baseAngle += moveSpeed;
  }
  
  if (yValue < 400) {
    shoulderAngle -= moveSpeed;
  } else if (yValue > 600) {
    shoulderAngle += moveSpeed;
  }
  
  if (zValue < 400) {
    elbowAngle -= moveSpeed;
  } else if (zValue > 600) {
    elbowAngle += moveSpeed;
  }
  
  // Gripper control
  if (gripValue < 400) {
    gripperAngle = 180; // Open
  } else if (gripValue > 600) {
    gripperAngle = 0; // Close
  }
  
  // Constrain angles
  baseAngle = constrain(baseAngle, 0, 180);
  shoulderAngle = constrain(shoulderAngle, 0, 180);
  elbowAngle = constrain(elbowAngle, 0, 180);
  wristAngle = constrain(wristAngle, 0, 180);
  gripperAngle = constrain(gripperAngle, 0, 180);
  
  // Move servos
  baseServo.write(baseAngle);
  shoulderServo.write(shoulderAngle);
  elbowServo.write(elbowAngle);
  wristServo.write(wristAngle);
  gripperServo.write(gripperAngle);
  
  // Print current angles
  Serial.print("Base: ");
  Serial.print(baseAngle);
  Serial.print(" Shoulder: ");
  Serial.print(shoulderAngle);
  Serial.print(" Elbow: ");
  Serial.print(elbowAngle);
  Serial.print(" Wrist: ");
  Serial.print(wristAngle);
  Serial.print(" Gripper: ");
  Serial.println(gripperAngle);
  
  delay(50);
}

// Inverse kinematics function (simplified)
void moveToPosition(float x, float y, float z) {
  // Calculate angles for given position
  // This is a simplified version - actual implementation requires trigonometry
  
  float distance = sqrt(x*x + y*y);
  float baseAngleCalc = atan2(y, x) * 180 / PI;
  
  // Adjust base angle
  baseAngle = constrain(baseAngleCalc, 0, 180);
  baseServo.write(baseAngle);
  
  // Simplified shoulder and elbow calculation
  // In real implementation, use proper inverse kinematics equations
  shoulderAngle = 90 + (z / 10);
  elbowAngle = 90 - (distance / 10);
  
  shoulderServo.write(constrain(shoulderAngle, 0, 180));
  elbowServo.write(constrain(elbowAngle, 0, 180));
}`,
        logic: "Robotic kinematics and mechatronics - learn about mechanical design, servo control, and coordinate transformations.",
        timeEstimate: "240-300 mins",
        linesOfCode: 108
    },
    {
        id: 25,
        title: "AI-Powered Robot Arm",
        level: "expert",
        components: ["ESP32 Camera", "SG90 Servos x4", "Robot Arm Kit", "Arduino Mega", "Joystick Module"],
        description: "Build a robotic arm with computer vision for object recognition and pickup.",
        wiring: "Complex wiring involving multiple servos, camera module, and control interface",
        steps: [
            "Step 1: Assemble robot arm mechanical structure",
            "Step 2: Install ESP32 camera for vision",
            "Step 3: Connect servo motors to Arduino Mega",
            "Step 4: Program basic arm movements",
            "Step 5: Implement computer vision for object detection",
            "Step 6: Create AI model for object recognition",
            "Step 7: Integrate vision with arm control",
            "Step 8: Test pick-and-place functionality",
            "Step 9: Add safety features and error handling",
            "Step 10: Optimize for speed and accuracy"
        ],
        code: `// Python code for ESP32-CAM with OpenCV
import cv2
import numpy as np
import serial
import time

# Initialize serial connection to Arduino
arduino = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
time.sleep(2)

# Load pre-trained object detection model (YOLO or similar)
# Note: This is a simplified version
net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

layer_names = net.getLayerNames()
output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# Initialize camera
cap = cv2.VideoCapture(0)

def detect_objects(frame):
    height, width, channels = frame.shape
    
    # Detect objects
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outputs = net.forward(output_layers)
    
    # Process detections
    class_ids = []
    confidences = []
    boxes = []
    
    for output in outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            if confidence > 0.5:
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                
                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
    
    # Non-maximum suppression
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    
    detected_objects = []
    if len(indexes) > 0:
        for i in indexes.flatten():
            x, y, w, h = boxes[i]
            label = str(classes[class_ids[i]])
            confidence = confidences[i]
            
            detected_objects.append({
                'label': label,
                'confidence': confidence,
                'box': (x, y, w, h),
                'center': (x + w//2, y + h//2)
            })
            
            # Draw detection
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, f"{label} {confidence:.2f}", (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    return frame, detected_objects

def send_to_arduino(command, data=None):
    if data:
        message = f"{command}:{data}\\n"
    else:
        message = f"{command}\\n"
    
    arduino.write(message.encode())
    print(f"Sent to Arduino: {message.strip()}")

def calculate_grasp_position(object_center, object_size):
    # Convert image coordinates to robot coordinates
    # This requires calibration for your specific setup
    robot_x = object_center[0] * 0.1  # Scale factor
    robot_y = object_center[1] * 0.1
    robot_z = object_size * 0.05
    
    return robot_x, robot_y, robot_z

print("AI-Powered Robot Arm Starting...")
print("Press 'q' to quit")

try:
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Detect objects
        processed_frame, objects = detect_objects(frame)
        
        # If object detected, plan grasp
        if objects:
            target = objects[0]  # Pick first detected object
            print(f"Detected: {target['label']} with {target['confidence']:.2f} confidence")
            
            # Calculate grasp position
            grasp_x, grasp_y, grasp_z = calculate_grasp_position(
                target['center'], 
                target['box'][2] * target['box'][3]
            )
            
            # Send coordinates to Arduino
            send_to_arduino("MOVE_TO", f"{grasp_x},{grasp_y},{grasp_z}")
            
            # Wait for arm to move
            time.sleep(2)
            
            # Send grasp command
            send_to_arduino("GRASP")
            time.sleep(1)
            
            # Move to drop location
            send_to_arduino("MOVE_TO", "10,10,5")
            time.sleep(2)
            
            # Release object
            send_to_arduino("RELEASE")
            time.sleep(1)
        
        # Display
        cv2.imshow('AI Robot Arm', processed_frame)
        
        # Exit on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("\\nStopping...")

finally:
    cap.release()
    cv2.destroyAllWindows()
    arduino.close()
    print("Robot arm stopped")`,
        logic: "Advanced robotics integrating computer vision, AI, and precise mechanical control for intelligent automation.",
        timeEstimate: "300-360 mins",
        linesOfCode: 124
    }
];
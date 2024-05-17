\
enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LIGHT_LEVELS {
    //% block="0"
    0,
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4,
    //% block="5"
    5,
    //% block="6"
    6,
    //% block="7"
    7,
    //% block="8"
    8,
    //% block="9"
    9,
}

enum MOTOR_PORTS {
    //% block="E"
    E,
    //% block="F"
    F,
    //% block="G"
    G,
    //% block="H"
    H,
}

enum SERVO_PORTS {
    //% block="1"
    1,
    //% block="8"
    8,
    //% block="12"
    12,
    //% block="2"
    2,
    //% block="13"
    13,
    //% block="14"
    14,
    //% block="15"
    15,
    //% block="16"
    16,
}

enum LED_PORTS {
    //% block="B"
    B,
    //% block="C"
    C,
    //% block="D"
    D,
    //% block="E"
    E,
    //% block="F"
    F,
    //% block="G"
    G,
    //% block="H"
    H,
}

enum BUTTON_PORTS {
    //% block="A"
    A,
    //% block="E"
    E,
    //% block="F"
    F,
    //% block="G"
    G,
    //% block="H"
    H,
}

enum LINE_TRACKING_PORTS {
    //% block="1"
    1,
    //% block="8"
    8,
    //% block="12"
    12,
    //% block="2"
    2,
}

enum DIRECTIONS {
    //% block="Ρολογιού"
    1023,
    //% block="Αντίστροφη Ρολογιού"
    0
}

enum LED_STATES {
    //% block="Άναψε"
    HIGH,
    //% block="Σβήσε"
    LOW
}

//% color="#1c0dbd" iconWidth=50 iconHeight=40
namespace alxS1 {

    //% block="Διάβασε θερμοκρασία" blockType="reporter"
    export function getTemperature(parameter: any, block: any) {
        if(Generator.board === 'microbit'){
            Generator.addInclude("Microbit Sensors","#include <Microbit_Sensors.h>");
            Generator.addCode(`Sensors.temperature()`);
        }
    }

    //% block="Διάβασε πυξίδα" blockType="reporter"
    export function getCompassHeading(parameter: any, block: any) {
        if(Generator.board === 'microbit'){
            Generator.addInclude("Microbit Sensors","#include <Microbit_Sensors.h>");
            Generator.addCode(`Sensors.compassHeading()`);
        }
    }

    //% block="Διάβασε επίπεδο φωτός" blockType="reporter"
    export function getLightLevel(parameter: any, block: any) {
        if(Generator.board === 'microbit'){
            Generator.addInclude("Microbit Matrix","#include <Microbit_Matrix.h>");
            Generator.addCode(`MMatrix.readLightLevel()`);
        }
    }

    //% block="Ρύθμιση φωτεινότητας led σε [LEVEL]" blockType="command"
    //% LEVEL.shadow="dropdown" LEVEL.options="LIGHT_LEVELS" BUTTON.defl="LIGHT_LEVELS.9"
    export function setBrightness(parameter: any, block: any) {
        let level = parameter.LEVEL.code;
        if(Generator.board === 'microbit'){
            Generator.addInclude("Microbit Matrix","#include <Microbit_Matrix.h>");
            Generator.addCode(`MMatrix.setBrightness(${level});`);
        }
    }

    //% block="Σέρβο στη θύρα [PORT] όρισε γωνία [ANGLE]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="SERVO_PORTS" BUTTON.defl="SERVO_PORTS.1"
    //% ANGLE.shadow="range" ANGLE.defl="90" ANGLE.params.max="180"
    export function setServoAngle(parameter: any, block: any) {
        let port = parameter.PORT.code;
        let angle = parameter.ANGLE.code;
        if(Generator.board === 'microbit'){
            Generator.addInclude("DFRobot_servo","#include <DFRobot_Servo.h>");
            Generator.addObject(`servo_object` ,`Servo`,`servo_${port}`);
            Generator.addSetup(`servo_setup`, `servo_${port}.attach(${port});`);
            Generator.addCode(`servo_${port}.angle(${angle});`);
        }
    }

    //% block="Led στο pin [PORT] [STATE]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="LED_PORTS" PORT.defl="LED_PORTS.B"
    //% STATE.shadow="dropdown" STATE.options="LED_STATES" BUTTON.defl="LED_STATES.HIGH"
    export function setLedState(parameter: any, block: any) {
        let port = parameter.PORT.code;
        let state = parameter.STATE.code;
        let port_for_led = 0;
        if (port=='B') { port_for_led = 14; }
        if (port=='C') { port_for_led = 2; }
        if (port=='D') { port_for_led = 8; }
        if (port=='E') { port_for_led = 15; }
        if (port=='F') { port_for_led = 13; }
        if (port=='G') { port_for_led = 12; }
        if (port=='H') { port_for_led = 1; }
        if(Generator.board === 'microbit'){
            Generator.addCode(`digitalWrite(${port_for_led}, ${state});`);
        }
    }

    //% block="Κουμπί πίεσης στο pin [PORT], είναι πατημένο;" blockType="boolean"
    //% PORT.shadow="dropdown" PORT.options="BUTTON_PORTS" BUTTON.defl="BUTTON_PORTS.A"
    export function getPressButtonStatus(parameter: any, block: any) {
        let port=parameter.PORT.code;
        let port_for_button = 0
        if (port=='A') { port_for_button = 20; }
        if (port=='E') { port_for_button = 16; }
        if (port=='F') { port_for_button = 14; }
        if (port=='G') { port_for_button = 2; }
        if (port=='H') { port_for_button = 8; }
        if(Generator.board === 'microbit'){
            Generator.addSetup(`Pull up button`, `pinMode(${port_for_button}, INPUT_PULLUP);`);
            Generator.addCode(`!digitalRead(${port_for_button})`);
        }
    }

    //% block="Αισθητήρας γραμμής στο pin [PORT], πατάει γραμμή;" blockType="boolean"
    //% PORT.shadow="dropdown" PORT.options="LINE_TRACKING_PORTS" BUTTON.defl="LINE_TRACKING_PORTS.1"
    export function getLineTrackingSensorValue(parameter: any, block: any) {
        let port=parameter.PORT.code;
        if(Generator.board === 'microbit'){
            Generator.addCode(`digitalRead(${port})`);
        }
    }
    
    //% block="Κινητήρας στη θύρα [PORT], κατεύθυνση [DIRECTION] και ταχύτητα [SPEED]" blockType="command"
    //% PORT.shadow="dropdown" PORT.options="MOTOR_PORTS" PORT.defl="MOTOR_PORTS.E"
    //% DIRECTION.shadow="dropdown" DIRECTION.options="DIRECTIONS" DIRECTION.defl="DIRECTIONS.1023"
    //% SPEED.shadow="range" SPEED.defl="127" SPEED.params.max="1023"
    export function setMotorDirectionAndSpeed(parameter: any, block: any) {
        let port = parameter.PORT.code;
        let port_for_speed = 0;
        let port_for_direction = 0;
        if (port=='E') {
            port_for_speed = 16;
            port_for_direction = 15;
        }
        else if (port=='F') {
            port_for_speed = 14;
            port_for_direction = 13;
        }
        else if (port=='G') {
            port_for_speed = 2;
            port_for_direction = 12;
        } else {
            port_for_speed = 8;
            port_for_direction = 1;
        }
        let direction = parameter.DIRECTION.code;
        let speed = parameter.SPEED.code;
        if(Generator.board === 'microbit'){
            Generator.addCode(`analogWrite(${port_for_direction}, ${direction});`);
            Generator.addCode(`analogWrite(${port_for_speed}, ${speed});`);
        }
    }

    function replace(str :string) {
        return str.replace("+", "");
    }
}


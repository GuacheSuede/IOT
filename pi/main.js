var mongoose = require('mongoose');
var faker = require('faker');
var moment = require('moment')

var GrovePi = require('node-grovepi').GrovePi

var Commands = GrovePi.commands
var Board = GrovePi.board

var RotaryAngleAnalogSensor = GrovePi.sensors.RotaryAnalog

// put led in port D3
// var led = new GrovePi.sensors.base.Digital(4);
// var temperature = new GrovePi.sensors.TemperatureAnalog(0)
// var led_bar = new GrovePi.sensors.LedBarDigital(3, 0)
var sound = new GrovePi.sensors.base.Analog(2)

// put buzzer in port D4 
var buzzer = new GrovePi.sensors.DigitalOutput(4)

var button = new GrovePi.sensors.DigitalOutput(5)


function start() {
    console.log('Starting Up fuck off machine')

   
        var rotaryAngleSensor = new RotaryAngleAnalogSensor(1)
        //Analog Port 1
        // Rotary Angle Sensor
        console.log('Rotary Angle Sensor (start watch)')
        rotaryAngleSensor.start()
        rotaryAngleSensor.on('data', function (res) {

            var i = 0; i < 1e7;

            if(res % 10 === 0){
                led_bar.toggleLed(i ++)
            }

          console.log('Rotary onData value=' + res)
        })
      


    
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }cd
        }
    }
    // function toggleLevel(i){
    //     for (var ii = i; ii > 0; --ii){
    //         console.log(ii)
    //         sleep(500)
    //         led_bar.toggleLed(ii)
    //     }
    // }

    function toggle() {

        if (status == 0){
            console.log("toggle off");
            buzzer.turnOff();
            status = 1;
        }
        else {
            console.log("toggle on");
            buzzer.turnOn();
            status = 0;
        }
    }

    function toggle() {

        if (status == 0){
            console.log("toggle off");
            button.turnOff();
            status = 1;
        }
        else {
            console.log("toggle on");
            button.turnOn();
            status = 0;
        }
    }

    board = new Board({
        debug: true,
        onError: function(err) {
            console.log('TEST ERROR')
        },


        onInit: function(res) {
            console.log("OnInit");
            if (res) {
                // sound.start()
                setInterval(()=>{
                    console.log( sound.read()
                    )
                }, 3000)
                // toggleLevel(9)
                // led_bar.init()
                // toggleLevel(9)
                // led_bar.toggleLed(1)
                // led_bar.toggleLed(2)
                // toggleLevel(9)
                // led_bar.setOrientation(0)


                // led_bar.setLevel()
                // led_bar.toggleLed(9);
                // console.log("0")
                // setInterval(()=> {
                //     var temperature = temperature.read()
                //
                //
                //
                // }, 5000)
                // call toggle every second
                // setInterval(toggle, 3000)
            }
        }
    })

    board.init();


}


// called on Ctrl-C.
// close the board and clean up
function onExit(err) {
    console.log('Exiting')
    board.close()
    process.removeAllListeners()
    process.exit()
    if (typeof err != 'undefined')
        console.log(err)
}

start()
// catches ctrl+c event
process.on('SIGINT', onExit)

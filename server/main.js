
var GrovePi = require('node-grovepi').GrovePi

var Commands = GrovePi.commands
var Board = GrovePi.board

// put led in port D3
var led = new GrovePi.sensors.base.Digital(4);


// status will tell us if the led is on or off
var status = 0;


function toggle() {

    if (status == 0){
        console.log("toggle off");
        led.write(1)

        status = 1;
    }
    else {
        console.log("toggle on");
        led.write(0)
        status = 0;
    }
}

function start() {
    console.log('starting')

    board = new Board({
        debug: true,
        onError: function(err) {
            console.log('TEST ERROR')
        },

        onInit: function(res) {
            console.log("OnInit");
            if (res) {
                // call toggle every second
                setInterval(toggle, 3000)
            }
        }
    })

    board.init();
}


// called on Ctrl-C.
// close the board and clean up
function onExit(err) {
    console.log('ending')
    board.close()
    process.removeAllListeners()
    process.exit()
    if (typeof err != 'undefined')
        console.log(err)
}

start()
// catches ctrl+c event
process.on('SIGINT', onExit)

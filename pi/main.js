var mongoose = require('mongoose');
var faker = require('faker');
var moment = require('moment')

var GrovePi = require('node-grovepi').GrovePi

var Commands = GrovePi.commands
var Board = GrovePi.board

// put led in port D3
// var led = new GrovePi.sensors.base.Digital(4);
// var temperature = new GrovePi.sensors.TemperatureAnalog(0)
// var led_bar = new GrovePi.sensors.LedBarDigital(3, 0)
var sound = new GrovePi.sensors.base.Analog(2)
var metrics = [
    'Isovaleric Acid',
    'Ammonia',
    'Hydrogen',
    'Methane',
    'Sulfur',
    'Formaldehyde',
    'Methylene Chloride',
    'Hydrogen Sulfide',
    'Current visitors',
    'vistors so far',
    // 'Visitors today',
    // 'Visitors per hour',
    // 'Lowest per hour today',
    // 'Highest per hour today',
    // 'Total Visitors ever',
    // 'Average time spent today',
    // 'Average time ever',
    // 'Highest inside at once',
    'Floor Wet / Dry',
    'Toilet Roll usage currently',
    'Hand Wash Time Spent Average',
    'Cubicle Time Spent Average  - list which cubicle',
    'Hand Dryer Time Spent Average - via temperature',
    'Hand Wash Amount of water used an hour - list which Hand Wash',
    'Hand Wash Amount of water used a day - list which Hand Wash',
    'Hand Wash Amount of water used ever - list which Hand Wash',
    'Toilet Bowl Amount of water used an hour - list which Stall',
    'Toilet Bowl Amount of water used a day - list which Stall',
    'Toilet Bowl Amount of water used ever  - list which Stall',
    'Clogged - Check via water level ultrasonic',
    'Hand Wash Temperature by the Minute',
    'Bin Weight - Check to clear or not via Ultrasonic',
    'Soap Usage - measure by ultrasonic and to alert if none',
    'Noise of toilet - 2 sound sensors on extreme ends the average volume',
    'Brightness of Toilet',
    'Humidity of Toilet',
    'Online/offline - Software',
    'Latency',
    'Total Uptime',
    'Connectivity - connected to IOT device switch',
    'Power level',
    'Number of errors so far',
    'IO Speed of Device',
    'Temperature of Device',
    'Volts of Device',
    'Memory of Device',
    'Clock Speed of Device',

]


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

const graphSchema = mongoose.Schema({
        data: { type: String },
        value: { type: String },
        time: { type: String }, //when generating time, use Date().getTime()
    }
)

var Graph = mongoose.model('graph', graphSchema);


function generate_gas(name){
    var data_value =  faker.random.number({
        'min': 0,
        'max': 100,
        'precision': 0.01
    })
    setInterval(() =>  {
        var choice = faker.random.number({
            'min': 0,
            'max': 100
        })
        // overtime increase
        if (choice < 15 && data_value > 1){
            data_value = (parseFloat(data_value) + parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "gas_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "gas_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "gas_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}

var time_since_last_visitor = 0;
var highest_vistors;
var lowest_vistors;
function generate_vistors(){
    var data_value =  faker.random.number({
        'min': 0,
        'max': 20
    })
    lowest_vistors = data_value
    highest_vistors = data_value
    setInterval(() =>  {
        ++time_since_last_visitor

        // if(time_since_last_visitor % 5 === 0) {
            var choice = faker.random.number({
                'min': 0,
                'max': 100
            })
            // overtime increase
            if (choice < 15 && data_value > 1) {
                --data_value
                var g = new Graph({
                    data: "current_vistors",
                    value: data_value,
                    time: new Date()
                })
                g.save()
            }

            if (choice > 85 && data_value < 30) {
                ++data_value
                var g = new Graph({
                    data: "current_visitors",
                    value: data_value,
                    time: new Date()
                })
                g.save()
            }

            if (85 > choice > 15) {
                var g = new Graph({
                    data: "current_visitors",
                    value: data_value,
                    time: new Date()
                })
                g.save()
            }

        if (data_value < lowest_vistors){
            lowest_vistors = data_value
            var g = new Graph({
                data: "lowest_visitors_so_far",
                value: lowest_vistors,
                time: new Date()
            })
            g.save()
        }
        if (data_value > highest_vistors){
            highest_vistors = data_value
            var g = new Graph({
                data: "highest_visitors_so_far",
                value: highest_vistors,
                time: new Date()
            })
            g.save()
        }



        // }
    },500)
}



function generate_temp(){
    var data_value =  faker.random.number({
        'min': 20,
        'max': 35,
        'precision': 0.01
    })
    setInterval(() =>  {
        var choice = faker.random.number({
            'min': 0,
            'max': 100
        })
        // overtime increase
        if (choice < 15 && data_value > 1){
            data_value = (parseFloat(data_value) + parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "temperature",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "temperature",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "temperature",
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}


function generate_water_amt_urinal(urinal_name){
    var data_value =  faker.random.number({
        'min': 15,
        'max': 40
    })
    setInterval(() =>  {
        var choice = faker.random.number({
            'min': 0,
            'max': 100
        })
        // overtime increase
        if (choice % 50 === 0) {
            // flood\
            for (var iiii = 0; iiii < 50*60; ++iiii) {
                var g = new Graph({
                    data: "urinal_"+urinal_name,
                    value: data_value,
                    time: moment().add(iiii, 'seconds')
                })
                g.save()
            }
        }
        if (choice < 15 && data_value > 1){
            data_value = (parseFloat(data_value) + parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "urinal_"+urinal_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "urinal_"+urinal_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "urinal_"+urinal_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}


function generate_water_amt_sink(sink_name){
    var data_value =  faker.random.number({
        'min': 15,
        'max': 40
    })
    setInterval(() =>  {
        var choice = faker.random.number({
            'min': 0,
            'max': 100
        })
        // overtime increase
        if (choice % 50 === 0) {
            // flood\
            for (var iiii = 0; iiii < 50*60; ++iiii) {
                var g = new Graph({
                    data: "sink_"+sink_name,
                    value: data_value,
                    time: moment().add(iiii, 'seconds')
                })
                g.save()
            }
        }
        if (choice < 15 && data_value > 1){
            data_value = (parseFloat(data_value) + parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "sink_"+sink_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "sink_"+sink_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "sink_"+sink_name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}


function start() {
    console.log('Starting Up')

    console.log("Connecting to Mongoose")
    mongoose.connect('mongodb://restheart:R3ste4rt!@104.215.195.190:27017/main?authSource=admin', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // generate_gas('isovaleric acid')
        // generate_gas('amonia')
        // generate_gas('hydrogen')
        // generate_gas('methane')
        // generate_gas('sulfur')
        // generate_gas('formaldehyde')
        // generate_gas('methylene_chloride')
        // generate_gas('hydrogen_sulfide')
        // generate_vistors()
        // generate_temperature()



        //

        // var data_value =  faker.random.number({
        //     'min': 0,
        //     'max': 100,
        //     'precision': 0.01
        // })
        // setInterval(()=>{
        //
        //
        //     var choice = faker.random.number({
        //         'min': 0,
        //         'max': 100
        //     })
        //     // overtime increase
        //     if (choice < 15 && data_value > 1){
        //         --data_value
        //         var g = new Graph({
        //             data: "gas_chlorine",
        //             value: data_value,
        //             time: new Date()
        //         })
        //         g.save()
        //     }
        //
        //     if (choice > 85 && data_value < 99){
        //         ++data_value
        //         var g = new Graph({
        //             data: "gas_chlorine",
        //             value: data_value,
        //             time: new Date()
        //         })
        //         g.save()
        //     }
        //
        //     if (85 > choice > 15){
        //         var g = new Graph({
        //             data: "gas_chlorine",
        //             value: data_value,
        //             time: new Date()
        //         })
        //         g.save()
        //     }
        //
        //
        //
        // }, 500)
        // we're connected!
    });
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }cd
        }
    }
    function toggleLevel(i){
        for (var ii = i; ii > 0; --ii){
            console.log(ii)
            sleep(500)
            led_bar.toggleLed(ii)
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


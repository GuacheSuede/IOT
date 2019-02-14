var mongoose = require('mongoose');
var faker = require('faker');
var moment = require('moment')
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
                data: "current_visitors",
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
    },1500)
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
    },1500)
}

function generate_soap_dispenser(name){
    var data_value = 100
    var gen_t = 0
    setInterval(() =>  {
        ++gen_t;
        if (gen_t % 10 == 0){
            --data_value
        }
        var g = new Graph({
            data: "soap_dispenser_"+name,
            value: data_value,
            time: new Date()
        })
        g.save()

    },500)
}


function generate_toilet_bin(name){
    var data_value = 0
    var gen_t = 0
    setInterval(() =>  {
        ++gen_t;
        if (gen_t % 10 == 0){
            ++data_value
        }
        if (gen_t % 200 == 0){
            data_value = 0
        }
        var g = new Graph({
            data: "bin_"+name,
            value: data_value,
            time: new Date()
        })
        g.save()

    },500)
}



function generate_toilet_noise(){
    var data_value =  faker.random.number({
        'min': 40,
        'max': 120,
        'precision': 0.1
    })
    setInterval(() =>  {
        var choice = faker.random.number({
            'min': 0,
            'max': 100
        })
        // overtime increase
        if (choice < 15 && data_value > 1){
            data_value = (parseFloat(data_value) + parseFloat(0.5)).toFixed(4)
            var g = new Graph({
                data: "noise",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.5)).toFixed(4)
            var g = new Graph({
                data: "noise",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "noise",
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}




function generate_water_hand_wash(name){
    var data_value = 0
    var gen_t = 0
    setInterval(() =>  {
        ++gen_t;
        if (gen_t % 6 == 0){
            ++data_value
        }
        var g = new Graph({
            data: "water_hand_wash_"+name,
            value: data_value,
            time: new Date()
        })
        g.save()

    },500)
}


function generate_humidity(){
    var data_value =  faker.random.number({
        'min': 30,
        'max': 50,
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
                data: "humidity",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "humidity",
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "humidity",
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}



function generate_temp_sink(name){
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
                data: "temperature_sink_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (choice > 85 && data_value < 99){
            data_value = (parseFloat(data_value) - parseFloat(0.05)).toFixed(4)
            var g = new Graph({
                data: "temperature_sink_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }

        if (85 > choice > 15){
            var g = new Graph({
                data: "temperature_sink_"+name,
                value: data_value,
                time: new Date()
            })
            g.save()
        }
    },500)
}



// /chartjs
// server and azure - cut
// generator - done
// slack - doing

function start() {
    console.log('Starting Up')

    console.log("Connecting to Mongoose")
    mongoose.connect('mongodb://restheart:R3ste4rt!@104.215.195.190:27017/main?authSource=admin', {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        generate_gas('isovaleric acid')
        generate_gas('amonia')
        generate_gas('hydrogen')
        generate_gas('methane')
        generate_gas('sulfur')
        generate_gas('formaldehyde')
        generate_gas('methylene_chloride')
        generate_gas('hydrogen_sulfide')
        generate_vistors()
        generate_temp()
        generate_toilet_noise()
        generate_water_amt_sink("1")
        generate_water_amt_sink("2")

        generate_water_amt_urinal("1")
        generate_water_amt_urinal("2")


        generate_soap_dispenser("1")
        generate_soap_dispenser("2")


        generate_toilet_bin("1")
        generate_toilet_bin("2")

        generate_water_hand_wash("1")
        generate_water_hand_wash("2")


        generate_temp_sink("1")
        generate_temp_sink("2")

    });


}


// called on Ctrl-C.
// close the board and clean up
function onExit(err) {
    console.log('Exiting')
    process.removeAllListeners()
    process.exit()
    if (typeof err != 'undefined')
        console.log(err)
}

start()
// catches ctrl+c event
process.on('SIGINT', onExit)

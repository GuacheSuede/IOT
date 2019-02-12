var GrovePi = require('node-grovepi').GrovePi
var Commands = GrovePi.commands
var Board = GrovePi.board



var board = new Board({
    debug: true,
    onError: function(err) {
        console.log('Something wrong just happened')
        console.log(err)
    },
    onInit: function(res) {
        if (res) {
            console.log('GrovePi Version :: ' + board.version())

            var lightSensor = new LightAnalogSensor(2)
            console.log('Light Analog Sensor (start watch)')
            lightSensor.on('change', function(res) {
                console.log('Light onChange value=' + res)
            })
            lightSensor.watch()
        }
    }
})











// const fastify = require('fastify')({
//     logger: true
// })
//
// // Declare a route
// fastify.get('/', (request, reply) => {
//     reply.send({ hello: 'world' })
// })
//
// // Run the server!
// fastify.listen(3000, (err, address) => {
//     if (err) throw err
//     fastify.log.info(`server listening on ${address}`)
// })

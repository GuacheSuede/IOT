const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fastify = require('fastify')({
    logger: true
  })


mongoose.connect('mongodb://104.215.195.190:27017/db', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

// Declare a route
fastify.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

fastify.get('/api', (req, res) => {
    db.collection('graph').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

// Run the server!
fastify.listen(4040, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
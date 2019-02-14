const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Graph = require('./graph-api/graph-schema');
const cors = require('cors');
const fastify = require('fastify')({
    logger: true
  })

const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = "xoxb-547274422003-550668159494-ipH9KEW1xFeduOcDvWorA0NV";
  
const web = new WebClient(token);
  
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'CG4PQJPSA';
mongoose.connect('mongodb://restheart:R3ste4rt!@104.215.195.190:27017/main?authSource=admin', {useNewUrlParser: true});

var datadddd;

Graph.find({'data': 'current_vistors'}, (err, data) =>{
    console.log(data)
    // See: https://api.slack.com/methods/chat.postMessage
    web.chat.postMessage({ channel: conversationId, text: JSON.stringify(data) })
    .then((res) => {
    // `res` contains information about the posted message


    console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
});
fastify.use(cors());

mongoose.connect('mongodb://restheart:R3ste4rt!@104.215.195.190:27017/main?authSource=admin', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

// Declare a route
// fastify.get('/', (req, res) => {
//   res.send({ hello: 'world' })
// })

// Run the server!
fastify.listen(4040, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})


//CRUD DB function
fastify.get('/api', function(req, res) {
  Graph
      .find({}).then(function(graph) {
      res.send(graph);
  });
});

fastify.post('/api', function(req, res) {
  Graph.create(req.body).then(function(graph) {
      res.send(graph);
  });
});

fastify.put('/api/:id', function(req, res) {
  Graph.findByIdAndUpdate({ graph_id: req.params.id }, req.body).then(
      function() {
          Graph.findOne({ graph_id: req.params.id }).then(function(
              graph
          ) {
              res.send({ graph });
          });
      }
  );
});

fastify.delete('/api/:id', function(req, res) {
  Graph.findByIdAndRemove({ graph_id: req.params.id }).then(function(
      graph
  ) {
      res.send(graph);
  });
});

fastify.get('/api/:keyword', function(req, res) {
  Graph.findOne(
      {
          $or: [
              { _id: req.params.keyword } || {
                      data: req.params.keyword
                  } 
          ]
      },
      function(err, graph) {
          if (err) return (err);
          res.json(graph);
      }
  );
});
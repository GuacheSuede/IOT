const express = require('express');
const router = express.Router();
const Graph = require('../graph-api/graph-schema');

router.get('/', function(req, res) {
    Graph
        .find({}).then(function(Graph) {
        res.send(graph);
    });
});

router.post('/', function(req, res) {
    Graph.create(req.body).then(function(graph) {
        res.send(graph);
    });
});

router.put('/:id', function(req, res) {
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

router.delete('/:id', function(req, res) {
    Graph.findByIdAndRemove({ graph_id: req.params.id }).then(function(
        graph
    ) {
        res.send(graph);
    });
});

router.get('/:keyword', function(req, res, next) {
    Graph.findOne(
        {
            $or: [
                { _id: req.params.keyword } || {
                        data: req.params.keyword
                    } 
            ]
        },
        function(err, graph) {
            if (err) return next(err);
            res.json(graph);
        }
    );
});

module.exports = router;

const mongoose = require('mongoose');

    const graphSchema = mongoose.Schema({
        data: { type: String },
        value: { type: String },
        time: { type: String }, //when generating time, use Date().getTime()      
    }
)

module.exports = mongoose.model('graph', graphSchema);

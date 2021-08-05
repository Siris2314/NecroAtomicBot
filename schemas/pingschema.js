const mongoose = require('mongoose');
const pingChart = mongoose.Schema({
    ping: {
        type: Number,
        required: true,
    },
    msgPing: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('pingChart', pingChart);
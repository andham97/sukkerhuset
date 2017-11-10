var mongoose = require('mongoose');

module.exports = dbCon.model('Semestere', new mongoose.Schema({
    days: Array,
    start: Date,
    end: Date
}, {collection: 'Semestere'}));
var mongoose = require('mongoose');

module.exports = dbCon.model('Semestere', new mongoose.Schema({
    events: Array
}, {collection: 'Semestere'}));
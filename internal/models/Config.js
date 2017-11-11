var mongoose = require('mongoose');

module.exports = dbCon.model('Config', new mongoose.Schema({
    key: String,
    value: mongoose.SchemaTypes.Mixed
}, {collection: 'Config'}));
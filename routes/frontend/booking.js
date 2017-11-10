var router = require('express').Router();
var Semester = require('../../internal/models/Semester');

router.use('/new', require('./booking/new'));

router.get('/', function(req, res){
    res.render('booking');
});

module.exports = router;
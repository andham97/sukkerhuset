var router = require('express').Router();

router.use('/new', require('./booking/new'));

router.get('/', function(req, res){
    res.render('booking');
});

module.exports = router;
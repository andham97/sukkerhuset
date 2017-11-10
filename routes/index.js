var router = require('express').Router();

router.use('/booking', require('./frontend/booking'));

router.get('/', function(req, res){
    res.send("hei");
});

module.exports = router;
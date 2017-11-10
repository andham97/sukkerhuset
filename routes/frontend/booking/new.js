var router = require('express').Router();

router.get('/', function(req, res){
    res.render('booking/new');
});

module.exports = router;
var router = require('express').Router();

router.use('/admin', require('./frontend/admin'));
router.use('/static', require('./frontend/static'));

router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;
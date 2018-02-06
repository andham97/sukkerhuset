var router = require('express').Router();

router.use('*', function(req, res, next){
    //if(!req.session.admin)
        //return res.redirect(307, '/');
    next()
});

router.use('/booking', require('./admin/booking'));
router.use('/vaktliste', require('./admin/vaktliste'));

router.get('/', function(req, res){
    res.render('admin');
});

module.exports = router;
var router = require('express').Router();

router.use('/booking', require('./api/booking'));
router.use('/vaktliste', require('./api/vaktliste'));
router.use('/login', require('./api/login'));

module.exports = router;
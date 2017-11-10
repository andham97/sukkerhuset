var router = require('express').Router();

router.use('/booking', require('./api/booking'));
router.use('/vaktliste', require('./api/vaktliste'));

module.exports = router;
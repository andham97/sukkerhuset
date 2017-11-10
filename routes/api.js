var router = require('express').Router();

router.use('/booking', require('./api/booking'));

module.exports = router;
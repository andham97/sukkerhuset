var router = require('express').Router();

router.use('/vaktliste', require('./static/vaktliste'));

module.exports = router;
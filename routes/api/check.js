var router = require('express').Router();

/*router.post('*', function(req, res, next){
    if(!req.session.admin)
        res.status(400).send();
    else
        next();
});

router.put('*', function(req, res, next){
    if(!req.session.admin)
        res.status(400).send();
    else
        next();
});

router.delete('*', function(req, res, next){
    if(!req.session.admin)
        res.status(400).send();
    else
        next();
});*/

module.exports = router;
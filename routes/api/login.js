var router = require('express').Router();
var Config = require('../../internal/models/Config');

router.get('/', function(req, res){
    var email = req.query.email;
    if(!email){
        res.status(400).send();
        return;
    }
    Config.find({key: "auth_emails"}, function(err, emails){
        if(err || !emails.length)
            res.status(500).send();
        else {
            for(var i = 0; i < emails.length; i++){
                if(emails[i].value == email){
                    req.session.admin = true;
                    req.session.save();
                    res.status(200).send();
                    return;
                }
            }
            res.status(400).send();
        }
    })
});

module.exports = router;
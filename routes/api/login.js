var router = require('express').Router();
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2("317471746226-07ir8fvhq04gik8hoks0tmjc141atna1.apps.googleusercontent.com", '', '');
var Config = require('../../internal/models/Config');

router.get('/', function(req, res){
    var token = req.query.token;
    if(!token){
        res.status(400).send();
        return;
    }
    client.verifyIdToken(token, "317471746226-07ir8fvhq04gik8hoks0tmjc141atna1.apps.googleusercontent.com", function(e, login){
        var email = login.getPayload().email;
        Config.find({key: "auth_emails"}, function(err, emails){
            if(err || !emails.length)
                res.status(500).send();
            else {
                emails = emails[0];
                for(var i = 0; i < emails.value.length; i++){
                    if(emails.value[i] === email){
                        req.session.admin = true;
                        req.session.save();
                        res.status(200).send();
                        return;
                    }
                }
                res.status(400).send();
            }
        });
    });
});

module.exports = router;
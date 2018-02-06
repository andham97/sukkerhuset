var router = require('express').Router();
var escape = require('html-escape');
var Semester = require('../../internal/models/Semester');
var check = require('./check');

router.use('*', check);

router.put('/', function(req, res){
    var type = req.body.type;
    var pos = req.body.pos;
    var val = escape(req.body.value);
    var semester = req.body.semester;
    if(!type || !pos || (!val && val != "")){
        res.status(400).send();
        return;
    }
    if(type != "start" && type != "end" && type != "arrangement" && type != "kontaktperson" && type != "kontaktmail" && type != "kontrakt" && type != "faktura" && type != "antallgjester" && type != "comment"){
        res.status(400).send();
        return;
    }
    pos = pos.split("-");
    if(pos.length == 0 || pos.length > 2){
        res.status(400).send();
        return;
    }
    else if(pos.length == 1 && !["arrangement", "kontaktperson", "kontaktmail", "kontrakt", "faktura", "antallgjester", "comment"].includes(type)){
        res.status(400).send();
        return;
    }
    else if(pos.length == 2 && !["start", "end"].includes(type)){
        res.status(400).send();
        return;
    }
    var s = "days." + pos[0];
    switch(type){
        case "start":
        case "end":
            s += ".vakt." + pos[1];
        case "comment":
        case "arrangement":
        case "kontrakt":
        case "faktura":
            s += "." + type;
            break;
        case "antallgjester":
            s += ".antallGjester";
            break;
        case "kontaktmail":
            s += ".kontakt.email";
            break;
        case "kontaktperson":
            s += ".kontakt.navn";
    }
    var qry = {};
    qry[s] = val;
    Semester.update({_id: semester}, {$set: qry}, function(err){
        if(err)
            res.status(500).send(JSON.stringify(err));
        else
            res.status(200).send();
    })
});

module.exports = router;
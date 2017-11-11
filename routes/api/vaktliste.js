var router = require('express').Router();
var Semester = require('../../internal/models/Semester');
var escape = require('html-escape');

router.get('/', function(req, res){
    var s = {
        start: new Date("2017-08-01"),
        end: new Date("2017-11-30"),
        days: []
    };
    var lim = (s.end.getTime() - s.start.getTime())/(1000*60*60*24) + 1;
    for(var i = 0; i < lim; i++){
        s.days.push(new Day(new Date(s.start.getTime() + (1000*60*60*24*i))));
    }
    var semester = new Semester(s);
    semester.save(function(err){
        if(err)
            res.status(500).send();
        else
            res.send();
    });
});

router.post('/', function(req, res){
    console.log(req.body);
    var type = req.body.type;
    var pos = req.body.pos;
    var val = escape(req.body.value);
    var semester = req.body.semester;
    if(!type || !pos || (!val && val != "")){
        res.status(400, "Bad request").send();
        console.log("-1");
        return;
    }
    if(type != "start" && type != "end" && type != "va" && type != "comment" && type != "komite" && type != "arrangement"){
        res.status(400, "Bad Request").send();
        return;
    }
    pos = pos.split("-");
    if(pos.length == 0 || pos.length > 3){
        res.status(400, "Bad Request").send();
        return;
    }
    else if(pos.length == 1 && type != "comment" && type != "arrangement"){
        res.status(400, "Bad Request").send();
        return;
    }
    else if(pos.length == 2 && (type != "start" && type != "end" && type != "va")){
        res.status(400, "Bad Request").send();
        return;
    }
    else if(pos.length == 3 && type != "komite") {
        res.status(400, "Bad Request").send();
        return;
    }
    var s = "days." + pos[0];
    switch(type){
        case "start":
        case "end":
        case "va":
            s += ".vakt." + pos[1];
        case "comment":
        case "arrangement":
            s += "." + type;
            break;
        case "komite":
            s += ".vakt." + pos[1] + ".komite." + pos[2];
    }
    var qry = {};
    qry[s] = val;
    Semester.update({_id: semester}, {$set: qry}, function(err){
        if(err)
            res.status(500).send(err);
        else
            res.status(200).send();
    });
});

function Day(date){
    this.date = date;
    this.arrangement = "";
    this.comment = "";
    this.vakt = [
        {
            va: "",
            komite: ["", "", "", ""],
            start: "14:00",
            end: "18:00"
        },
        {
            va: "",
            komite: ["", "", "", ""],
            start: "18:00",
            end: "01:00"
        }
    ];
}

module.exports = router;
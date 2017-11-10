var router = require('express').Router();
var Semester = require('../../internal/models/Semester');

router.get('/', function(req, res){
    Semester.find({start: {$lte: new Date()}, end: {$gte: new Date()}}, function(err, semester){
        if(err || semester.length == 0) {
            console.error(err);
            res.render('vaktliste', {content: ""});
            return;
        }
        console.log(semester);
        semester = semester[0];
        var s = "<table cellspacing='0'><tr><th>Dato</th><th>Start</th><th>Slutt</th><th>VA</th><th>Komité 1</th><th>Komité 2</th><th>Komité 3</th><th>Komité 4</th><th>Kommentar</th></tr>";
        for(var i = 0; i < semester.days.length; i++){
            s += "<tr><td rowspan='" + semester.days[i].vakt.length + "'>" + semester.days[i].date + "</td>";
            for(var j = 0; j < semester.days[i].vakt.length; j++){
                if(j != 0)
                    s += "<tr>";
                var vakt = semester.days[i].vakt[j];
                s += "<td contenteditable='true'>" + vakt.start + "</td><td contenteditable='true'>" + vakt.end + "</td><td contenteditable='true'>" + vakt.va + "</td>";
                for(var k = 0; k < vakt.komite.length; k++){
                    s += "<td contenteditable='true'>" + vakt.komite[k] + "</td>";
                }
                if(j == 0)
                    s += "<td contenteditable='true' rowspan='" + semester.days[i].vakt.length + "'>" + semester.days[i].kommentar + "</td>";
                s += "</tr>";
            }
        }
        s += "</table>";
        res.render('vaktliste', {content: s});
    });
});

module.exports = router;
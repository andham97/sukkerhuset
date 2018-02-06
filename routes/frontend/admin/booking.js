var router = require('express').Router();
var Semester = require('../../../internal/models/Semester');

router.use('/new', require('./booking/new'));

router.get('/', function(req, res){
    Semester.find({start: {$lte: new Date()}, end: {$gte: new Date()}}, function(err, semester){
        if(err){
            console.error(err);
            res.render('admin/booking', {content: ""});
        }
        else if(semester.length == 0){
            Semester.find({start: {$gte: new Date()}}, function(err, semester){
                if(err){
                    console.error(err);
                    res.render('admin/booking', {content: ""});
                }
                else if(semester.length == 0){
                    console.error("No current or future semester");
                    res.render('admin/booking', {content: "No current or future 'Semester'<a href='/admin/vaktliste/new'>Generate semester</a>"});
                }
                else
                    res.render('admin/booking', {content: render(semester[0])});
            });
        }
        else
            res.render('admin/booking', {content: render(semester[0])});
    });
});

function render(semester){
    var s = "<table cellspacing='0'><thead><tr><th rowspan='3'>Dato</th><th rowspan='3'>Arrangement</th><th rowspan='3'>Start</th><th rowspan='3'>Slutt</th><th>Kontaktinfo</th><th rowspan='3'>Kontrakt</th><th rowspan='3'>Faktura</th><th rowspan='3'>Antall gjester</th><th rowspan='3'>Kommentar</th></tr><tr><th>E-post adresse</th></tr><tr><th>Kontaktperson</th></tr></thead><tbody>";
    for(var i = 0; i < semester.days.length; i++){
        var day = semester.days[i];
        s += "<tr><td rowspan='2'>" + dateString(day.date) + "</td>";
        s += "<td rowspan='2' contenteditable='true' data-type='arrangement' data-pos='" + i + "'>" + day.arrangement + "</td>";
        for(var j = 0; j < day.vakt.length; j++){
            if(j != 0)
                s += "<tr>";
            var vakt = day.vakt[j];
            s += "<td contenteditable='true' data-type='start' data-pos='" + i + "-" + j + "'>" + vakt.start + "</td><td contenteditable='true' data-type='end' data-pos='" + i + "-" + j + "'>" + vakt.end + "</td>";
            if(j == 0){
                s += "<td contenteditable='true' data-type='kontaktperson' data-pos='" + i + "'>" + day.kontakt.navn + "</td>";
                s += "<td rowspan='2' contenteditable='false' data-type='kontrakt' data-pos='" + i + "'>" + day.kontrakt + "</td>";
                s += "<td rowspan='2' contenteditable='false' data-type='faktura' data-pos='" + i + "'>" + day.faktura + "</td>";
                s += "<td rowspan='2' contenteditable='true' data-type='antallgjester' data-pos='" + i + "'>" + day.antallGjester + "</td>";
                s += "<td data-type='comment' data-pos='" + i + "' contenteditable='true' rowspan='2'>" + semester.days[i].comment + "</td>";
            }
            if(j == 1)
                s += "<td contenteditable='true' data-type='kontaktmail' data-pos='" + i + "'>" + day.kontakt.email + "</td>";
            s += "</tr>";
        }
    }
    s += "</tbody></table><div id='data' style='display: none;' data-mainrows='" + semester.days.length + "' data-semester='" + semester._id + "'></div>";
    return s;
}

module.exports = router;

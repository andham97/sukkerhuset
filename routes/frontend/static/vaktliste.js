var router = require('express').Router();
var Semester = require('../../../internal/models/Semester');

router.get('/', function(req, res){
    Semester.find({start: {$lte: new Date()}, end: {$gte: new Date()}}, function(err, semester){
        if(err){
            console.error(err);
            res.render('admin/vaktliste', {content: ""});
        }
        else if(semester.length == 0){
            Semester.find({start: {$gte: new Date()}}, function(err, semester){
                if(err){
                    console.error(err);
                    res.render('admin/vaktliste', {content: ""});
                }
                else if(semester.length == 0){
                    console.error("No current or future semester");
                    res.render('admin/vaktliste', {content: "No current or future 'Semester'<a href='/admin/vaktliste/new'>Generate semester</a>"});
                }
                else
                    res.render('admin/vaktliste', {content: render(semester[0])});
            });
        }
        else
            res.render('static/vaktliste', {content: render(semester[0])});
    });
});

function render(semester) {
    var kmax = 0;
    var s = "<table cellspacing='0'><thead><tr><th>Dato</th><th>Arrangement</th><th>Start</th><th>Slutt</th><th>VA</th><th>Komité 1</th><th>Komité 2</th><th>Komité 3</th><th>Komité 4</th><th>Kommentar</th></tr></thead><tbody>";
    for (var i = 0; i < semester.days.length; i++) {
        s += "<tr><td rowspan='" + semester.days[i].vakt.length + "'>" + dateString(semester.days[i].date) + "</td>";
        s += "<td rowspan='" + semester.days[i].vakt.length + "' data-type='arrangement' data-pos='" + i + "'>" + semester.days[i].arrangement + "</td>";
        for (var j = 0; j < semester.days[i].vakt.length; j++) {
            if (j != 0)
                s += "<tr>";
            var vakt = semester.days[i].vakt[j];
            if (vakt.komite.length > kmax)
                kmax = vakt.komite.length;
            s += "<td data-type='start' data-pos='" + i + "-" + j + "'>" + vakt.start + "</td><td data-type='end' data-pos='" + i + "-" + j + "'>" + vakt.end + "</td><td data-type='va' data-pos='" + i + "-" + j + "'>" + vakt.va + "</td>";
            for (var k = 0; k < vakt.komite.length; k++)
                s += "<td data-type='komite' data-pos='" + i + "-" + j + "-" + k + "'>" + vakt.komite[k] + "</td>";
            if (j == 0)
                s += "<td data-type='comment' data-pos='" + i + "' rowspan='" + semester.days[i].vakt.length + "'>" + semester.days[i].comment + "</td>";
            s += "</tr>";
        }
    }
    s += "</tbody></table><div id='data' style='display: none;' data-semester='" + semester._id + "' data-mainRows='" + semester.days.length + "' data-komiteAmt='" + kmax + "'></div>";
    return s;
}

dateString = function(date){
    var s = "";
    switch (date.getDay()){
        case 0:
            s += "Søndag";
            break;
        case 1:
            s += "Mandag";
            break;
        case 2:
            s += "Tirsdag";
            break;
        case 3:
            s += "Onsdag";
            break;
        case 4:
            s += "Torsdag";
            break;
        case 5:
            s += "Fredag";
            break;
        case 6:
            s += "Lørdag";
            break;
    }
    s += " " + date.getDate() + ". ";
    switch (date.getMonth()){
        case 0:
            s += "Jan.";
            break;
        case 1:
            s += "Feb.";
            break;
        case 2:
            s += "Mars";
            break;
        case 3:
            s += "Apr.";
            break;
        case 4:
            s += "Mai";
            break;
        case 5:
            s += "Juni";
            break;
        case 6:
            s += "Juli";
            break;
        case 7:
            s += "Aug.";
            break;
        case 8:
            s += "Sept.";
            break;
        case 9:
            s += "Okt.";
            break;
        case 10:
            s += "Nov.";
            break;
        case 11:
            s += "Des.";
            break;
    }
    s += (1900 + date.getYear());
    return s;
};

module.exports = router;
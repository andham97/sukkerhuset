var mongoose = require('mongoose');

var mongoURI = (process.env.PORT ? "mongodb://sukkerhuset:1664=tap@ds113915.mlab.com:13915/heroku_4n5q8pgb" : "mongodb://localhost:27017/Sukkerhuset");
var mongoOpt = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimoutMS: 30000
        }
    }
};

mongoose.connect(mongoURI, mongoOpt);
dbCon = mongoose.connection;
dbCon.on('error', console.error.bind(console, 'Connection error: '));
dbCon.on('open', function(){
    var express = require('express');
    var app = express();
    var bodyparser = require('body-parser');
    var cookieparser = require('cookie-parser');
    var logger = require('morgan');
    var path = require('path');
    var port = process.env.PORT || 8000;
    var session = require('express-session');

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('common'));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    app.use(session({secret: 'signinng', resave: false, saveUninitialized: true, cookie: {}}));
    app.use(cookieparser('signinng'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', require('./routes/index'));
    app.use('/api', require('./routes/api'));

    app.listen(port);
    console.log('Listening on port ' + port + '...');
});
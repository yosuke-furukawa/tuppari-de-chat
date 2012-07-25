
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, http = require('http')
, Tuppari = require('tuppari')
, keys = require('./keys');
var app = express();

var tuppari = new Tuppari(keys);
var channel = tuppari.join('chat');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/chat', function(req, res){
    var message = req.query.message;
    console.log(message);
    if (message) {
        channel.send('your_event', message, function (err, res, body) {
            if (err) {
                console.error(err);
            }
            if (res) {
                console.log(res.statusCode, body);
            } else {
                console.error("no response.");
            }
        });
    }
    res.json(null);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

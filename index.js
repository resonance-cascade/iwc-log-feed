
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var logs = require('./lib/logs');
var moment = require('moment');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon('public/images/favicon.png'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  var replify = require('replify');
  app.use(express.errorHandler());
  app.locals.pretty = true;

  // Use repl-client to connect to interactive repl
  //  rc /tmp/repl/iwclog.sock
  replify('iwclog', app);
}

var baseURL = 'http://indiewebcamp.com/irc/';
logs.update(baseURL, moment().subtract('days', 1), function (err, data) {
  app.locals.log = data;
});
app.locals.pretty = true;


app.get('/', routes.index);
app.get('/atom.xml', routes.atom);
app.get('/htmltest', routes.htmltest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



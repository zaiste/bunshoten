
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , hbs = require('hbs')
  , namespace = require('express-namespace')
  , moment = require('moment');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.locals({ layout: false })
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

hbs.registerHelper('betterDate', function(date) { 
    console.log("Date: " + date);
    return moment(date).format("DD/MM/YYYY");
});

app.get('/', routes.index);

app.get('/gen', function(req, res){
  res.render('generate');
});

app.namespace('/documents', function() {
    app.get('/', function(req, res){
      res.render('index', { title: req.params.id, layout: false });
    });


    app.post('/', function(req, res){
      if (req.is('json')) {
        document_name = "";
        res.render(document_name, req.body);
      } else {
        document_name = req.body.lang + "/" + req.body.id;
        res.render(document_name, JSON.parse(req.body.query));
      }
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

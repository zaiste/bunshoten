
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , namespace = require('express-namespace');

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

app.get('/', routes.index);

app.get('/gen', function(req, res){
  res.render('generate');
});

app.namespace('/documents/:lang/:id', function() {
    app.get('/', function(req, res){
      res.render('index', { title: req.params.id, layout: false });
    });


    app.post('/', function(req, res){
      document_name = req.params.lang + "/" + req.params.id
      if (req.is('json')) {
        res.render(document_name, req.body);
      } else {
        res.render(document_name, JSON.parse(req.body.query));
      }
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

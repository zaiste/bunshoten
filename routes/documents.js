app.namespace('/documents/:id', function() {
  app.get('/(view)?', function(req, res){
    res.send('GET document ' + req.params.id);
  });
});

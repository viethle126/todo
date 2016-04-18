var jSonParser = require('body-parser').json();
var express = require('express');
var app = express();
var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost/todo';

app.use(express.static('./public'));
app.use(jSonParser);
app.get('/user', function(req, res) {
  var user = {
    name: 'Viet',
    location: 'Irvine, CA'
  }
  res.json(user);
})

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('Listening on port: ' + port);
})

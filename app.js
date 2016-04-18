var jSonParser = require('body-parser').json();
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
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

app.route('/todos')
  .post(function(req, res) {
    var item = req.body;
    mongoClient.connect(url, function(error, db) {
      if (!error) {
        var todos = db.collection('todos');
        todos.insert(item,
          function(error, result) {
            if (!error) { res.sendStatus(200) }
            else { res.sendStatus(500) }
            db.close();
          }
        );
      } else {
        res.sendStatus(500);
        db.close();
      }
    })
  })
  .get(function(req, res) {
    mongoClient.connect(url, function(error, db) {
      if (!error) {
        var todos = db.collection('todos');
        todos.find({}).toArray(function(error, result) {
          res.send(result);
          db.close();
        })
      } else {
        res.sendStatus(500);
        db.close();
      }
    })
  })

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('Listening on port: ' + port);
})

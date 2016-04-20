var jSonParser = require('body-parser').json();
var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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

app.route('/todos/:user')
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
    var user = req.params.user;
    mongoClient.connect(url, function(error, db) {
      if (!error) {
        var todos = db.collection('todos');
        todos.find({ user: user }, { 'sort': 'due' }).toArray(function(error, result) {
          res.send(result);
          db.close();
        })
      } else {
        res.sendStatus(500);
        db.close();
      }
    })
  })
  .delete(function(req, res) {
    var ids = [];
    req.body.items.forEach(function(element, index, array) {
      ids.push(ObjectId(element._id));
    })
    mongoClient.connect(url, function(error, db) {
      if (!error) {
        var todos = db.collection('todos');
        todos.deleteMany({ _id: { $in: ids } },
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

app.use(express.static('./'));

if (!require.main.loaded) {
  var server = app.listen(1337);
}

module.exports = app;

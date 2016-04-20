var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/todo';
var assert = require('chai').assert;
var request = require('request');

var app = require('./app.js');
var RANDOMIZE = 0;
var server = app.listen(RANDOMIZE);
var port = server.address().port;

// user
describe('Get request to /user', function() {
  it('is returning a user name', function(done) {
    request('http://localhost:' + port + '/user',
      function(error, response, body) {
        var parsed = JSON.parse(body);
        assert.equal(error, null);
        assert.equal(parsed.name, 'Viet');
        done();
    })
  })
})

// todos
describe('Todos', function() {
  var items = [];
  // create
  describe('Post request to /todos', function() {
    before(function(done) {
      request({
        url: 'http://localhost:' + port + '/todos/Viet',
        method: 'POST',
        json: { task: 'Test routes', user: 'Viet' }
      }, function(error, response, body) {
        done();
      })
    })

    it('is writing to database', function(done) {
      mongoClient.connect(url, function(error, db) {
        if (!error) {
          var todos = db.collection('todos');
          todos.find({ task: 'Test routes' }).toArray(function(error, result) {
            assert.equal(error, null);
            assert.notEqual(0, result.length);
            items = result;
            db.close();
            done();
          })
        }
      })
    })
  })
  // read
  describe('Get request to /todos', function() {
    it('is reading database', function(done) {
      request('http://localhost:' + port + '/todos/Viet',
        function(error, response, body) {
          var parsed = JSON.parse(body);
          assert.equal(error, null);
          assert.notEqual(0, parsed.length);
          done();
        }
      );
    })
  })
  // delete
  describe('Delete request to /todos', function() {
    it('is deleting from database', function(done) {
      request({
        url: 'http://localhost:' + port + '/todos/Viet',
        method: 'DELETE',
        json: { items: items }
      }, function(error, response, body) {
        if (!error) {
          mongoClient.connect(url, function(error, db) {
            if (!error) {
              var todos = db.collection('todos');
              todos.find({ task: 'Test routes' }).toArray(function(error, result) {
                assert.equal(error, null);
                assert.equal(0, result.length);
                db.close();
                done();
              })
            }
          })
        }
      })
    })
  })
  // end
  after(function() {
    server.close();
  })
})

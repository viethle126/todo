var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/todo';
var assert = require('chai').assert;
var request = require('request');

// user
describe('Get request to /user', function() {
  it('is returning a user name', function(done) {
    request('http://localhost:1337/user',
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
        url: 'http://localhost:1337/todos',
        method: 'POST',
        json: { task: 'Test routes' }
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
            assert.equal(1, result.length);
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
      request('http://localhost:1337/todos',
        function(error, response, body) {
          var parsed = JSON.parse(body);
          items.push(parsed[0]);
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
        url: 'http://localhost:1337/todos',
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
})

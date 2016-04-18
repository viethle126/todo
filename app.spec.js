var mongoClient = require('mongodb').MongoClient;
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
})

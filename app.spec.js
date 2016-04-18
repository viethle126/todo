var db = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';
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

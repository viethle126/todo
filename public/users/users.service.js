var app = angular.module('todo');

app.factory('users', users);

users.$inject = ['$http'];

function users($http) {
  function getUser() {
    return $http.get('http://localhost:1337/user');
  }

  return {
    getUser: getUser
  }
}

var app = angular.module('todo');

app.controller('todoController', todo);

app.$inject = ['$http', 'users'];

function todo($http, users) {
  vm = this;
  vm.today = new Date();
  vm.completed = [];

  (vm.refresh = function() {
    var user = users.getUser();
    user.then(function(info) {
      vm.user = info.data.name;
      var todos = $http.get('http://localhost:1337/todos/' + vm.user);
      todos.then(function(todo) {
        // check which items are still in vm.completed
        vm.completed.forEach(function(completed, ind, arr) {
          todo.data.forEach(function(todo, index, array) {
            if (completed._id === todo._id) {
              array.splice(index, 1);
            }
          })
        })
        vm.list = todo.data;
      })
    });
  })()

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.completed.push(vm.list[position]);
    vm.list.splice(position, 1);
  }

  vm.undo = function(item) {
    var position = vm.completed.indexOf(item);
    vm.list.push(item);
    vm.completed.splice(position, 1);
    vm.refresh();
  }

  vm.add = function(what, when, who) {
    var added = $http.post('http://localhost:1337/todos/' + vm.user,
      { task: what, due: when, user: who }
    );
    added.then(function() {
      vm.refresh();
      vm.task = '';
      vm.date = '';
    })
  }

  vm.clear = function() {
    var removed = $http({
      url: 'http://localhost:1337/todos/' + vm.user,
      method: 'DELETE',
      headers: {'Content-type': 'application/json'},
      data: { items: vm.completed }
    })
    removed.then(function() {
      vm.completed = [];
      vm.refresh();
    })
  }
}

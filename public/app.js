var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
  var vm = this;
  vm.message = 'Welcome home'

  var user = $http.get('http://localhost:1337/user');
  user.then(function(info) {
    vm.user = info.data;
  });
}

app.controller('todoController', todo);

function todo($http) {
  vm = this;
  vm.completed = [];

  (vm.refresh = function() {
    var todos = $http.get('http://localhost:1337/todos');
    todos.then(function(todo) {
      vm.list = todo.data;
    })
  })()

  vm.finished = function(item) {
    var position = vm.list.indexOf(item);
    vm.completed.push(vm.list[position]);
    vm.list.splice(position, 1);
  }

  vm.undo = function(item) {
    var position = vm.completed.indexOf(item);
    vm.list.push(vm.completed[position]);
    vm.completed.splice(position, 1);
  }

  vm.add = function(what) {
    var task = what;
    var added = $http.post('http://localhost:1337/todos',
      { task: what }
    );
    added.then(function() {
      vm.refresh();
      vm.task = '';
    })
  }

  vm.clear = function() {
    var removed = $http({
      url: 'http://localhost:1337/todos',
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

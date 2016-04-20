var app = angular.module('todo');

app.controller('homeController', home);

app.$inject = ['$http', 'users'];

function home($http, users) {
  var vm = this;
  vm.message = 'Get started'

  var user = users.getUser();
  user.then(function(info) {
    vm.user = info.data;
  });
}

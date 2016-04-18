var app = angular.module('todo');

app.directive('list', list);

function list() {
  return {
    templateUrl: 'todo/list.directive.html'
  }
}

var app = angular.module('todo');

app.directive('clear', clear);

function clear() {
  return {
    templateUrl: 'todo/clear.directive.html'
  }
}

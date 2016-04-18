var app = angular.module('todo', []);

app.controller('homeController', home);

app.$inject = ['$http'];

function home($http) {
	var vm = this;
	vm.message = 'Welcome home'

	var user = $http.get('http://localhost:1337/user');
	user.then(function(info) {
    console.log(info);
		vm.user = info.data;
	});
}

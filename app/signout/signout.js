'use strict';

angular.module('myApp.signout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signout', {
    controller: 'SignoutCtrl',
    templateUrl: 'signout/signout.html',
  });
}])

.controller('SignoutCtrl', ['$scope', 'currentUserService', '$location', function($scope, currentUserService, $location) {
  console.log('blah');
}]);

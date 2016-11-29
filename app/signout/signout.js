'use strict';

angular.module('myApp.signout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signout', {
    controller: 'SignoutCtrl',
    templateUrl: 'signout/signout.html',
  });
}])

.controller('SignoutCtrl', ['$scope', 'currentUserService', '$location', function($scope, currentUserService, $location) {
  var user = currentUserService.get();

  user.signOut();
  currentUserService.set(null);

  $location.path('/signin');
}]);

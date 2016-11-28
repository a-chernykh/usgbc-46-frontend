'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leaderboard', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {
  $scope.scores = [
    { 'zip_code': '94040', 'score': 20, 'rank': 1 },
    { 'zip_code': '94050', 'score': 10, 'rank': 2 },
    { 'zip_code': '94060', 'score': 5,  'rank': 3 },
  ];
}]);

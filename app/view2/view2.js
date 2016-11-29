'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leaderboard', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
  //https://h5c128n3tb.execute-api.us-west-2.amazonaws.com/dev/leaderboard?lat=123&lon=234&Test=2
  $http.get("https://h5c128n3tb.execute-api.us-west-2.amazonaws.com/dev/leaderboard?lat=123&lon=234&Test=2")
    .then(function(response) {
        $scope.scores = response.data.scores;
    });
/*
  $scope.scores = [
    { 'zip_code': '94040', 'score': 20, 'rank': 1 },
    { 'zip_code': '94050', 'score': 10, 'rank': 2 },
    { 'zip_code': '94060', 'score': 5,  'rank': 3 },
  ];
*/
}]);

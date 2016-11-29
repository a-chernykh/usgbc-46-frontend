'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/friendsleaderboard', {
    templateUrl: 'view3/view3.html',
    controller: 'view3Ctrl'
  });
}])

.controller('view3Ctrl', ['$scope', 'currentUserService', '$http', function($scope, currentUserService, $http) {
  var friends = [ 
                  { username: "DoraPhillips" },
                  { username: "ErickGibson" },
                  { username: "AnnieFrench" },
                  { username: "LorraineWalsh" },
                  { username: "DianaFrazier" },
                  { username: "ElmerOrtiz" },
                  { username: "LynnBerry" },
                  { username: "IvanWarren" },
                  { username: "PattiBlair" },
                  { username: "NicholeRodgers" }              
               ];
  var user = currentUserService.get();
  var zipCode;
  if (user) {
    user.getUserAttributes(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      for (var i = 0; i < result.length; i++) {
        if (result[i].getName() == 'custom:zip_code') {
          zipCode = result[i].getValue();
          break;
        }
      }

      console.log(zipCode);
      $http.get("https://h5c128n3tb.execute-api.us-west-2.amazonaws.com/dev/leaderboard?zipcode=" + zipCode)
	   .then(function (response) {
       var scores = response.data.scores;
       for (var i = 0; i < scores.length; i++) {
         if (scores[i].zip_code != zipCode) {
           scores[i].username = friends[i % 10].username;
         }
         else
         {
           scores[i].username = user.username;
         }
       }
	   	$scope.scores = scores;
	   });
    });
  }
/*
  $scope.scores = [
    { 'zip_code': '94040', 'score': 20, 'rank': 1 },
    { 'zip_code': '94050', 'score': 10, 'rank': 2 },
    { 'zip_code': '94060', 'score': 5,  'rank': 3 },
  ];
*/
}]);

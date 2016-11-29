'use strict';

angular.module('myApp.confirm', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/confirm', {
    templateUrl: 'confirm/confirm.html',
    controller: 'ConfirmCtrl'
  });
}])

.controller('ConfirmCtrl', ['$scope', 'currentUserService', '$location', function($scope, currentUserService, $location) {
  $scope.confirm = function() {
    var user = currentUserService.get();

    if (user != null) {
			var poolData = {
					UserPoolId : 'us-west-2_jgBW5EV5h',
					ClientId : '6bs2n2qs29hile7l41oqspsltd'
			};

			var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
			var userData = {
					Username : user.username,
					Pool : userPool
			};

			var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
			cognitoUser.confirmRegistration($scope.confirmation_code, true, function(err, result) {
					if (err) {
							alert(err);
							return;
					}
					console.log('call result: ' + result);
          $location.path('/signin');
          $scope.$apply();
			});

    } else {
      alert('user not found');
    }
  }
}]);

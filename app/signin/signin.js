'use strict';

angular.module('myApp.signin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'SigninCtrl'
  });
}])

.controller('SigninCtrl', ['$scope', 'currentUserService', '$location', function($scope, currentUserService, $location) {
  $scope.signin = function() {
    var authenticationData = {
        Username : $scope.email,
        Password : $scope.password,
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = { UserPoolId : 'us-west-2_jgBW5EV5h',
        ClientId : '6bs2n2qs29hile7l41oqspsltd'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : $scope.email,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
            console.log('idToken + ' + result.idToken.jwtToken);
            currentUserService.set(cognitoUser);
            $location.path('/leaderboard');
            $scope.$apply();
        },

        onFailure: function(err) {
            alert(err);
        },

    });
  }
}]);

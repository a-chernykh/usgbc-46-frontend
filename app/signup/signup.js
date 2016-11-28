'use strict';

angular.module('myApp.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$scope', function($scope) {
  $scope.signup = function() {
    AWSCognito.config.region = 'us-west-2'; //This is required to derive the endpoint

    var poolData = { UserPoolId : 'us-west-2_jgBW5EV5h',
        ClientId : '6bs2n2qs29hile7l41oqspsltd'
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
      Name : 'email',
      Value : $scope.email
    };
    var dataZipCode = {
      Name : 'custom:zip_code',
      Value : $scope.zip_code
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributeZipCode = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataZipCode);

    attributeList.push(attributeEmail);
    attributeList.push(attributeZipCode);

    userPool.signUp($scope.email, $scope.password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        console.log(result);
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }
}]);

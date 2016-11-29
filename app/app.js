'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.signup',
  'myApp.confirm',
  'myApp.signin',
  'myApp.version',
  'ngMap'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/signin'});
}]).

factory('currentUserService', function() {
  var currentUser = null;
  function set(data) {
    currentUser = data;
  }
  function get() {
    return currentUser;
  }

  return {
    set: set,
    get: get
  }
});

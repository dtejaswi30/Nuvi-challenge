'use strict';

// Declare app level module which depends on views, and components
angular.module('nuvi', [
  'ngRoute',
  'ngTable',
  'nuvi.view1',
  'nuvi.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

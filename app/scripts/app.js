'use strict';

angular.module('frontierApp', [])
    .factory('Data', function () {
      return { message: "I'm data from a service"}
    })
    .directive("enter", function () {
      return function (scope, element) {
        element.bind('mouseenter', function () {
          console.log("I am inside of you");
        })
      }
    })
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });
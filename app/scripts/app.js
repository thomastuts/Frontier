'use strict';

angular.module('frontierApp', [])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });
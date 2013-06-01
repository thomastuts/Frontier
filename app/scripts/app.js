'use strict';

angular.module('frontierApp', ['btford.dragon-drop'])
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

$(document).on('click', 'a[href="#"]', function() {
  return false;
});
'use strict';

angular.module('frontierApp', ['btford.dragon-drop'])
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          })
          .when('/firstrun', {
            templateUrl: 'views/firstrun.html',
            controller: 'FirstRunCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
    });

$(document).on('click', 'a[href="#"]', function() {
  return false;
});
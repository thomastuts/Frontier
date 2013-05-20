'use strict';

angular.module('frontierApp')
    .controller('MainCtrl', function ($scope, Data) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.partialUrl = 'views/detail.html';

    });

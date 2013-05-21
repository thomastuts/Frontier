'use strict';

angular.module('frontierApp')
  .controller('FruitCtrl', function ($scope) {
    $scope.view = 'views/modules/fruit/overview.html';

    $scope.fruits = [
      {
        name: 'Banana',
        info: "It's yellow and curved."
      },
      {
        name: 'Orange',
        info: 'It is orange and zesty.'
      },
      {
        name: 'Apple',
        info: "It's green and can be pretty sour."
      }
    ];

    $scope.showDetail = function (fruit) {
      $scope.fruit = fruit;
      $scope.views = {
        detail: {
          result: _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })
        }
      };
      $scope.view = 'views/modules/fruit/detail.html';
      $scope.testje = 'wutwut';
    };
  });

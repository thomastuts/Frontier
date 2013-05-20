'use strict';

angular.module('frontierApp')
    .controller('MainCtrl', function ($scope, Data) {
      // set default view
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

      $scope.testje = function () {
        console.log("Testje yoyo");
      };

      $scope.showDetail = function (fruit) {
        $scope.fruit = fruit;
        console.log($scope.fruit);
        $scope.view = 'views/modules/fruit/detail.html';
        console.log($scope.view);
        $scope.testje = 'wutwut';
      };


    });

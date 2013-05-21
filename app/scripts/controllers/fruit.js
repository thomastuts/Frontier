'use strict';

angular.module('frontierApp')
  .controller('FruitCtrl', function ($scope) {
    $scope.module = {
      meta: {
        version: '0.1',
        name: 'fruit'
      },
      menubar: {
        title: 'Fruit Module',
        icon: 'icon-ambulance'
      },
      view: 'views/modules/fruit/overview.html'
    };

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
      $scope.module.view = 'views/modules/fruit/detail.html';
      $scope.fruit = fruit;
    };
  });

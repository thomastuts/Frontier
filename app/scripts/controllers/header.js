'use strict';

angular.module('frontierApp')
  .controller('HeaderCtrl', function ($scope, storage) {

    $scope.data = storage.get('config');
    console.log($scope.data);
    $scope.timer = moment().format($scope.data.general.datetime_format);

    $scope.interval = window.setInterval(function () {
      $scope.$apply(function () {
        $scope.timer = moment().format($scope.data.general.datetime_format);
      });
    }, 1000);

  });

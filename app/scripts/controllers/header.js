'use strict';

angular.module('frontierApp')
  .controller('HeaderCtrl', function ($scope, storage) {

    try {
      $scope.data = storage.get('config');
      // console.log($scope.data);
      $scope.timer = moment().format($scope.data.general.datetime_format);

      $scope.interval = window.setInterval(function () {
        $scope.$apply(function () {
          $scope.timer = moment().format($scope.data.general.datetime_format);
        });
      }, 1000);
    }
    catch (e) {
      // console.log(e.message);
    }

    $scope.toggleSettings = function () {
      $('.settings').fadeToggle(250);
    };

  });

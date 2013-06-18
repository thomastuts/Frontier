'use strict';

angular.module('frontierApp')
  .controller('SettingsCtrl', function ($scope, storage) {

    $scope.data = {
      config: storage.get('config'),
      github: storage.get('module-github')
    };

    $scope.toggleSettings = function () {
      $('.settings').fadeToggle(250);
    };

    $scope.saveSettings = function () {

      storage.set('config', $scope.data.config);
      storage.set('module-github', $scope.data.github);

      document.location.reload(true);
      // refresh/reload
    };

    $scope.moveToRight = function (index) {
      $scope.data.config.dashboard.right.push($scope.data.config.dashboard.left[index]);
      $scope.data.config.dashboard.left.splice(index, 1);
    };

    $scope.moveToLeft = function (index) {
      $scope.data.config.dashboard.left.push($scope.data.config.dashboard.right[index]);
      $scope.data.config.dashboard.right.splice(index, 1);
    };

    $scope.leftMoveUp = function (index) {
      if(index !== 0) {
        // store previous in temp variable
        var previousElement = $scope.data.config.dashboard.left[index - 1];

        // set value to index - 1
        $scope.data.config.dashboard.left[index - 1] = $scope.data.config.dashboard.left[index];

        // set stored value to old index
        $scope.data.config.dashboard.left[index] = previousElement;
      }
    };

    $scope.leftMoveDown = function (index) {
      if(index !== ($scope.data.config.dashboard.left.length - 1)) {
        // store next in temp variable
        var nextElement = $scope.data.config.dashboard.left[index + 1];

        // set value to index - 1
        $scope.data.config.dashboard.left[index + 1] = $scope.data.config.dashboard.left[index];

        // set stored value to old index
        $scope.data.config.dashboard.left[index] = nextElement;
      }
    };

    $scope.rightMoveUp = function (index) {
      if(index !== 0) {
        // store previous in temp variable
        var previousElement = $scope.data.config.dashboard.right[index - 1];

        // set value to index - 1
        $scope.data.config.dashboard.right[index - 1] = $scope.data.config.dashboard.right[index];

        // set stored value to old index
        $scope.data.config.dashboard.right[index] = previousElement;
      }
    };

    $scope.rightMoveDown = function (index) {
      if(index !== ($scope.data.config.dashboard.right.length - 1)) {
        // store next in temp variable
        var nextElement = $scope.data.config.dashboard.right[index + 1];

        // set value to index - 1
        $scope.data.config.dashboard.right[index + 1] = $scope.data.config.dashboard.right[index];

        // set stored value to old index
        $scope.data.config.dashboard.right[index] = nextElement;
      }
    };


  });

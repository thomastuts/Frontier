'use strict';

angular.module('frontierApp')
  .controller('SettingsCtrl', function ($scope, storage) {

    $scope.data = {
      config: storage.get('config'),
      github: storage.get('module-github')
    };

    console.log($scope.data.config);

    $scope.toggleSettings = function () {
      $('.settings').fadeToggle(250);
    };
  });

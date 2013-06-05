'use strict';

angular.module('frontierApp')
  .controller('FirstRunCtrl', function ($scope, $location, storage) {

    $scope.config = {
      general: {
        username: '',
        datetime_format: 'dddd DD/MM | H:mm:ss'
      }
    };

    $scope.github = {
      username: ''
    };

    $scope.saveConfiguration = function () {
      console.log($scope.config);
      console.log($scope.github);

      storage.set('config', $scope.config);
      storage.set('module-github', $scope.github);

      // instantiate empty containers
      storage.set('module-api', {collections: []});
      storage.set('module-inspiration', {sets: []});
      storage.set('module-reminders', {reminders: []});
      storage.set('module-todos', {projects: []});

      $location.path('/');
    };

  });

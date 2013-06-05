'use strict';

angular.module('frontierApp')
  .controller('FirstRunCtrl', function ($scope) {

    $scope.config = {
      username: '',
      datetime_format: 'dddd DD/MM | H:mm:ss'
    };

  });

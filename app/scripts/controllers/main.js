'use strict';

angular.module('frontierApp')
  .controller('MainCtrl', function ($scope, $location, storage, dashboard) {

    $scope.$on('$viewContentLoaded', function(){
      dashboard.render();
    });

    if (storage.get('config') === null) {
      console.warn('PERFORMING FIRST RUN');
      $location.path('/firstrun');
    }
  });

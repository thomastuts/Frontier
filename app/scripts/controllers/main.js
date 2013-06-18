'use strict';

angular.module('frontierApp')
  .controller('MainCtrl', function ($scope, $location, storage, dashboard) {

    if (storage.get('config') === null) {
      console.warn('PERFORMING FIRST RUN');
      $location.path('/firstrun');
    }
    else {
      $scope.$on('$viewContentLoaded', function(){
        dashboard.render();
      });
    }
  });

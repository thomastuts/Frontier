'use strict';

angular.module('frontierApp')
  .controller('MainCtrl', function ($scope, $location, storage) {

    if (storage.get('config') === null) {
      console.warn('PERFORMING FIRST RUN');
      $location.path('/firstrun');
    }
  });

'use strict';

angular.module('frontierApp')
  .controller('HeaderCtrl', function ($scope, storageService) {

    $scope.data = storageService.get();

  });

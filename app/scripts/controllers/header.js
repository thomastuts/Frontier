'use strict';

angular.module('frontierApp')
  .controller('HeaderCtrl', function ($scope) {
    var url = 'data/frontier.json';

    // todo: change this to storageservice
    $.get(url, function(data) {
      $scope.$apply(function () {
        $scope.data = data;
      });
    });
  });

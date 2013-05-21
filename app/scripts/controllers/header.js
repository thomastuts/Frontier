'use strict';

angular.module('frontierApp')
  .controller('HeaderCtrl', function ($scope, Data) {
    var url = 'data/frontier.json';

    $.get(url, function(data) {
      $scope.$apply(function () {
        $scope.data = data;
      });
    });
  });

'use strict';

angular.module('frontierApp')
  .controller('InspirationCtrl', function ($scope, storage, viewer, ui) {

    $scope.data = {
      explorer: null
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'inspiration'
      },
      menubar: {
        title: 'Inspiration',
        icon: 'icon-picture'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/inspiration/overview.html',
        history: []
      }
    };

    $scope.goBack = function () {
      // TODO: go back to previous API call
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

  });

'use strict';

angular.module('frontierApp')
  .controller('ScratchpadCtrl', function ($scope, storage, viewer, ui) {

    $scope.data = {
      overview: {},
      repo: {}
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'scratchpad'
      },
      menubar: {
        title: 'Scratchpad',
        icon: 'icon-lightbulb'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/scratchpad/scratchpad.html',
        history: []
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggleActions = function () {
      viewer.toggleActions('scratchpad');
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };



  });

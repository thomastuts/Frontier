'use strict';

angular.module('frontierApp')
  .controller('TodosCtrl', function ($scope, storage, viewer, ui) {
    $scope.data = {
      overview: storage.get('module-todos')
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'todos'
      },
      menubar: {
        title: 'To-do',
        icon: 'icon-list'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/todos/overview.html',
        history: []
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };
  });

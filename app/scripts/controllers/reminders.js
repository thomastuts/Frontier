'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage) {

    $scope.data = {
      overview: storage.get('module-reminders').reminders
    };

    console.log(moment().format());

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'reminders'
      },
      menubar: {
        title: 'Reminders',
        icon: 'icon-bell-alt'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/reminders/overview.html',
        history: []
      }
    };

    $scope.goBack = function () {
      // TODO: go back to previous API call
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    /*
     *   ------------
     *   | OVERVIEW |
     *   ------------
     */

  });

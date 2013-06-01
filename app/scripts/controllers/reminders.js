'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage) {

    $scope.data = {
      overview: storage.get('module-reminders').reminders,
      new: {
        name: '',
        datetime: '',
        type: ''
      }
    };

    console.log(moment().format());

    $scope.module = {
      meta   : {
        version: '0.1',
        name   : 'reminders'
      },
      menubar: {
        title: 'Reminders',
        icon : 'icon-bell-alt'
      },
      ui     : {
        open: true // true for full window, false for minimized version
      },
      views  : {
        currentView: 'views/modules/reminders/new.html',
        history    : []
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

    $scope.newReminder = function () {
      viewer.goToView($scope, 'views/modules/reminders/new.html', 'new');
    };

    /*
     *   ----------------
     *   | NEW REMINDER |
     *   ----------------
     */

    $scope.saveReminder = function () {
      console.log('Saving reminder for ' + $scope.data.new.name);
      var reminder = $scope.data.new;
      var reminders_data = storage.get('module-reminders');
      reminders_data.reminders.push(reminder);
      console.log(JSON.stringify(reminders_data));
      storage.set('module-reminders', reminders_data);
    }



  });

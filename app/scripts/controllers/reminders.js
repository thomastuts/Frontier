'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage) {

    $scope.data = {
      overview: storage.get('module-reminders').reminders,
      new: {
        name: '',
        datetime: '',
        type: ''
      },
      edit: {
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
        currentView: 'views/modules/reminders/overview.html',
        history    : []
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
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
      $scope.data.new.datetime = moment().unix();
    };


    /*
     *   ----------------
     *   | NEW REMINDER |
     *   ----------------
     */

    $scope.saveReminder = function (view) {

      var reminder, reminders;
      var reminders_data = storage.get('module-reminders');

      switch(view) {
        case 'new':
          console.log('Saving new reminder for ' + $scope.data.new.name);
          reminder = $scope.data.new;
          reminders_data.reminders.push(reminder);
          break;
        case 'edit':
          console.log('Saving edited reminder for ' + $scope.data.edit.name);
          reminder = $scope.data.edit;
          // TODO: find edited reminder and replace it
          break;
      }

      storage.set('module-reminders', reminders_data);
    };

    /*
     *   -----------------
     *   | EDIT REMINDER |
     *   -----------------
     */

    $scope.editReminder = function (reminder) {
      viewer.goToView($scope, 'views/modules/reminders/edit.html', 'edit');
      console.log('Editing reminder ' + reminder.name);
      $scope.data.edit = reminder;
    };



  });

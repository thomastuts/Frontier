'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage) {

    $scope.data = {
      overview: storage.get('module-reminders'),
      new     : {
        name    : '',
        datetime: '',
        type    : ''
      },
      edit    : {
        name    : '',
        datetime: '',
        type    : ''
      }
    };

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

    $scope.toggleActions = function () {
      viewer.toggleActions('reminders');
    };

    /*
     *   ------------
     *   | OVERVIEW |
     *   ------------
     */

    $scope.newReminder = function () {
      viewer.goToView($scope, 'views/modules/reminders/new.html', 'new');
      $scope.data.new.datetime = moment().format('DD-MM-YYYY HH:mm');
    };

    $scope.removeReminder = function (reminder) {
      console.log('Removing reminder: ' + reminder.name);
      for (var i = 0; i < $scope.data.overview.reminders.length; i++) {
        // TODO: confirmation?
        if ($scope.data.overview.reminders[i].id === reminder.id) {
          $scope.data.overview.reminders.splice(i, 1);
          $scope.saveReminders();
        }
      }
      console.log($scope.data.overview);
    };

    $scope.saveReminders = function () {
      console.log('Saving ALL reminders.');
      storage.set('module-reminders', $scope.data.overview);
    };


    /*
     *   ----------------
     *   | NEW REMINDER |
     *   ----------------
     */

    $scope.saveReminder = function (view) {

      var reminder, reminders;
      var reminders_data = storage.get('module-reminders');

      switch (view) {
        case 'new':
          console.log('Saving new reminder for ' + $scope.data.new.name);
          reminder = $scope.data.new;
          if($scope.data.overview.reminders.length === 0) {
            reminder.id = 1;
          }
          else {
            var lastId = $scope.data.overview.reminders[($scope.data.overview.reminders.length - 1)].id;
            reminder.id = lastId + 1;
          }
          console.log(reminder);
          reminders_data.reminders.push(reminder);
          break;
        case 'edit':
          console.log('Saving edited reminder for ' + $scope.data.edit.name);
          reminder = $scope.data.edit;
          if ($scope.data.overview.reminders[i].id === reminder.id) {
            $scope.data.overview.reminders[i] = reminder;
          }
          break;
      }

      console.log(reminders_data);
      storage.set('module-reminders', reminders_data);
      $scope.data.overview = reminders_data;
      viewer.goToView($scope, 'views/modules/reminders/overview.html');
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

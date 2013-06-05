'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage) {

    $scope.data = {
      overview: storage.get('module-reminders'),
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
        currentView: 'views/modules/reminders/edit.html',
        history: []
      },
      alarm: false // true for active, false for not active
    };

   /* $scope.checkForReminders = window.setInterval(function () {
      var reminders = $scope.data.overview.reminders;
      var currentTime = moment().unix() * 1000;
      for (var i = 0; i < reminders.length; i++) {
        var alarmTime = moment(reminders[i].datetime).unix() * 1000;
        console.log('Reminder: ' + alarmTime + ' & current: ' + currentTime);
        if(currentTime > alarmTime) {
          $scope.data.overview.reminders[i].alarm = moment(alarmTime + (0.25 * 60 * 1000)).format('MM-DD-YYYY HH:mm:ss'); // 10 = minutes of snooze time
          $scope.showAlarm($scope.data.overview.reminders[i]);
        }
      }
    }, 1000);*/

    $scope.showAlarm = function (reminder) {
      if($scope.alarm) {
        console.log('THIS IS AN ALARM FOR ' + reminder.name);
        $scope.alarm = false;
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
          if ($scope.data.overview.reminders.length === 0) {
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
          // TODO: doesn't sync with storage
          console.log('Saving edited reminder for ' + $scope.data.edit.name);
          reminder = $scope.data.edit;
          for (var i = 0; i < reminders_data.reminders.length; i++) {
            if (reminders_data.reminders[i].id === reminder.id) {
              reminders_data.reminders[i] = reminder;
            }
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

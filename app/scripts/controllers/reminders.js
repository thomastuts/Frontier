'use strict';

angular.module('frontierApp')
  .controller('RemindersCtrl', function ($scope, viewer, ui, storage, utility) {

    $scope.activeAlarm = null;

    $scope.data = {
      overview: storage.get('module-reminders'),
      new: {
        name: '',
        datetime: '',
        description: '',
        location: '',
        note: ''
      },
      edit: {
        name: '',
        datetime: '',
        description: ''
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
        currentView: 'views/modules/reminders/overview.html',
        history: []
      }
    };

    for (var i = 0; i < $scope.data.overview.reminders.length; i++) {
      $scope.data.overview.reminders[i].datetime_human = moment($scope.data.overview.reminders[i].datetime).calendar();
    }

    $scope.setUrgency = window.setInterval(function () {

    }, 1000);

    $scope.snooze = function (reminder) {

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
      if (confirm("Are you sure you want to delete this reminder?")) {
        // console.log('Removing reminder: ' + reminder.name);
        for (var i = 0; i < $scope.data.overview.reminders.length; i++) {
          // TODO: confirmation?
          if ($scope.data.overview.reminders[i].id === reminder.id) {
            $scope.data.overview.reminders.splice(i, 1);
            $scope.saveReminders();
          }
        }
        // console.log($scope.data.overview);
      }
    };

    $scope.saveReminders = function () {
      // console.log('Saving ALL reminders.');
      storage.set('module-reminders', $scope.data.overview);
    };


    /*
     *   ----------------
     *   | NEW REMINDER |
     *   ----------------
     */

    $scope.saveReminder = function (view) {

      // console.log($('#reminder-time').val());
      // console.log($scope.data.new.date + ' ' + $scope.data.new.time);
      $scope.data.new.time = $('#reminder-time').val();

      $scope.data.new.datetime = moment($scope.data.new.date + ' ' + $scope.data.new.time).format();

      var reminder, reminders;

      switch (view) {
        case 'new':
          // console.log('Saving new reminder for ' + $scope.data.new.name);
          reminder = $scope.data.new;
          $scope.data.new.location = $('#reminder-location').val();

          var newLocation = true;

          // Loop through location, if not in array add a new one
          for (var j = 0; j < $scope.data.overview.locations.length; j++) {
            if (utility.checkEqualStrings($scope.data.overview.locations[j], $scope.data.new.location)) {
              newLocation = false;
            }
          }

          if (newLocation) {
            $scope.data.overview.locations.push($scope.data.new.location);
          }

          if ($scope.data.overview.reminders.length === 0) {
            reminder.id = 1;
          }
          else {
            var lastId = $scope.data.overview.reminders[($scope.data.overview.reminders.length - 1)].id;
            reminder.id = lastId + 1;
          }

          $scope.data.new.datetime_human = moment($scope.data.new.datetime).calendar();

          // console.log(reminder);
          $scope.data.overview.reminders.push(reminder);
          break;
        case 'edit':
          // TODO: doesn't sync with storage
          // console.log('Saving edited reminder for ' + $scope.data.edit.name);
          reminder = $scope.data.edit;
          for (var i = 0; i < $scope.data.overview.reminders.length; i++) {
            if ($scope.data.overview.reminders[i].id === reminder.id) {
              $scope.data.overview.reminders[i] = reminder;
            }
          }
          break;
      }

      // console.log($scope.data.overview);
      storage.set('module-reminders', $scope.data.overview);
      viewer.goToView($scope, 'views/modules/reminders/overview.html');
    };

    /*
     *   -----------------
     *   | EDIT REMINDER |
     *   -----------------
     */

    $scope.editReminder = function (reminder) {
      viewer.goToView($scope, 'views/modules/reminders/edit.html', 'edit');
      // console.log('Editing reminder ' + reminder.name);
      $scope.data.edit = reminder;
    };


  });

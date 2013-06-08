'use strict';

angular.module('frontierApp')
  .controller('LocalStorageCtrl', function ($scope, storage, utility) {

    $scope.module = {
      meta   : {
        version: '0.1',
        name   : 'localstorage'
      },
      menubar: {
        title: 'localStorage',
        icon : 'icon-cogs'
      },
      views  : {
        currentView : 'views/modules/localstorage/overview.html',
        previousView: null
      }
    };

    $scope.storages = ['module-scratchpad', 'module-github', 'module-api', 'module-reminders', 'module-inspiration', 'module-todos'];

    $scope.loadStorage = function () {
      var storageName = $('#select-storage').val();
      $('#storage-name').val(storageName);
      console.log(storageName);
      var content = storage.export(storageName);
      console.log(content);
      $('#storage-content').val(content);
    };


    $scope.saveStorage = function () {
      var name = $('#storage-name').val();
      var content = utility.removeLineBreaks($('#storage-content').val());
      console.log(name);
      console.log(content);
      storage.import(name, content);
    }
  });

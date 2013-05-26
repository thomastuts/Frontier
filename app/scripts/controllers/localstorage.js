'use strict';

angular.module('frontierApp')
  .controller('LocalStorageCtrl', function ($scope, storage) {

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'localstorage'
      },
      menubar: {
        title: 'localStorage',
        icon: 'icon-cogs'
      },
      views: {
        currentView: 'views/modules/localstorage/overview.html',
        previousView: null
      }
    };

    $scope.localStorage = JSON.stringify(storage.get(), null, 2);

    $scope.saveStorage = function () {
      var textStorage = $('#localStorage').html();
      storage.import(textStorage);
    }
  });

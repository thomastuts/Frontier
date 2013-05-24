'use strict';

angular.module('frontierApp')
  .controller('LocalStorageCtrl', function ($scope, storageService) {

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'localstorage'
      },
      menubar: {
        title: 'localStorage',
        icon: 'icon-cogs'
      },
      view: 'views/modules/localstorage/overview.html'
    };

    $scope.localStorage = JSON.stringify(storageService.get(), null, 2);

    $scope.saveStorage = function () {
      var textStorage = $('#localStorage').html();
      storageService.import(textStorage);
    }
  });

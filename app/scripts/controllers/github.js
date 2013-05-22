'use strict';

angular.module('frontierApp')
  .controller('GithubCtrl', function ($scope, storageService) {
    $scope.module = {
      meta: {
        version: '0.1',
        name: 'github'
      },
      menubar: {
        title: 'Github',
        icon: 'icon-github'
      },
      view: 'views/modules/github/overview.html'
    };

    console.log(storageService.export());
  });

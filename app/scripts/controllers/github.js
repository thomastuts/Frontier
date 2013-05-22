'use strict';

angular.module('frontierApp')
  .controller('GithubCtrl', function ($scope, Data) {
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

    Data.loadData().then(function(data) {
      $scope.module.data = data.data.modules.github;
      console.log($scope.module);
    });
  });

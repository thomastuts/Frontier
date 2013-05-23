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
      view: 'views/modules/github/overview.html',
      config: {
        apis: {
          user: 'https://api.github.com/users/'
        }
      }
    };

    var api_user = $scope.module.config.apis.user + 'thomastuts';
    $.get(api_user, function (data) {
      $scope.$apply(function () {
        $scope.user = data;
        console.log(data);
      });
    });

    var api_repos = $scope.module.config.apis.user + 'thomastuts' + '/repos';
    $.get(api_repos, function (data) {
      $scope.$apply(function () {
        $scope.repos = data;
        console.log(data);
      });
    });

  });

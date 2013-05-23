'use strict';

/**
 * SCRATCHPAD
 *
 * - possibility to mark repos as favorites?
 */

angular.module('frontierApp')
  .controller('GithubCtrl', function ($scope, storageService) {

    var username = storageService.get().data.modules.github.username;
    console.log(username);

    // instantiate scope view containers

    $scope.overview = {};
    $scope.showRepo = {};

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
          user: 'https://api.github.com/users/' + username,
          repos: 'https://api.github.com/users/' + username + '/repos',
          repo: 'https://api.github.com/repos/' + username + '/'
        }
      }
    };

    var api_user = $scope.module.config.apis.user;
    $.get(api_user, function (data) {
      $scope.$apply(function () {
        $scope.overview.user = data;
        console.log(data);
      });
    });

    var api_repos = $scope.module.config.apis.repos;
    $.get(api_repos, function (data) {
      $scope.$apply(function () {
        $scope.overview.repos = data;
        console.log(data);
      });
    });

    $scope.showRepo = function (repo) {
      console.log("Showing repo: " + repo);
      var api_repo = $scope.module.config.apis.repo + repo;
      $.get(api_repo, function (data) {
        $scope.$apply(function () {
          $scope.repo = data;
          console.log(data);
        });
      });
    };

  });

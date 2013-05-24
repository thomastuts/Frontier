'use strict';

/**
 * SCRATCHPAD
 *
 * - possibility to mark repos as favorites?
 */

angular.module('frontierApp')
  .controller('GithubCtrl', function ($scope, storageService, viewer) {

    var username = storageService.get().data.modules.github.username;
    console.log(username);

    // instantiate scope view containers

    $scope.data = {
      overview: {},
      repo: {}
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'github'
      },
      menubar: {
        title: 'Github',
        icon: 'icon-github'
      },
      views: {
        currentView: 'views/modules/github/overview.html',
        previousView: null
      },
      config: {
        apis: {
          user: 'https://api.github.com/users/' + username,
          repos: 'https://api.github.com/users/' + username + '/repos',
          repo: 'https://api.github.com/repos/' + username + '/'
        }
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    var api_user = $scope.module.config.apis.user;
    $.get(api_user, function (data) {
      $scope.$apply(function () {
        $scope.data.overview.user = data;
        console.log(data);
      });
    });

    var api_repos = $scope.module.config.apis.repos;
    $.get(api_repos, function (data) {
      $scope.$apply(function () {
        $scope.data.overview.repos = data;
        console.log(data);
      });
    });

    $scope.showRepo = function (repo) {
      console.log("Showing repo: " + repo);

      viewer.goToView($scope, 'views/modules/github/repo.html', 'repo');

      var api_repo = $scope.module.config.apis.repo + repo;
      $.get(api_repo, function (data) {
        $scope.$apply(function () {
          $scope.data.repo = data;
          console.log(data);
        });
      });
    };

  });

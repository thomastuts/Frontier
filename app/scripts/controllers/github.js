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
      if ($scope.module.views.previousView != null) {
        var temp = $scope.module.views.previousView;
        $scope.module.views.previousView = $scope.module.views.currentView;
        $scope.module.views.currentView = temp;
        console.log("Going back.");
      }
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

    $scope.goToView = function (view, dataContainer) {
      console.log("Switching page to " + view + " with dataContainer " + dataContainer);

      if (dataContainer) {
        // clear data to prevent old data being showed while new one is loading
        $scope.data[dataContainer] = {};
      }

      $scope.module.views.previousView = $scope.module.views.currentView;
      $scope.module.views.currentView = view;
    };

    $scope.showRepo = function (repo) {
      console.log("Showing repo: " + repo);

      $scope.goToView('views/modules/github/repo.html', 'repo');

      var api_repo = $scope.module.config.apis.repo + repo;
      $.get(api_repo, function (data) {
        $scope.$apply(function () {
          $scope.data.repo = data;
          console.log(data);
        });
      });
    };

  });

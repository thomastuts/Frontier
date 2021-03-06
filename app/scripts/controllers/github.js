'use strict';

/**
 * SCRATCHPAD
 *
 * - possibility to mark repos as favorites?
 */

angular.module('frontierApp')
  .controller('GithubCtrl', function ($scope, storage, viewer, ui) {

    var username = storage.get('module-github').username;

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
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/github/overview.html',
        history: []
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

    $scope.toggle = function () {
        ui.toggle($scope.module);
    };

    $scope.getData = function () {
      var api_user = $scope.module.config.apis.user;
      $.get(api_user, function (data) {
        $scope.$apply(function () {
          $scope.data.overview.user = data;
          // console.log(data);
        });
      });

      var api_repos = $scope.module.config.apis.repos;
      $.get(api_repos, function (data) {
        $scope.$apply(function () {
          $scope.data.overview.repos = data;
          // console.log(data);
        });
      });
    };

    $scope.getData();

    /*
    *   ------------
    *   | OVERVIEW |
    *   ------------
    */



    /*
     *   --------
     *   | REPO |
     *   --------
     */

    $scope.showRepo = function (repo) {
      viewer.goToView($scope, 'views/modules/github/repo.html', 'repo');

      var api_repo = $scope.module.config.apis.repo + repo;
      $.get(api_repo, function (data) {
        $scope.$apply(function () {
          $scope.data.repo = data;
          $scope.data.repo.updated_at = moment($scope.data.repo.updated_at).format(storage.get('config').general.datetime_format);
        });
        console.log("\n--REPO--\n");
        console.log(data);
        $.get(data.commits_url.substring(0, data.commits_url.length - 6), function (commits) {
          console.log("\n--COMMITS--\n");
          console.log(commits);
          $scope.$apply(function(){
              $scope.data.repo.commits = commits;
            $scope.data.repo.commits_url = $scope.data.repo.commits_url.substring(0, $scope.data.repo.commits_url.length - 6) + '/';
              for(var i = 0; i < $scope.data.repo.commits.length; i++)
              {
                $scope.data.repo.commits[i].sha_short = $scope.data.repo.commits[i].sha.substring(10, -1);
              }
          });
        });
        $.get(data.issues_url.substring(0, data.commits_url.length - 7), function (issues) {
          console.log("\n--ISSUES--\n");
          console.log(issues);
          $scope.$apply(function(){
              $scope.data.repo.issues = issues;
          });
        });
      });
    };

  });

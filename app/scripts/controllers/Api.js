'use strict';

angular.module('frontierApp')
  .controller('ApiCtrl', function ($scope, storage, viewer, ui, $http) {

    $scope.data = {
      explorer: null
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'api'
      },
      menubar: {
        title: 'JSON API explorer',
        icon: 'icon-sitemap'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/api/explorer.html',
        history: []
      }
    };

    $scope.goBack = function () {
      // TODO: go back to previous API call
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $scope.exploreApi = function () {
      $scope.url = $('#api-url').val();

      console.log($scope.url);

      $.get($scope.url, function (data) {
        $scope.$apply(function () {
          $scope.data.explorer = JSON.stringify(data, null, 4);
          console.log($scope.data.explorer);
        });
      });
    };

    $scope.parseForLinks = function (data) {
      //get the string
      //create good link matching regexp
      var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/g
      // $1 is the found URL in the text
      // str.replace replaces the found url with <a href='THE URL'>THE URL</a>
      var replaced_text = data.replace(regex, "<a href='$1'>$1</a>")
      //replace the contents
      return replaced_text;
    };

  });
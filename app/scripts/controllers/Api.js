'use strict';

angular.module('frontierApp')
  .controller('ApiCtrl', function ($scope, storage, viewer, ui, utility) {

    $(document).on("click", ".api-link", function () {
      var url = $(this).attr('data-link');
      console.log(url);
      $('#api-url').val(url);
      $scope.exploreApi(url);
    });

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

    $scope.exploreApi = function (url) {
      if (url) {
        console.log('Exploring ' + url);
        $scope.url = url;
        $.get($scope.url, function (data) {
          $scope.$apply(function () {
            data = JSON.stringify(data, null, 4);
            $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
            console.log($scope.data.explorer);
            $('.code').html($scope.data.explorer);
          });
        });
      }
      else {
        $scope.url = $('#api-url').val();

        console.log($scope.url);

        $.get($scope.url, function (data) {
          $scope.$apply(function () {
            data = JSON.stringify(data, null, 4);
            $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
            console.log($scope.data.explorer);
            $('.code').html($scope.data.explorer);
          });
        });
      }

    };

  });
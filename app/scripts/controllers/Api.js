'use strict';

angular.module('frontierApp')
  .controller('ApiCtrl', function ($scope, storage, viewer, ui, utility) {

    $scope.data = {
      explorer: null,
      collections: storage.get('module-api').collections
    };

    $scope.selectedCollection = null;

    $scope.url = 'https://api.github.com/users/thomastuts'; // TODO: remember last request

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
      },
      methods: {
        currentMethod: 'GET',
        availableMethods: ['GET', 'POST']
      },
      getParameters: [
        {
          key: "test",
          value: "valuetest"
        }
      ]
    };

    $scope.goBack = function () {
      // TODO: go back to previous API call
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $(document).on("click", ".api-link", function () {
      var url = $(this).attr('data-link');
      console.log(url);
      // $('#api-url').val(url);
      $scope.url = url;
      $scope.exploreApi(url);z
    });

    $(document).on("change", "#api-method", function () {
      var method = $(this).val();
      $scope.$apply(function(){
          $scope.module.methods.currentMethod = method;
      });
    });

    $scope.exploreApi = function (url) {
      viewer.goToView($scope, 'views/modules/api/explorer.html');
      // inline JSON explore
      if (url) {
        console.log('Exploring ' + url);
        $scope.url = url;
        $.get($scope.url, function (data) {
          $scope.$apply(function () {
            data = JSON.stringify(data, null, 4);
            $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
            console.log($scope.data.explorer);
            $('.api .code').html($scope.data.explorer);
          });
        });
      }

      else {

        // API exploration by given URL (input)
        switch($scope.module.methods.currentMethod) {
          case 'GET':
            console.log($scope.url);

            $.get($scope.url, function (data) {
              $scope.$apply(function () {
                data = JSON.stringify(data, null, 4);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
                console.log($scope.data.explorer);
                $('.api .code').html($scope.data.explorer);
              });
            });
            break;
          case 'POST':
            // TODO: perform post
            console.log('Performing POST');
        }
      }

    };

    $scope.clearData = function () {
      $scope.data.explorer = null;
      $('.api .code').html('');
    };

    $scope.showCollections = function () {
      viewer.goToView($scope, 'views/modules/api/collections.html');
    }

  });
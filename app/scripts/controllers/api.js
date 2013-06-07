'use strict';

angular.module('frontierApp')
  .controller('ApiCtrl', function ($scope, storage, viewer, ui, utility) {

    $scope.data = {
      explorer: null,
      collections: storage.get('module-api').collections
    };

    $scope.selectedCollection = null;

    $scope.url = 'https://api.github.com/rate_limit'; // TODO: remember last request

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
        currentMethod: 'POST',
        availableMethods: ['GET', 'POST']
      },
      postParameters: [],
      apiHistory: []
    };

    $scope.toggleActions = function () {
      viewer.toggleActions('api');
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $(document).on("click", ".api-link", function () {
      var url = $(this).attr('data-link');
      console.log(url);
      // $('#api-url').val(url);
      $scope.url = url;
      $scope.exploreApi(url);
    });

    $(document).on("change", "#api-method", function () {
      var method = $(this).val();
      $scope.$apply(function () {
        $scope.module.methods.currentMethod = method;
      });
    });

    $scope.addPostParameter = function () {
      var htmlString = '<tr> <td> <input type="text" class="post-key"/> </td> <td> <input type="text" class="post-value"/> </td> </tr>';
      $('.api table tbody').append(htmlString);
    };

    $scope.exploreApi = function (method, url) {
      viewer.goToView($scope, 'views/modules/api/explorer.html');

      switch (method) {
        case 'GET':
          // inline JSON explore
          if (url) {
            console.log('Exploring ' + url);
            $scope.url = url;
            $.get($scope.url, function (data) {
              $scope.$apply(function () {
                data = JSON.stringify(data, null, 4);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
//            console.log($scope.data.explorer);
                $('.api .code').html($scope.data.explorer);
              });
            });
          }

          else {

            $scope.url = $('#api-url').val();

            // API exploration by given URL (input)
            switch ($scope.module.methods.currentMethod) {
              case 'GET':

                console.log($scope.url);

                $.get($scope.url, function (data) {
                  $scope.$apply(function () {
                    data = JSON.stringify(data, null, 4);
                    $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
//                console.log($scope.data.explorer);
                    $('.api .code').html($scope.data.explorer);
                  });
                });
                break;
              case 'POST':
                // TODO: perform post
                console.log('Performing POST');
            }
          }
          break;
        case 'POST':
          $scope.url = $('#api-url').val();

          var postData = {};

          // loop through all parameters and set them in the postData object
          for (var i = 0; i < $('.post-key').length; i++) {
            // only set parameter if the key isn't empty
            if ($('.post-key').eq(i).val() !== "") {
              postData[$('.post-key').eq(i).val()] = $('.post-value').eq(i).val();
            }
          }

          console.log(postData);


          console.log($scope.url);
          $.post($scope.url, postData)
            .done(function (data) {
              $scope.apply(function () {
                data = JSON.stringify(data, null, 4);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
                $('.api .code').html($scope.data.explorer);
              })
            })
            .fail(function (data) {
              data = JSON.stringify(data, null, 4);
              $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
              $('.api .code').html($scope.data.explorer);
            });
      }


      $scope.module.apiHistory.push($scope.url);

    };

    $scope.previousApiCall = function () {
      if ($scope.module.apiHistory.length > 0) {
        if ($scope.module.apiHistory.length === 1) {
          $scope.exploreApi($scope.module.apiHistory[($scope.module.apiHistory.length - 1 )]);
        }
        else {
          $scope.exploreApi($scope.module.apiHistory[($scope.module.apiHistory.length - 2 )]);
        }
      }
    };

    $scope.testje = function () {
      console.log('TEEEESTTTTT');
    };

    $scope.clearData = function () {
      $scope.data.explorer = null;
      $('.api .code').html('');
    };

    $scope.showCollections = function () {
      viewer.goToView($scope, 'views/modules/api/collections.html');
    }

  });
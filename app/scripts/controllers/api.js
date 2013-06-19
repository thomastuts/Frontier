'use strict';

angular.module('frontierApp')
  .controller('ApiCtrl', function ($scope, storage, viewer, ui, utility) {

    $scope.tempData = {
      newLink: {},
      editLink: {}
    };

    $scope.data = {
      explorer: null,
      collections: storage.get('module-api'),
      new: {},
      newLink: {},
      editLink: {}
    };

    $scope.selectedCollection = null;

//    $scope.url = 'https://api.github.com/users/' + storage.get('module-github').username; // TODO: remember last request
    $scope.url = 'http://localhost/ads/api/index.php/users';

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
        currentMethod: {
          type: 'GET',
          data: {}
        },
        availableMethods: ['GET', 'POST']
      },
      postParameters: [
        {
          key: '',
          value: ''
        }
      ],
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
      var extension = utility.getExtension(url);
      // if the url is an image, open it in a new window
      if (extension === '.png' || extension === '.jpeg' || extension === '.jpg' || extension === '.gif') {
        window.open(url);
      }
      else {
        console.log(url);
        $scope.url = url;
        $scope.exploreApi('GET', url);
      }
    });

    $(document).on("click", ".post-remove", function (e) {
      var row = e.currentTarget.parentNode.parentNode;
      $(row).remove();
    });

    $(document).on("change", "#api-method", function () {
      var method = $(this).val();
      $scope.$apply(function () {
        $scope.module.methods.currentMethod.type = method;
      });
    });

    $scope.addPostParameter = function () {
      $scope.module.postParameters.push({
        key: '',
        value: ''
      });
      /*var htmlString = '<tr> <td> <input type="text" class="post-key"/> </td> <td> <input type="text" class="post-value"/> </td> </tr>';
      $('.api table tbody').append(htmlString);*/
    };

    $scope.debug = function () {
      console.log($scope.module.postParameters);
    };

    $scope.addToCollection = function () {
      // TODO: save parameters
      var url = $('#api-url').val();
      if (url !== '') {
        // loop through collections until you find the one with the right id
        var collectionId = parseInt(($('#collections-dropdown').val()));
        var api_call = {
          name: url,
          url: url,
          method: {
            type: $scope.module.methods.currentMethod
          }
        };

        for (var i = 0; i < $scope.data.collections.collections.length; i++) {
          if ($scope.data.collections.collections[i].id === collectionId) {
            $scope.data.collections.collections[i].api_calls.push(api_call);
            break;
          }
        }

        storage.set('module-api', $scope.data.collections);
      }
    };

    $scope.showNewLink = function (collection) {
      console.log(collection);
      $scope.data.newLink = collection;
      viewer.goToView($scope, 'views/modules/api/newlink.html');
    };

    $scope.showEditLink = function (collection, link, $index) {
      console.log(collection);
      $scope.data.editLink = collection;
      $scope.tempData.editLink = link;
      viewer.goToView($scope, 'views/modules/api/editlink.html');
    };

    $scope.saveEditedCollection = function () {
      console.log($scope.data.edit);
      for (var i = 0; i < $scope.data.collections.collections.length; i++) {
        if ($scope.data.collections.collections[i].id === $scope.data.edit.id) {
          $scope.data.collections.collections[i] = $scope.data.edit;
          storage.set('module-api', $scope.data.collections);
          viewer.goToView($scope, 'views/modules/api/collections.html');
          break;
        }
      }
    };

    $scope.exploreApi = function (method, url, postData) {

      viewer.goToView($scope, 'views/modules/api/explorer.html');

      if (!method) {
        method = 'GET';
      }

      switch (method) {
        case 'GET':
          // inline JSON explore

          $scope.module.methods.currentMethod.type = 'GET';
          $scope.module.methods.currentMethod.data = {};

          if (url) {
            console.log('Exploring ' + url);
            $scope.url = url;
            $.get($scope.url, function (data) {
              $scope.$apply(function () {
                data = JSON.stringify(data, null, 4);
                $scope.module.apiHistory.push(data);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
//            console.log($scope.data.explorer);
                $('.api .code').html($scope.data.explorer);
              });
            });
          }

          else {
            console.log($scope.url);
            url = $('#api-url').val();
            $scope.url = url;

            $.get(url, function (data) {

              $scope.$apply(function () {
                data = JSON.stringify(data, null, 4);
                $scope.module.apiHistory.push(data);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
//                console.log($scope.data.explorer);
                $('.api .code').html($scope.data.explorer);
              });
            });
          }
          break;
        case 'POST':
          if (!url) {
            url = $('#api-url').val();
          }

          if (!postData) {
            postData = {};
            for (var j = 0; j < $scope.module.postParameters.length; j++) {
              var key = $scope.module.postParameters[j].key;
              var value = $scope.module.postParameters[j].value;
              if (!isNaN(parseInt(value))) {
                value = parseInt(value);
              }
              // only set parameter if the key isn't empty
              if (key !== "") {
                postData[key] = value;
              }
            }
          }

          $scope.url = url;


            $.post(url, postData)
            .done(function (data) {
                console.log(data);
                data = JSON.stringify(data, null, 4);
                $scope.module.apiHistory.push(data);
                $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
                $('.api .code').html($scope.data.explorer);
            })
            .fail(function (data) {
              data = JSON.stringify(data, null, 4);
              $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
              $('.api .code').html($scope.data.explorer);
            });

          $scope.module.methods.currentMethod = {
            type: 'POST',
            data: postData
          };

          break;
      }

      $('#api-method').val(method);



    };

    $scope.previousApiCall = function () {
      if ($scope.module.apiHistory.length > 0) {

        var data;

        if ($scope.module.apiHistory.length === 1) {
          data = $scope.module.apiHistory[($scope.module.apiHistory.length - 1 )];
        }
        else {
          data = $scope.module.apiHistory[($scope.module.apiHistory.length - 2 )];
        }

        $scope.module.apiHistory.pop();

//        data = JSON.stringify(data, null, 4);
        $scope.data.explorer = utility.replaceURLWithHTMLLinks(data);
        $('.api .code').html($scope.data.explorer);
      }
    };

    $scope.removeCollection = function (collection) {
      if (confirm("Are you sure you want to delete this collection?")) {
        for (var i = 0; i < $scope.data.collections.collections.length; i++) {
          if ($scope.data.collections.collections[i].id === collection.id) {
            $scope.data.collections.collections.splice(i, 1);
            storage.set('module-api', $scope.data.collections);
            break;
          }
        }
      }
    };

    $scope.editCollection = function (collection) {
      $scope.data.edit = collection;
      viewer.goToView($scope, 'views/modules/api/edit.html');
    };

    $scope.removeLink = function ($event, collection, $index) {
      $event.stopPropagation();
      console.log('Removing a link');
      console.log(collection);
      if (confirm("Are you sure you want to delete this link?")) {
        for (var i = 0; i < $scope.data.collections.collections.length; i++) {
          if ($scope.data.collections.collections[i].id === collection.id) {
            $scope.data.collections.collections[i].api_calls.splice($index, 1);
            storage.set('module-api', $scope.data.collections);
            break;
          }
        }
      }
    };

    $scope.removePostParameter = function (index) {

      if($scope.module.postParameters.length === 1) {
        $scope.module.postParameters[0] = {
          key: '',
          value: ''
        }
      }
      else {
        $scope.module.postParameters.splice(index, 1);
      }
    };

    $scope.clearData = function () {
      $scope.data.explorer = null;
      $('.api .code').html('');
    };

    $scope.showCollections = function () {
      viewer.goToView($scope, 'views/modules/api/collections.html');
    };

    $scope.showNew = function () {
      viewer.goToView($scope, 'views/modules/api/new.html');
    };

    $scope.saveNew = function () {
      console.log($scope.data.new);
      $scope.data.new.api_calls = [];

      var collectionId;

      if ($scope.data.collections.collections.length === 0) {
        collectionId = 1;
      }
      else {
        collectionId = ($scope.data.collections.collections[$scope.data.collections.collections.length - 1].id) + 1;
      }

      $scope.data.new.id = collectionId;

      $scope.data.collections.collections.push($scope.data.new);
      storage.set('module-api', $scope.data.collections);
      viewer.goToView($scope, 'views/modules/api/collections.html', 'new');
    };

    $scope.addNewLink = function () {
      var method = $('#api-method').val();

      switch (method) {
        case 'GET':
          $scope.tempData.newLink.method = {
            type: method
          };
          break;
        case 'POST':
          var postData = {};

          // loop through all parameters and set them in the postData object
          for (var j = 0; j < $scope.module.postParameters.length; j++) {
            var key = $scope.module.postParameters[i].key;
            var value = $scope.module.postParameters[i].value;
            if (!isNaN(parseInt(value))) {
              value = parseInt(value);
            }
            // only set parameter if the key isn't empty
            if (key !== "") {
              postData[key] = value;
            }
          }
          $scope.tempData.newLink.method = {
            type: method,
            data: postData
          };
          break;
      }

      $scope.data.newLink.api_calls.push($scope.tempData.newLink);

      for (var k = 0; k < $scope.data.collections.collections.length; k++) {
        if ($scope.data.collections.collections[k].id === $scope.data.newLink.id) {
          $scope.data.collections.collections[k] = $scope.data.newLink;

          // clear data container
          $scope.tempData.newLink = {};

          // persist data
          storage.set('module-api', $scope.data.collections);
          viewer.goToView($scope, 'views/modules/api/collections.html');
          break;
        }
      }

      console.log($scope.tempData.newLink);
    };

    $scope.showAddToCurrent = function () {
      $('#addToExistingCollection').fadeToggle();
    };

  });
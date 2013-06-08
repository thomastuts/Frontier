'use strict';

angular.module('frontierApp')
  .controller('ScratchpadCtrl', function ($scope, storage, viewer, ui) {

    $scope.data = {
      overview: storage.get('module-scratchpad'),
      new: {
        name: '',
        description: '',
        date_created: '',
        content: ''
      },
      snippet: {}
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'scratchpad'
      },
      menubar: {
        title: 'Scratchpad',
        icon: 'icon-lightbulb'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/scratchpad/overview.html',
        history: []
      }
    };

    console.log($scope.data.overview);

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggleActions = function () {
      viewer.toggleActions('scratchpad');
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $scope.showNew = function () {
      viewer.goToView($scope, 'views/modules/scratchpad/new.html', 'new');
    };

    $scope.addNewSnippet = function () {
      var snippet = $('#scratchpad-editor').val();
      console.log(snippet);

      var snippetId;

      if ($scope.data.overview.snippets.length === 0) {
        snippetId = 1;
      }
      else {
        snippetId = ($scope.data.overview.snippets[$scope.data.overview.snippets.length - 1].id) + 1;
      }

      $scope.data.new.id = snippetId;

      $scope.data.new.content = snippet;
      $scope.data.new.created_at = moment().format();


      $scope.data.overview.snippets.push($scope.data.new);
      storage.set('module-scratchpad', $scope.data.overview);
      console.log($scope.data.new);
      viewer.goToView($scope, 'views/modules/scratchpad/overview.html', 'new');
    };

    $scope.showSnippet = function (snippet) {
      $scope.data.snippet = snippet;
      viewer.goToView($scope, 'views/modules/scratchpad/snippet.html');
    };



  });

'use strict';

angular.module('frontierApp')
  .controller('InspirationCtrl', function ($scope, storage, viewer, ui) {

    $scope.data = {
      overview: storage.get('module-inspiration'),
      new: {
        name: '',
        description: '',
        date_created: '',
        date_updated: '',
        shots: []
      }
    };

    $scope.module = {
      meta: {
        version: '0.1',
        name: 'inspiration'
      },
      menubar: {
        title: 'Inspiration',
        icon: 'icon-picture'
      },
      ui: {
        open: true // true for full window, false for minimized version
      },
      views: {
        currentView: 'views/modules/inspiration/overview.html',
        history: []
      }
    };

    $scope.goBack = function () {
      viewer.goBack($scope);
    };

    $scope.toggleActions = function () {
      viewer.toggleActions('inspiration');
    };

    $scope.toggle = function () {
      ui.toggle($scope.module);
    };

    $scope.showView = function (view) {
      viewer.goToView($scope, 'views/modules/inspiration/' + view + '.html');
    };

    $scope.showEdit = function (inspirationset) {
      viewer.goToView($scope, 'views/modules/inspiration/edit.html');
      $scope.data.edit = inspirationset;
      console.log(inspirationset);
    };

    $scope.showSlider = function (id) {
      $('#carousel-' + id).toggle();
      $('#slider-' + id).toggle();

      $('#carousel-' + id).flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider-' + id
      });

      $('#slider-' + id).flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel-" + id
      });
    };

    /*
     *   ------------
     *   | OVERVIEW |
     *   ------------
     */

    /*
     *   -------
     *   | NEW |
     *   -------
     */

    // todo: make more userfriendly by adding a new input box on keydown of the previous one
    // (check if there isn't one present, otherwise each keystroke will generate a new input)
    $scope.addShot = function () {
      $('.inspiration .shots').append('<input type="text" class="inspiration-shot"/> <br>');
    };

    $scope.addSet = function () {
      var description = $('#inspiration-description').val();
      var shots = [];
      for(var i = 0; i < $('.inspiration-shot').length; i++)
      {
        shots.push($('.inspiration-shot').eq(i).val());
      }
      $scope.data.new.description = description;
      $scope.data.new.date_created = moment().format();
      $scope.data.new.shots = shots;

      // sync data locally and to storage
      $scope.data.overview.sets.push($scope.data.new);
      storage.set('module-inspiration', $scope.data.overview);

      viewer.goToView($scope, 'views/modules/inspiration/overview.html', 'new'); // last parameter 'new' is passed to viewer function to clear the data container
    };





  });

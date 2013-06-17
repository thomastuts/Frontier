'use strict';

angular.module('frontierApp')
  .controller('InspirationCtrl', function ($scope, storage, viewer, ui, utility) {

    $scope.tempData = {
      addNewLink: {
        image: ''
      }
    };

    $scope.data = {
      overview: storage.get('module-inspiration'),
      new: {
        name: '',
        description: '',
        date_created: '',
        date_updated: '',
        shots: []
      },
      addNewLink: {}
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

    $scope.showAddNewLink = function (set) {
      $scope.data.addNewLink = set;
      viewer.goToView($scope, 'views/modules/inspiration/addnewlink.html');
    };

    $scope.removeFromSet = function (shot) {
      console.log('Removing from set:');
      console.log(shot);
      if (confirm("Are you sure you want to delete this shot?")) {
        $scope.data.edit.shots.splice(shot, 1);
      }
    };

    $scope.saveEdit = function () {
      for (var i = 0; i < $scope.data.overview.sets.length; i++) {
        if ($scope.data.overview.sets[i].id === $scope.data.edit.id) {
          $scope.data.overview.sets[i] = $scope.data.edit;
          storage.set('module-inspiration', $scope.data.overview);
          $scope.showView('overview');
          break;
        }
      }
    };

    $scope.removeSet = function () {
      if (confirm("Are you sure you want to delete this set?")) {
        for (var i = 0; i < $scope.data.overview.sets.length; i++) {
          if ($scope.data.overview.sets[i].id === $scope.data.edit.id) {
            $scope.data.overview.sets.splice(i, 1);
            storage.set('module-inspiration', $scope.data.overview);
            $scope.showView('overview');
            break;
          }
        }
      }
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

    $scope.uploadFile = function () {
      $scope.data.new.id = $scope.data.overview.sets.length + 1;

      $.ajaxFileUpload
      (
        {
          url: 'php/upload.php',
          secureuri: false,
          fileElementId: 'fileToUpload',
          dataType: 'json',
          data: {id: $scope.data.new.id},
          success: function (data, status) {
            if (typeof(data.error) != 'undefined') {
              if (data.error != '') {
                alert(data.error);
              } else {
                $('#inspiration-shots-uploaded').append('<li>' + data.msg + '</li>');
              }
            }
          },
          error: function (data, status, e) {
            alert(e);
          }
        }
      )
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

    $scope.addSet = function () {
      var description = $('#inspiration-description').val();
      var shots = [];
      $scope.data.new.id = $scope.data.overview.sets.length + 1;

      var uploadedShots = $('#inspiration-shots-uploaded li');

      for (var j = 0; j < uploadedShots.length; j++) {
        shots.push('data/uploads/inspiration/' + $('#inspiration-shots-uploaded li').eq(j).html());
      }

      var inputShots = $('#inspiration-shots').val();
      if (inputShots !== '') {
        inputShots = utility.separateNewlines(inputShots);
      }

      // split all URLs
      for(var i = 0; i < inputShots.length; i++)
      {
        if (inputShots[i] === "") {
          inputShots.splice(i, 1);
        }
      }

      if (inputShots.length > 0) {
        $.post('php/save_to_local.php', { images: inputShots, id: $scope.data.new.id })
          .done(function(data) {
            // use PHP response to push the links into the shots array
            shots = shots.concat(JSON.parse(data));
            $scope.data.new.description = description;
            $scope.data.new.date_created = moment().format();
            $scope.data.new.shots = shots;

            console.log($scope.data.new);

            // sync data locally and to storage
            $scope.data.overview.sets.push($scope.data.new);
            storage.set('module-inspiration', $scope.data.overview);
            console.log($scope.data.overview);

            viewer.goToView($scope, 'views/modules/inspiration/overview.html', 'new'); // last parameter 'new' is passed to viewer function to clear the data container
          });
      }
      else {
        $scope.data.new.description = description;
        $scope.data.new.date_created = moment().format();
        $scope.data.new.shots = shots;

        console.log($scope.data.new);

        // sync data locally and to storage
        $scope.data.overview.sets.push($scope.data.new);
        storage.set('module-inspiration', $scope.data.overview);
        console.log($scope.data.overview);

        viewer.goToView($scope, 'views/modules/inspiration/overview.html', 'new'); // last parameter 'new' is passed to viewer function to clear the data container
      }

      // send URLs to PHP service to save files locally



    };

    $scope.addLinkToExistingSet = function () {
      var image = $scope.tempData.addNewLink.image;
      $scope.data.addNewLink.shots.push(image);
      for(var i = 0; i < $scope.data.overview.sets.length; i++)
      {
        if ($scope.data.overview.sets[i].id === $scope.data.addNewLink.id) {
          $scope.data.overview.sets[i] = $scope.data.addNewLink;
          storage.set('module-inspiration', $scope.data.overview);
          viewer.goToView($scope, 'views/modules/inspiration/overview.html', 'addNewLink');
          break;
        }
      }
    };
  });

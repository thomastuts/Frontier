'use strict';

angular.module('frontierApp')
  .factory('viewer', function () {

    return {
      goBack: function ($scope) {
        if ($scope.module.views.previousView != null) {
          var temp = $scope.module.views.previousView;
          $scope.module.views.previousView = $scope.module.views.currentView;
          $scope.module.views.currentView = temp;
          console.log("Going back.");
        }
      },
      goToView: function ($scope, view, dataContainer) {
        console.log("Switching page to " + view + " with dataContainer " + dataContainer);

        if (dataContainer) {
          // clear data to prevent old data being showed while new one is loading
          $scope.data[dataContainer] = {};
        }

        $scope.module.views.previousView = $scope.module.views.currentView;
        $scope.module.views.currentView = view;
      }
    };
  });

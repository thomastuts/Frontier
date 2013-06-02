'use strict';

angular.module('frontierApp')
  .factory('viewer', function () {

    return {
      toggleActions: function (module) {
        $('.' + module + ' .actions').toggle();
      },
      goBack: function ($scope) {
        var history = $scope.module.views.history;
        if (history.length != 0) {
          // set current view to the last item in the history stack
          $scope.module.views.currentView = history[history.length - 1];

          // remove last item in history since it's the current view now
          $scope.module.views.history.splice((history.length - 1), 1);
        }
        else {
          console.warn('No previous view detected');
        }
      },
      goToView: function ($scope, view, dataContainer) {
        if (dataContainer) {
          // clear data to prevent old data being showed while new one is loading
          $scope.data[dataContainer] = {};
        }

        // push current view on history stack
        $scope.module.views.history.push($scope.module.views.currentView);

        // set current view to the view passed to the viewer function
        $scope.module.views.currentView = view;
      }
    };
  });

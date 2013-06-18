'use strict';

angular.module('frontierApp')
  .factory('dashboard', function () {

    var dashboardLeft = JSON.parse(localStorage.getItem('ft-config')).dashboard.left;
    var dashboardRight = JSON.parse(localStorage.getItem('ft-config')).dashboard.right;

    return {
      render: function () {
        var selector;
        for (var i = 0; i < dashboardLeft.length; i++) {
          selector = 'div[ng-controller="' + dashboardLeft[i] + 'Ctrl"]';
          $(selector).appendTo('.dashboard-left');
        }
        for (var j = 0; j < dashboardRight.length; j++) {
          selector = 'div[ng-controller="' + dashboardRight[j] + 'Ctrl"]';
          $(selector).appendTo('.dashboard-right');
        }
      }
    };
  });

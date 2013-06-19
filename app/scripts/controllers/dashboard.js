'use strict';

angular.module('frontierApp')
  .controller('DashboardCtrl', function ($scope) {
    var $module = $('<div></div>');
    $module.attr('ng-controller', 'FruitCtrl');
    var $include = $('<div></div>');
    var templateString = "'views/modules/template.html'";
    $include.attr('ng-include', templateString);
    $module.append($include);

    // // console.log($module);
  });

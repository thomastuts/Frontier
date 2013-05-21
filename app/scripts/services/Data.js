'use strict';

angular.module('frontierApp')
  .factory('Data', function () {
    var url = 'data/frontier.json';

    $.get(url, function(data) {
      return data;
    });
  });

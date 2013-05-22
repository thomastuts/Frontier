'use strict';

angular.module('frontierApp')
  .factory('Data', function ($http) {
    var Data = {
      loadData: function() {
        var promise = $http.get('data/frontier.json').then(function (response) {
          return response.data;
        });
        return promise;
      }
    };
    return Data;
  });

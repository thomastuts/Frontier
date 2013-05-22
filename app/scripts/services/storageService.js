'use strict';

angular.module('frontierApp')
  .factory('storageService', function () {

    function parse (string) {
      return JSON.parse(string);
    }

    function stringify (string) {
      return JSON.stringify(string);
    }

    return {
      get: function () {
        var frontierStorage = localStorage.getItem('frontier');
        if(frontierStorage) {
          return parse(frontierStorage);
        }
        else {
          return 'No Frontier localStorage found. Injecting default configuration.'
        }
      },
      set: function (content) {
        localStorage.setItem('frontier', stringify(content));
      },

      // exports to string
      export: function () {
        var frontierStorage = localStorage.getItem('frontier');
        if(frontierStorage) {
          return frontierStorage;
        }
        else {
          return 'No Frontier localStorage found. Exporting failed.'
        }
      },
      // imports from string
      import: function (string) {
        localStorage.setItem('frontier', string);
      }
    };
  });

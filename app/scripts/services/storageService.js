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
        console.log('Done setting localStorage.frontier');
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
        // TODO: check if string is valid JSON before inserting
        localStorage.setItem('frontier', string);
        console.log('Imported JSON string to localStorage');
      }
    };
  });

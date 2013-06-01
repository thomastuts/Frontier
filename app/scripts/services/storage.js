'use strict';

angular.module('frontierApp')
  .factory('storage', function () {

    return {
      get: function (storage) {
        if(localStorage.getItem('ft-' + storage)) {
          return JSON.parse(localStorage.getItem('ft-' + storage));
        }
        else {
          return 'localStorage ' + storage + ' was not found.';
        }
      },
      set: function (storage, content) {
        localStorage.setItem('ft-' + storage, JSON.stringify(content));
        console.log('Done setting ft-' + storage);
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
      import: function (storage, content) {
        // TODO: check if string is valid JSON before inserting
        localStorage.setItem('ft-' + storage, content);
        console.log('Imported JSON string to ft-' + storage);
      }
    };
  });

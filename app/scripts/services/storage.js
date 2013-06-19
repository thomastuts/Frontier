'use strict';

angular.module('frontierApp')
  .factory('storage', function () {

    return {
      get: function (storage) {
        if(localStorage.getItem('ft-' + storage)) {
          return JSON.parse(localStorage.getItem('ft-' + storage));
        }
        else {
          return null;
        }
      },
      set: function (storage, content) {
        localStorage.setItem('ft-' + storage, JSON.stringify(content));
        // console.log('Done setting ft-' + storage);
      },

      // exports to string
      export: function (storage) {
        var content = localStorage.getItem('ft-' + storage);
        if(content) {
          // todo: use json.prettyprint instead
          return JSON.stringify(JSON.parse(content), null, 2);
        }
        else {
          return 'No localStorage found called ft-' + storage + '. Export failed.'
        }
      },
      // imports from string
      import: function (storage, content) {
        // TODO: check if string is valid JSON before inserting
        localStorage.setItem('ft-' + storage, content);
        // console.log('Imported JSON string to ft-' + storage);
      }
    };
  });

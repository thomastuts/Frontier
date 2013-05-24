'use strict';

angular.module('frontierApp')
  .factory('ui', function () {
    return {
      toggle: function (toggledModule) {
        var content = '.' + toggledModule.meta.name + ' .content';
        $(content).toggle();

        // todo: implement animation so we don't this ugly toggle
        var name = toggledModule.meta.name;
        var open = toggledModule.ui.open;

        if(open === true) {
          console.warn('Minimizing ' + toggledModule.meta.name);
        }
        else {
          console.warn('Maximizing ' + toggledModule.meta.name);
        }
        toggledModule.ui.open = !open;
      }
    };
  });

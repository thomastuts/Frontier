'use strict';

angular.module('frontierApp')
  .factory('ui', function () {
    return {
      toggle: function (toggledModule) {
        var content = '.' + toggledModule.meta.name + ' .content';

        // todo: implement animation so we don't this ugly toggle
        var name = toggledModule.meta.name;
        var open = toggledModule.ui.open;
        var $toggle = $('.' + name + ' .toggle');

        // console.log(open);

        if(open === true) {
          console.warn('Minimizing...');
          $toggle.removeClass('icon-chevron-up');
          $toggle.addClass('icon-chevron-down');
        }
        else {
          console.warn('Maximizing...');
          $toggle.removeClass('icon-chevron-down');
          $toggle.addClass('icon-chevron-up');
        }
        toggledModule.ui.open = !open;
        $(content).toggle();
      }
    };
  });

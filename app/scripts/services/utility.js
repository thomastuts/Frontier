'use strict';

angular.module('frontierApp')
  .factory('utility', function () {
    return {
      replaceURLWithHTMLLinks: function (text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<span class='api-link' data-link='$1'>$1</span>");
      }
    };
  });

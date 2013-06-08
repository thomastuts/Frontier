'use strict';

angular.module('frontierApp')
  .factory('utility', function () {
    return {
      replaceURLWithHTMLLinks: function (text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<span class='api-link' data-link='$1'>$1</span>");
      },
      removeLineBreaks: function (content) {
        content = content.replace(/(\r\n|\n|\r)/gm,"");
        return content;
      },
      getExtension: function (url) {
        return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf(".")).toLowerCase();
      },
      separateNewlines: function (string) {
        return string.split('\n');
      }
    };
  });

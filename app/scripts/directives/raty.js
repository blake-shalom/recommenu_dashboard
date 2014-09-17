'use strict';

/**
 * @ngdoc directive
 * @name recommenuClientDashApp.directive:raty
 * @description
 * # raty
 */
angular.module('recommenuClientDashApp')
  .directive('raty', function () {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        $.fn.raty.defaults.starOn  = './bower_components/raty/lib/images/star-on.png';
        $.fn.raty.defaults.starOff  = './bower_components/raty/lib/images/star-off.png';
        $.fn.raty.defaults.starHalf  = './bower_components/raty/lib/images/star-half.png';
        $.fn.raty.defaults.halfShow  = true;
        $.fn.raty.defaults.half  = true;
        $.fn.raty.defaults.readOnly  = true;
        element.raty({score: attrs.score, number: attrs.number});
      }
    };
  });

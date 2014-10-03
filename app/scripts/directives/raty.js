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
        $.fn.raty.defaults.starOn  = '../../images/star-on.png';
        $.fn.raty.defaults.starOff  = '../../images/star-off.png';
        $.fn.raty.defaults.starHalf  = '../../images/star-half.png';
        $.fn.raty.defaults.halfShow  = true;
        $.fn.raty.defaults.half  = true;
        $.fn.raty.defaults.readOnly  = true;
        element.raty({score: attrs.score, number: attrs.number});
      }
    };
  });

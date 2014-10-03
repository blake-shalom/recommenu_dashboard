'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.twitter
 * @description
 * # twitter
 * Factory in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('twitter', function (Restangular, $window, $http) {

  return{
      requestToken: function(){
          var call = $http.jsonp({
              method: 'POST',
              url: 'https://api.twitter.com/oauth/request_token',
              data: {oauth_consumer_key:'aUVOZOLRGGDuFQuvGz61gUTYz'}

          })
          call.success(function (data, status, headers, config) {
              console.log("request token: success");

          })
          call.error(function (data, status, headers, config){
              console.log('request: error');

          });
          return call;

          console.log("up in heres");
          return Restangular.oneUrl('/oauth/request_token').get();
      },

      authenticate: function(){
          return Restangular.oneUrl('/oauth/authenticate/?oauth_token=' + $window.requestToken).get();
      }
    }
  });

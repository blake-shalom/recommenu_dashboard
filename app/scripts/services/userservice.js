'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.UserService
 * @description
 * # UserService
 * Service in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('Userservice', function Userservice($http, Restangular, $window) {
    var userEndpoint = Restangular.all('/api/v1/user/login/');
      return {
        logIn: function(username, password) {
                 return userEndpoint.post(JSON.stringify({username: username, password: password}));
               },
        getInfo: function(){
                   return  Restangular.one('/api/v1/user_profile', $window.sessionStorage.id).get();
                 }
      };
  });

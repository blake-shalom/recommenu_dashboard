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
    var autEndpoint = Restangular.all('api-token-auth/');
      return {
        logIn: function(username, password) {
                 return autEndpoint.post(JSON.stringify({username: username, password: password}));
               },
        getData: function(username, password) {
                 return Restangular.one('/users/?username=' + username).get();
               },  
        getInfo: function(){
                   return  Restangular.one('user_profile', $window.sessionStorage.id + '/').get();
                 },
        getManager: function(){
                    return  Restangular.one('users/2/').get();
                 }
      };
  });

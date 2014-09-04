'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('Authenticationservice', function Authenticationservice() {
        var auth = {
            isLogged: false
        };

        return auth;
  });

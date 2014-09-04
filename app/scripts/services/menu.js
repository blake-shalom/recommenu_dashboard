'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.Menu
 * @description
 * # Menu
 * Factory in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('Menuservice', function (Restangular, $window) {
        console.log($window.sessionStorage.company_uri);
        var companyEndpoint = Restangular.one($window.sessionStorage.company_uri);

        companyEndpoint.get().then(
            function(data){
                $window.sessionStorage.company_id = data.id;  // do this elsewhere eventually, set premptively
            },
            function(res){
                console.log('Could not reach company detail endpoint');
            }
        );
        console.log('COMPANY ID' + $window.sessionStorage.company_id);
        return {
            menuList: function(){
                console.log('api/v1/menus/?company=' + $window.sessionStorage.company_id);
                return Restangular.one('api/v1/menus/?company=' + $window.sessionStorage.company_id).getList();
                /*.then(
                 function(data){
                 console.log('here first');
                 console.log(data[0].name);
                 return data[0].name; // returning a list of object results
                 },
                 function(res){
                 console.log('failed menu list get', res.status);
                 }*/
                //);
            },
            review: function(){
                return Restangular.all('/api/v1/recommendations/?entry__section__menu__company=' + $window.sessionStorage.company_id).getList();
            },
            userloc: function(user_location){
                return Restangular.all(user_location).get();
            },

            menuDetail: function(menuId){
                console.log('Getting Detail for' + menuId);
                return Restangular.one('api/v1/menus/' + menuId).get();
                }

                };
  });

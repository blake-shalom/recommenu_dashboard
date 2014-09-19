'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.Menu
 * @description
 * # Menu
 * Factory in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('Menuservice', function (Restangular, $window, $http) {
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
        console.log('COMPANY ID: ' + $window.sessionStorage.company_id);
        return {
            menuList: function(){
                console.log('api/v1/menus/?company=' + $window.sessionStorage.company_id);
                return Restangular.one('api/v1/menus/?company=' + $window.sessionStorage.company_id).getList();
            },
            review: function(){
                //return Restangular.all('/api/v1/recommendations/?format=json').getList();
                return Restangular.all('/api/v1/recommendations/?entry__section__menu__company=' + $window.sessionStorage.company_id).getList();
            },
            userloc: function(user_location){
                return Restangular.all(user_location).get();
            },

            menuDetail: function(menuId){
                console.log('Getting Detail for' + menuId);
                return Restangular.one('api/v1/menus/' + menuId).get();
                },
            sections: function(menuId){
                return Restangular.one('api/v1/sections/?menu__company=' + $window.sessionStorage.company_id).getList();
            },

            brandResponse: function(name, commente, reviewid, date){
                console.log('testing the menuservice');
                console.log("here: ",name," : ", commente," : ", reviewid," : ", date);
                //var s = JSON.stringify({responder: name, comoment: comment});
                //return Restangular.all('api/v1/brand_responses').post(s);
                
                //create recommendation uri
                var recom = "/api/v1/recommendations/";
                var recomF = recom.concat(reviewid);
                recomF = recomF.concat("/");
                console.log("recomF: ", recomF);
 
                var companyF = "/api/v1/companies/1/";

                var payload = JSON.stringify({company: companyF, recommendation: recomF, responder:name, date_posted:date, comment:commente});
                console.log(payload);


                var call = $http({
                    method: 'POST',
                    url: 'http://tranquil-plateau-8131.herokuapp.com/api/v1/brand_responses/',
                    data:  /*JSON.stringify({company: "/api/v1/companies/1/", recommendation :"/api/v1/recommendations/1/", 
                        responder: name, date_posted :"2014-10-10T16:49:26.837659", 
                        comment: commente})
                    */
                    // {"company": "/api/v1/companies/1/", "recommendation":"/api/v1/recommendations/19/", "responder":"Bob's American Grille", "date_posted":"2014-10-10T16:49:46.837659", "comment":"Freddie, that sounds like a great strategy! Glad you enjoyed the dish!"}
                    payload
                })
                call.success(function (data, status, headers, config) {
                    console.log("Brand Response: success");

                })
                call.error(function (data, status, headers, config){
                    console.log('Brand Response: error');

                });
                return call;    
            }

                }
  });

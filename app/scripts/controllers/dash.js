'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:DashctrlCtrl
 * @description
 * # DashctrlCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')
  .controller('Dashctrl', function ($scope, $state, Restangular, $window, Dashboardservice,
                                    Userservice, Authenticationservice, $location) {
        $scope.profileInfo = {};
        $scope.content1 = 'Thank you for registering to the Recommenu Dashboard! Please Check your ' +
                          'email for a confirmation request with a link that will confirm your account. Once you ' +
                          'click the link, your registration will be complete!';
        $scope.content2 = 'If for some reason you don not recieve the email within 24 hours, contact us via ' +
                          'recommenu@gmail.com and we"ll do our best to get you back on track.';
        $scope.signIn = function(username, password) {
            // Check for missing credentials
            console.log('Signing in as: ', username, password);
            if (username !== undefined && password !== undefined) {
                Userservice.logIn(username, password).then(
                    function(data){
                        console.log('successful login');
                        Authenticationservice.isLogged = true;
                        $window.sessionStorage.token = data.apiKey;
                        $window.sessionStorage.id = data.id;
                        Restangular.setDefaultRequestParams({apiKey: $window.sessionStorage.token });
                        $location.path('/');  // default location after sign-in
                        Userservice.getInfo().then(
                            function(userInfo) {
                                console.log('Successful profile get');
                                console.log(userInfo.user);
                                $scope.profileInfo['first_name'] = userInfo.user.first_name;
                                $scope.profileInfo['last_name'] = userInfo.user.last_name;
                                $window.sessionStorage.company_uri = userInfo.company;
                                Restangular.one($window.sessionStorage.company_uri).get().then(
                                    function(data){
                                        $window.sessionStorage.company_id = data.id;  // do this elsewhere eventually, set premptively
                                    },
                                    function(res){
                                        console.log('Could not reach company detail endpoint');
                                    }
                                );
                                console.log($window.sessionStorage.company_uri);
                                console.log($scope.profileInfo['first_name']);
                            },
                            function(res){
                                console.log('failed profile get', res.status);
                            });
                    },
                    function(res){
                        console.log('failed login', res.status);
                    }
                );
            }
        };
    });

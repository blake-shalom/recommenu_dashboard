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
                          'emaifl for a confirmation request with a link that will confirm your account. Once you ' +
                          'click the link, your registration will be complete!';
        $scope.content2 = 'If for some reason you don not recieve the email within 24 hours, contact us via ' +
                          'recommenu@gmail.com and we"ll do our best to get you back on track.';

/*
        Userservice.getManager().then(
            function(user){
                console.log(user.first_name);
                $scope.managers = user;
                $scope.managerName = user.first_name;
                $scope.email = user.email;
                //$scope.phoneNumber = data.user.first_name;
            },
            function(res){
                console.log("failed user get", res.status);
            }
        );
*/
        $scope.signIn = function(username, password) {
            // Check for missing credentials
            $scope.loginStatus = "Attempting to login...";
            console.log('Signing in as: ', username, password);
            if (username !== undefined && password !== undefined) {
                Userservice.getData(username, password).then(
                    function(data){
                        console.log('successful login');
                        $scope.loginStatus = "You have successfully logged in!";
                        $scope.loginSuccess = "Log Out";
                        Authenticationservice.isLogged = true;
                        $window.sessionStorage.token = data.apiKey;
                        $window.sessionStorage.id = data.id;
                        $window.sessionStorage.firstName = data.first_name;
                        $window.sessionStorage.lastName = data.last_name;
                        console.log("data.id: ",data.id);
                        //Restangular.setDefaultRequestParams({apiKey: $window.sessionStorage.token });
                        $location.path('/');  // default location after sign-in
                        Userservice.getInfo().then(
                            function(userInfo) {
                                console.log('Successful profile get');
                                console.log(userInfo.user);

                                $window.sessionStorage.company_uri = userInfo.company;
                                Restangular.one('companies/' + $window.sessionStorage.id + '/').get().then(
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
                            $state.go('dashboard.analytics');
                    },
                    function(res){
                        console.log('failed login', res.status);
                        $scope.loginStatus = "Login Failed.";

                    }
                );
            }
            else{
                $scope.loginStatus = "Please enter login information.";
            }
        };
/*
        $scope.getManager = function(){
            console.log("actually is doing something");
            console.log($scope.showmanager);
            $scope.showmanager = true;
            console.log($scope.showmanager);
        };
        */

        $scope.register = function(){
            console.log("registser");
            $scope.registerStatus = "Sorry, Registration is closed.";
        }

    });

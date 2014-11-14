'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')
  .controller('LoginCtrl', function ($scope, $state, Restangular, $window, Dashboardservice,
                                     Userservice, Authenticationservice, $location) {
        $scope.profileInfo = {};
        $scope.content1 = 'Thank you for registering to the Recommenu Dashboard! Please Check your ' +
            'emaifl for a confirmation request with a link that will confirm your account. Once you ' +
            'click the link, your registration will be complete!';
        $scope.content2 = 'If for some reason you don not recieve the email within 24 hours, contact us via ' +
            'recommenu@gmail.com and we"ll do our best to get you back on track.';
        $scope.signIn = function(username, password) {
            // Check for missing credentials
            $scope.loginStatus = "Attempting to login...";
            console.log('Signing in as: ', username, password);
            if (username !== undefined && password !== undefined) {
                Userservice.logIn(username, password).then(
                    function(auth){
                        Restangular.setDefaultHeaders({'content-type': 'application/json', 'Authorization': 'Token '+ auth.token});
                        Userservice.getData(username, password).then(
                            function(data){
                                data = data.results[0];
                                console.log("data: ",data);
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
                                        $window.sessionStorage.company_uri = userInfo.company;
                                        Restangular.one('companies/' + $window.sessionStorage.id + '/').get().then(
                                            function(data1){
                                                $window.sessionStorage.company_id = data1.id;  // do this elsewhere eventually, set premptively
                                                console.log($window.sessionStorage.company_uri);
                                                $state.go('dashboard.analytics');
                                            },
                                            function(res){
                                                console.log('Could not reach company detail endpoint');
                                            }
                                        );

                                    },
                                function(res){
                                    console.log('failed profile get', res.status);
                                });


                        },
                        function(res){
                                    console.log('failed profile get', res.status);
                                });
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

        $scope.register = function(){
            console.log("registser");
            $scope.registerStatus = "Sorry, Registration is closed.";
        }
  });

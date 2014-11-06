'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')

  .controller('AnalysisCtrl', function ($scope, Menuservice, twitter, $window) {

        $scope.pageLoading = true;
        $scope.profileInfo['first_name'] = $window.sessionStorage.firstName;
        $scope.profileInfo['last_name'] = $window.sessionStorage.lastName;
        console.log($scope.profileInfo['first_name'], $scope.profileInfo['last_name']);
        $scope.reviews = {};
        $scope.donuts_data = {};
        Menuservice.menuList().then(
            function(data){
                console.log("menu List");
                $scope.menuList = data;
                $scope.menuList_meta = data.metadata;
                console.log(data[0].sections[0].name);
                for (var section in data[0].sections){
                    for (var entry in data[0].sections[section].entries){
                        $scope.menuList[0].sections[section].entries[entry]['donut'] = [
                            {
                                value: $scope.menuList[0].sections[section].entries[entry]['five_agg'],
                                color:"#F7464A",
                                highlight: "#FF5A5E",
                                label: "Five Star"
                            },
                            {
                                value: $scope.menuList[0].sections[section].entries[entry]['four_agg'],
                                color: "#46BFBD",
                                highlight: "#5AD3D1",
                                label: "Four Star"
                            },
                            {
                                value: $scope.menuList[0].sections[section].entries[entry]['three_agg'],
                                color: "#FDB45C",
                                highlight: "#FFC870",
                                label: "Three Star"
                            },
                            {
                                value: $scope.menuList[0].sections[section].entries[entry]['two_agg'],
                                color: "#949FB1",
                                highlight: "#A8B3C5",
                                label: "Two Star"
                            },
                            {
                                value: $scope.menuList[0].sections[section].entries[entry]['one_agg'],
                                color: "#4D5360",
                                highlight: "#616774",
                                label: "One Star"
                            }
                        ]

                        $scope.menuList[0].sections[section].entries[entry]['chart'] = {
                            labels: ["Day 1", "Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30"],
                            datasets: [
                                {
                                    label: "Views",
                                    fillColor: "#6abcd6",
                                    strokeColor: "#5ca0b1",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: [getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75),
                                        getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75)]
                                }
                            ]


                        }
                    }

                }
                $scope.pageLoading = false;
            },
            function(res){
                console.log("failed menulist get", res.status);
            }
        );

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        $scope.chart = {
            labels: ["Day 1", "Day 5", "Day 10", "Day 15", "Day 20", "Day 25", "Day 30"],
            datasets: [
                {
                    label: "Views",
                    fillColor: "#6abcd6",
                    strokeColor: "#5ca0b1",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#6abcd6",
                    pointHighlightStroke: "#5ca0b1",
                    data: [getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75),
                           getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75)]
                }
            ]
        };
        $scope.lineOptions = {
           // responsive: true,
            animation: false,
            pointDot : false,
            bezierCurve : false,
            scaleBeginAtZero : true,
            datasetStrokeWidth : 5
        };

        $scope.donutOptions = {
            percentageInnerCutout : 70,
            animateRotate : false
            //responsive: true
        };


        $scope.postTweet = function(){
            if(!$window.requestToken){
                // get a new request token if one doesn't exist, use request token in access_token call if it does exist
                twitter.requestToken().then(
                    function(data){
                        if(data.oauth_callback_confirmed == true){
                            $window.requestToken = data.oauth_token;
                            $window.requestTokenSecret = data.oauth_token_secret;

                            // plug token into access_token call
                            twitter.authenticate($window.requestToken).then(
                                function(data){
                                    console.log("AUTHENTICATED CORRECTLY");
                                },
                                function(res){
                                    console.log(res);
                                    console.log("FAILED ON TWITTER STEP 2");
                                }
                            )
                        }
                        else{
                            console.log("oauth callback was false");
                        }
                    },
                    function(res){
                        console.log("could not get request token for Twitter");
                        console.log(res);
                    }
                );

            }else{
                console.log("POSTED TWEET");
            }

        };


        $scope.toggleActive = function(){
            $(event.target).css('active');
        };

        $scope.showReviews = function(entryId){
            Menuservice.reviewDetail(entryId).then(
                function(data){
                    $scope.reviews[entryId] = data;
                },
                function(res){
                    console.log(res);
                }

            );


        };
  });





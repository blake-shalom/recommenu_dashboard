'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:AnalysisCtrl
 * @description
 * # AnalysisCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')

  .controller('AnalysisCtrl', function ($scope, Menuservice) {
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
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
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
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75),
                           getRandomInt(25, 75), getRandomInt(25, 75), getRandomInt(25, 75)]
                }
            ]


        };
  });





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
        Menuservice.review().then(
            function(data){
                console.log("retrived recommendations");
                $scope.recommendations = data;
                $scope.recommendations_meta = data.metadata;
            },
            function(res){
                console.log("failed recommendations get", res.status);
            }
        );
        Menuservice.menuList().then(
            function(data){
                console.log("menu List");
                $scope.menuList = data;
                $scope.menuList_meta = data.metadata;
            },
            function(res){
                console.log("failed menulist get", res.status);
            }
        );
        $scope.demo = this;
        $scope.rating = {
            current: 0,
            over: 0,
            out: 0
        };
        $scope.ratyOptions = {
            half: true,
            cancel: true,
            cancelOn: 'https://raw.github.com/wbotelhos/raty/master/lib/img/cancel-off.png',
            cancelOff: 'https://raw.github.com/wbotelhos/raty/master/lib/img/cancel-on.png',
            starHalf: 'https://raw.github.com/wbotelhos/raty/master/lib/img/star-half.png',
            starOff: 'https://raw.github.com/wbotelhos/raty/master/lib/img/star-off.png',
            starOn: 'https://raw.github.com/wbotelhos/raty/master/lib/img/star-on.png'
        };

        this.mouseOver = function (stars, e) {
            $scope.rating.over = stars || 0;
        };

        this.mouseOut = function (stars, e) {
            $scope.rating.out = stars || 0;
        };

        this.setRating = function (value) {
            if (typeof value != 'number') return;

            // Remove negatives, round to nearest .5;
            value = (Math.round(Math.abs(parseFloat(value) || 0) * 2) / 2).toFixed(1)
            $scope.rating.current = value > 5 ? 5 : value;
        };
  });
angular.module('phoffman.ngRaty', [])
    .directive('ngRaty', function () {
        return {
            restrict: "A",
            scope: {
                ngRaty: '=',
                ngModel: '=',
                mouseOver: '&',
                mouseOut: '&'
            },
            link: function ($scope, $element, $attrs) {
                var rating = $scope.ngModel;
                var raty = {
                    score: parseFloat(rating, 10),
                    click: function (stars, evt) {
                        evt.stopPropagation();
                        if (!stars) stars = 0;
                        if (!$scope.$$phase) {
                            $scope.$apply(function () {
                                $scope.ngModel = parseFloat(stars);
                            });
                        } else {
                            $scope.ngModel = parseFloat(stars);
                        }
                    },
                    mouseover: function (stars, evt) {
                        if (!$scope.mouseOver) return;
                        $scope.mouseOver({
                            stars: stars,
                            e: evt
                        });
                        $scope.$apply();
                    },
                    mouseout: function (stars, evt) {
                        if (!$scope.mouseOut) return;
                        $scope.mouseOut({
                            stars: stars,
                            e: evt
                        });
                        $scope.$apply();
                    }
                };
                var options = angular.extend(raty, $scope.ngRaty || {});
                $element.raty(options);

                // Set view to score if model changes
                $scope.$watch('ngModel', function (newValue, oldValue) {
                    $element.raty('score', $scope.ngModel);
                });

                function destroy(){
                    $element.raty('destroy');
                }
                $element.bind('$destroy', destroy);
            }
        }
    });


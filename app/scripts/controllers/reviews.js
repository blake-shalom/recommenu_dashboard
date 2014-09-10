'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:ReviewsctrlCtrl
 * @description
 * # ReviewsctrlCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')
  .controller('Reviewsctrl', function ($scope, $state, $compile, Menuservice, Restangular, Dashboardservice, $window) {
        // get a list of menus for the logged in user
        $scope.portion1 = "width: 50%";
        $scope.spice1 = "width: 50%";        
        $scope.salt1 = "width: 50%";
        $scope.comment = "I like this food.  Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food.";
        $scope.username = "Jake";
        $scope.date_posted = "07/06/2014"
        $scope.score = "3";



        Menuservice.menuList().then(
            function(data){
                console.log(data[0].name);
                $scope.menus = data;
                $scope.menus_meta = data.metadata;
            },
            function(res){
                console.log("failed menu-list get", res.status);
            }
        );

        Menuservice.review().then(
            function(data){
                $scope.reviews = data;
                $scope.total_reviews = data.metadata.total_count;


            },
            function(res){
                console.log("Could not retrieve reviews", res.status);
            });

        $scope.newMenu = function() {
            $state.go('dashboard.notifications.newmenu');
        };

        $scope.newBlogpost = function() {
            $state.go('dashboard.notifications.newblogpost');
        };

        $scope.surveys = function() {
            $state.go('dashboard.notifications.surveys');
        };

        $scope.checkall = function () {
            $(".checkBoxClass").prop("checked",$("#chkAll").prop("checked"))
        };

        $scope.select = function () {
            $scope.list.push('1')
        };




        $scope.removeDish = function(event){
            console.log("Removing Dish Card");
            var dish = angular.element(event.target).parent().parent().parent().parent().parent().parent(); // will have to adjust if levels change in HTML
            dish.remove();
        };

        $scope.closeDish = function(event){
            console.log("Closing Dish");
        };

        $scope.popup = function(event){
            alert("popup")
        };

        $scope.rate = 7;
        $scope.max = 20;
        $scope.isReadonly = true;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.changedate = function(input) {
            input.date_posted = getDate(input.date_posted);
            return input;
        };


        $scope.popup1 = function(){
            console.log('clicked it');
            var docHeight = $(document).height(); //grab the height of the page
            var scrollTop = $(window).scrollTop();
            $('.overlay-bg2').show().css({'height' : docHeight}); //display your popup and set height to the page height
            $('.overlay-content2').css({'top': scrollTop+20+'px'}); //set the content 20px from the window top
            };


        // hide popup when user clicks on close button
        $('.close-btn2').click(function(){
        $('.overlay-bg2').hide(); // hide the overlay
    });

    // hides the popup if user clicks anywhere outside the container
    $('.overlay-bg2').click(function(){
        $('.overlay-bg2').hide();
    });
    // prevents the overlay from closing if user clicks inside the popup overlay
    $('.overlay-content2').click(function(){
        return false;
    });
  });

'use strict';

/**
 * @ngdoc function
 * @name recommenuClientDashApp.controller:ReviewsctrlCtrl
 * @description
 * # ReviewsctrlCtrl
 * Controller of the recommenuClientDashApp
 */
angular.module('recommenuClientDashApp')

  .controller('Reviewsctrl', function ($scope, $state, $compile, Menuservice, $window) {
        $scope.profileInfo['first_name'] = $window.sessionStorage.firstName;
        $scope.profileInfo['last_name'] = $window.sessionStorage.lastName;
        console.log($scope.profileInfo['first_name'], $scope.profileInfo['last_name']);
        // get a list of menus for the logged in user
        $scope.responseSuccess = false;
        $scope.pageLoading = true;

        var getSections = function() {
            Menuservice.sections().then(
                function (data) {
                    $scope.sectionList = data;
                    $scope.sections_meta = data.metadata;
                },
                function (res) {
                    console.log("failed menu-list get", res.status);
                    getSections();
                }
            );
        };

        var getReviews = function(){
            Menuservice.review().then(
            function(data){
                $scope.reviews = data;
                $scope.total_reviews = data.metadata.total_count;
                $scope.pageLoading = false;

            },
            function(res){
                console.log("Could not retrieve reviews", res.status);
                getReviews();
            });
        };
        getSections();

        getReviews();


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
        $scope.reviewid;
        var re;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.changedate = function(input) {
            input.date_posted = getDate(input.date_posted);
            return input;
        };


        $scope.popup1 = function(reviewid){
            console.log("review: ", reviewid);
            //setid(review);
            var str1 = "pop";
            var divID = str1.concat(reviewid);

            if($(divID).length == 0){
                console.log("doesnt exists: ", divID);}

            if($('pop7').length == 0){
                    console.log("doesnt exists: ", divID);}



            console.log("divID: ", divID);
            var docHeight = $(document).height(); //grab the height of the page
            var scrollTop = $(window).scrollTop();
            /*
            $('pop7').show().css({'height' : docHeight}); //display your popup and set height to the page height
            $('pop7').removeClass('hidden');
            $('pop7').addClass('nothidden');
            $('.overlay-content2').css({'top': scrollTop+20+'px'}); //set the content 20px from the window top
            */
        };



        $scope.passReivewID = function(x){
            $scope.clickedit = true;
            $scope.reviewIDPassed = x;

            var docHeight = $(document).height(); //grab the height of the page
            var scrollTop = $(window).scrollTop();
            $('.overlay-bg2').show().css({'height' : docHeight}); //display your popup and set height to the page height
            $('.overlay-content2').css({'top': scrollTop-200+'px'});
            $('.overlay-content2').css({'margin-left': -200+'px'});



        };

        $scope.setResponse = function(name, comment, reviewid){

            //error checking
            if(!name && !comment){
                $scope.response = "Please fill out the form.";  
            }
            else if(!name){
                $scope.response = "Please fill out your name.";  
                console.log("no name");
            }
            else if(!comment){
                $scope.response = "Please fill out the comment.";  
            }   

            //user filled out the form
            else{
                $scope.clickedit = false;
                console.log("setrespone: ", name , " : ", comment, " : ", reviewid);
                var d = new Date();
                var date = d.toISOString();

                $('.overlay-bg2').hide();

                
                Menuservice.brandResponse(name, comment, reviewid, date).then(
                function(data){
                    console.log("setResponse: Success!");
                    $scope.responseSuccess = true;
                    $scope.responseMessage = "Your response was sent successfully!";
                    console.log("Reloading Reviews");
                    getReviews();
                },
                function(res){
                    console.log("Could not retrieve reviews", res.status);
                    $scope.responseMessage = "Sorry, your response was unsuccessfully! "+res.status;
                });
                

                $scope.uname = "";
                $scope.ucomment = "";
            }

            
        }

        $scope.closeResponseSuccess = function(){
            $scope.responseSuccess = false;
        }


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

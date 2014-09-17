"use strict";angular.module("recommenuClientDashApp",["ui.router","restangular","angles"]).config(["$stateProvider","$urlRouterProvider","RestangularProvider","$httpProvider",function(a,b,c,d){d.defaults.useXDomain=!0,delete d.defaults.headers.common["X-Requested-With"],d.defaults.headers.common["Content-Type"],c.setBaseUrl("http://tranquil-plateau-8131.herokuapp.com"),c.configuration.requestSuffix="&",c.setResponseExtractor(function(a,b){var c;return"getList"===b?(c=a.objects,c.metadata=a.meta):c=a,c}),a.state("dashboard",{url:"/dashboard",templateUrl:"views/dashboard.html",controller:"Dashctrl"}).state("dashboard.Reviews",{url:"/reviews",templateUrl:"views/reviews.html",controller:"Reviewsctrl"}).state("dashboard.analytics",{url:"/analytics",templateUrl:"views/analytics.html",controller:"AnalysisCtrl"}),b.otherwise("/dashboard")}]),angular.module("recommenuClientDashApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("recommenuClientDashApp").controller("Dashctrl",["$scope","$state","Restangular","$window","Dashboardservice","Userservice","Authenticationservice","$location",function(a,b,c,d,e,f,g,h){a.profileInfo={},a.content1="Thank you for registering to the Recommenu Dashboard! Please Check your emaifl for a confirmation request with a link that will confirm your account. Once you click the link, your registration will be complete!",a.content2='If for some reason you don not recieve the email within 24 hours, contact us via recommenu@gmail.com and we"ll do our best to get you back on track.',a.signIn=function(e,i){a.loginStatus="Attempting to login...",console.log("Signing in as: ",e,i),void 0!==e&&void 0!==i?f.logIn(e,i).then(function(e){console.log("successful login"),a.loginStatus="You have successfully logged in!",a.loginSuccess="Log Out",g.isLogged=!0,d.sessionStorage.token=e.apiKey,d.sessionStorage.id=e.id,console.log("data.id: ",e.id),c.setDefaultRequestParams({apiKey:d.sessionStorage.token}),h.path("/"),f.getInfo().then(function(b){console.log("Successful profile get"),console.log(b.user),a.profileInfo.first_name=b.user.first_name,a.profileInfo.last_name=b.user.last_name,d.sessionStorage.company_uri=b.company,c.one(d.sessionStorage.company_uri).get().then(function(a){d.sessionStorage.company_id=a.id},function(){console.log("Could not reach company detail endpoint")}),console.log(d.sessionStorage.company_uri),console.log(a.profileInfo.first_name)},function(a){console.log("failed profile get",a.status)}),b.go("dashboard.Reviews")},function(b){console.log("failed login",b.status),a.loginStatus="Login Failed."}):a.loginStatus="Please enter login information."},a.register=function(){console.log("registser"),a.registerStatus="Sorry, Registration is closed."}}]),angular.module("recommenuClientDashApp").factory("Userservice",["$http","Restangular","$window",function(a,b,c){var d=b.all("/api/v1/user/login/");return{logIn:function(a,b){return d.post(JSON.stringify({username:a,password:b}))},getInfo:function(){return b.one("/api/v1/user_profile",c.sessionStorage.id).get()}}}]),angular.module("recommenuClientDashApp").factory("Authenticationservice",function(){var a={isLogged:!1};return a}),angular.module("recommenuClientDashApp").factory("Dashboardservice",function(){var a=[{sectionName:"Summary",urlName:"#/dashboard/summary",icon:"calendar-o",classname:"current"},{sectionName:"Survey Results",urlName:"#/dashboard/surveyresults",icon:"dashboard",classname:""},{sectionName:"Notifications",urlName:"#/dashboard/notifications",icon:"comment-o",classname:""}];return{options:function(){return a}}}),angular.module("recommenuClientDashApp").controller("Reviewsctrl",["$scope","$state","$compile","Menuservice","Restangular","Dashboardservice","$window",function(a,b,c,d){a.portion1="width: 50%",a.spice1="width: 50%",a.salt1="width: 50%",a.comment="I like this food.  Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food. Really long text about food.",a.username="Jake",a.date_posted="07/06/2014",a.score="3",a.responseSuccess=!1,a.pageLoading=!0,d.menuList().then(function(b){console.log(b[0].name),a.menus=b,a.menus_meta=b.metadata},function(a){console.log("failed menu-list get",a.status)});var e=function(){d.review().then(function(b){a.reviews=b,a.total_reviews=b.metadata.total_count,a.pageLoading=!1},function(a){console.log("Could not retrieve reviews",a.status)})};e(),a.newMenu=function(){b.go("dashboard.notifications.newmenu")},a.newBlogpost=function(){b.go("dashboard.notifications.newblogpost")},a.surveys=function(){b.go("dashboard.notifications.surveys")},a.checkall=function(){$(".checkBoxClass").prop("checked",$("#chkAll").prop("checked"))},a.select=function(){a.list.push("1")},a.removeDish=function(a){console.log("Removing Dish Card");var b=angular.element(a.target).parent().parent().parent().parent().parent().parent();b.remove()},a.closeDish=function(){console.log("Closing Dish")},a.popup=function(){alert("popup")},a.rate=7,a.max=20,a.isReadonly=!0,a.reviewid;a.hoveringOver=function(b){a.overStar=b,a.percent=100*(b/a.max)},a.changedate=function(a){return a.date_posted=getDate(a.date_posted),a},a.popup1=function(a){console.log("review: ",a);var b="pop",c=b.concat(a);0==$(c).length&&console.log("doesnt exists: ",c),0==$("pop7").length&&console.log("doesnt exists: ",c),console.log("divID: ",c);$(document).height(),$(window).scrollTop()},a.passReivewID=function(b){a.clickedit=!0,a.reviewIDPassed=b;var c=$(document).height(),d=$(window).scrollTop();$(".overlay-bg2").show().css({height:c}),$(".overlay-content2").css({top:d-200+"px"}),$(".overlay-content2").css({"margin-left":"-200px"})},a.setResponse=function(b,c,f){if(b||c)if(b)if(c){a.clickedit=!1,console.log("setrespone: ",b," : ",c," : ",f);var g=new Date,h=g.toISOString();$(".overlay-bg2").hide(),d.brandResponse(b,c,f,h).then(function(){console.log("setResponse: Success!"),a.responseSuccess=!0,a.responseMessage="Your response was sent successfully!",console.log("Reloading Reviews"),e()},function(b){console.log("Could not retrieve reviews",b.status),a.responseMessage="Sorry, your response was unsuccessfully! "+b.status}),a.uname="",a.ucomment=""}else a.response="Please fill out the comment.";else a.response="Please fill out your name.",console.log("no name");else a.response="Please fill out the form."},a.closeResponseSuccess=function(){a.responseSuccess=!1},$(".close-btn2").click(function(){$(".overlay-bg2").hide()}),$(".overlay-bg2").click(function(){$(".overlay-bg2").hide()}),$(".overlay-content2").click(function(){return!1})}]),angular.module("recommenuClientDashApp").factory("Menuservice",["Restangular","$window","$http",function(a,b,c){console.log(b.sessionStorage.company_uri);var d=a.one(b.sessionStorage.company_uri);return d.get().then(function(a){b.sessionStorage.company_id=a.id},function(){console.log("Could not reach company detail endpoint")}),console.log("COMPANY ID: "+b.sessionStorage.company_id),{menuList:function(){return console.log("api/v1/menus/?company="+b.sessionStorage.company_id),a.one("api/v1/menus/?company="+b.sessionStorage.company_id).getList()},review:function(){return a.all("/api/v1/recommendations/?format=json").getList()},userloc:function(b){return a.all(b).get()},menuDetail:function(b){return console.log("Getting Detail for"+b),a.one("api/v1/menus/"+b).get()},brandResponse:function(a,b,d,e){console.log("testing the menuservice"),console.log("here: ",a," : ",b," : ",d," : ",e);var f="/api/v1/recommendations/",g=f.concat(d);g=g.concat("/"),console.log("recomF: ",g);var h="/api/v1/companies/1/",i=JSON.stringify({company:h,recommendation:g,responder:a,date_posted:e,comment:b});console.log(i);var j=c({method:"POST",url:"http://tranquil-plateau-8131.herokuapp.com/api/v1/brand_responses/",data:i});return j.success(function(){console.log("Brand Response: success")}),j.error(function(){console.log("Brand Response: error")}),j}}}]),angular.module("recommenuClientDashApp").controller("AnalyticsCtrl",["$scope","Menuservice",function(){}]),angular.module("recommenuClientDashApp").factory("Recommendationsservice",function(){}),angular.module("recommenuClientDashApp").controller("AnalysisCtrl",["$scope","Menuservice",function(a,b){function c(a,b){return Math.floor(Math.random()*(b-a+1))+a}a.pageLoading=!0,a.donuts_data={},b.menuList().then(function(b){console.log("menu List"),a.menuList=b,a.menuList_meta=b.metadata,console.log(b[0].sections[0].name);for(var d in b[0].sections)for(var e in b[0].sections[d].entries)a.menuList[0].sections[d].entries[e].donut=[{value:a.menuList[0].sections[d].entries[e].five_agg,color:"#F7464A",highlight:"#FF5A5E",label:"Five Star"},{value:a.menuList[0].sections[d].entries[e].four_agg,color:"#46BFBD",highlight:"#5AD3D1",label:"Four Star"},{value:a.menuList[0].sections[d].entries[e].three_agg,color:"#FDB45C",highlight:"#FFC870",label:"Three Star"},{value:a.menuList[0].sections[d].entries[e].two_agg,color:"#949FB1",highlight:"#A8B3C5",label:"Two Star"},{value:a.menuList[0].sections[d].entries[e].one_agg,color:"#4D5360",highlight:"#616774",label:"One Star"}],a.menuList[0].sections[d].entries[e].chart={labels:["Day 1","Day 5","Day 10","Day 15","Day 20","Day 25","Day 30"],datasets:[{label:"Views",fillColor:"rgba(151,187,205,0.2)",strokeColor:"rgba(151,187,205,1)",pointColor:"rgba(151,187,205,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,1)",data:[c(25,75),c(25,75),c(25,75),c(25,75),c(25,75),c(25,75),c(25,75)]}]};a.pageLoading=!1},function(a){console.log("failed menulist get",a.status)}),a.chart={labels:["Day 1","Day 5","Day 10","Day 15","Day 20","Day 25","Day 30"],datasets:[{label:"Views",fillColor:"rgba(151,187,205,0.2)",strokeColor:"rgba(151,187,205,1)",pointColor:"rgba(151,187,205,1)",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,1)",data:[c(25,75),c(25,75),c(25,75),c(25,75),c(25,75),c(25,75),c(25,75)]}]},a.lineOptions={animation:!1},a.donutOptions={percentageInnerCutout:70,animateRotate:!1},a.toggleActive=function(){$(event.target).css("active")}}]),angular.module("recommenuClientDashApp").directive("raty",function(){return{restrict:"AE",link:function(a,b,c){$.fn.raty.defaults.starOn="./bower_components/raty/lib/images/star-on.png",$.fn.raty.defaults.starOff="./bower_components/raty/lib/images/star-off.png",$.fn.raty.defaults.starHalf="./bower_components/raty/lib/images/star-half.png",$.fn.raty.defaults.halfShow=!0,$.fn.raty.defaults.half=!0,$.fn.raty.defaults.readOnly=!0,b.raty({score:c.score,number:c.number})}}});
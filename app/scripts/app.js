'use strict';

/**
 * @ngdoc overview
 * @name recommenuClientDashApp
 * @description
 * # recommenuClientDashApp
 *
 * Main module of the application.
 */
angular.module('recommenuClientDashApp', [
    'ui.router',
    'restangular',
    'angles'
    //'recommenu.services',
    //'recommenu.controllers',
    //'recommenu.directives'
])

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Content-Type'];
    RestangularProvider.setBaseUrl('http://tranquil-plateau-8131.herokuapp.com');

    //$httpProvider.interceptors.push('TokenInterceptor');
    RestangularProvider.configuration.requestSuffix = '&';
    RestangularProvider.setResponseExtractor(function(response, operation) {
        var newResponse;
        if (operation === 'getList') {
            newResponse = response.objects;
            newResponse.metadata = response.meta;
        } else {
            newResponse = response;
        }
        return newResponse;
    });

    $stateProvider
        /* Navigation and states for dashboard screens*/

    .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }
    )

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'Dashctrl'
        })

        .state('dashboard.Reviews', {
            url: '/reviews',
            templateUrl: 'views/reviews.html',
            controller: 'Reviewsctrl'
        })
        .state('dashboard.analytics', {
            url: '/analytics',
            templateUrl: 'views/analytics.html',
            controller: 'AnalysisCtrl'
        });

    $urlRouterProvider.otherwise('/login');
});



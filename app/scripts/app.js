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
    'restangular'
    //'ui.bootstrap'
    //'recommenu.services',
    //'recommenu.controllers',
    //'recommenu.directives'
])

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
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
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'Dashctrl'
        })


        .state('dashboard.Reviews', {
            url: '/reviews',
            templateUrl: 'templates/reviews.html',
            controller: 'Reviewsctrl'
        })
        .state('dashboard.analytics', {
            url: '/reviews',
            templateUrl: 'templates/analytics.html',
            controller: 'Analyticsctrl'
        });

    $urlRouterProvider.otherwise('/dashboard');
});



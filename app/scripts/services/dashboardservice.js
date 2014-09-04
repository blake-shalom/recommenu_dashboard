'use strict';

/**
 * @ngdoc service
 * @name recommenuClientDashApp.DashboardService
 * @description
 * # DashboardService
 * Service in the recommenuClientDashApp.
 */
angular.module('recommenuClientDashApp')
  .factory('Dashboardservice', function Dashboardservice() {
        // 3 main features of app
        var options = [{ sectionName: 'Summary', urlName: '#/dashboard/summary', icon: 'calendar-o', classname: 'current' },
            { sectionName: 'Survey Results', urlName: '#/dashboard/surveyresults', icon: 'dashboard', classname: '' },
            { sectionName: 'Notifications', urlName: '#/dashboard/notifications', icon: 'comment-o', classname: '' }];

        return {
            options: function(){
                return options;
            }
        };
  });

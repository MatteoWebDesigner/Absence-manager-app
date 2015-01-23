'use strict';

/**
 * @ngdoc overview
 * @name AbsenceManager
 * @description
 * # AbsenceManager
 *
 * Main module of the application.
 */
angular
    .module('AbsenceManager', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/src/common/views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
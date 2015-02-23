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
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/src/common/views/main.html',
                controller: 'MainController'
            })
            .when('/login/', {
                templateUrl: '/src/user-account/views/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function($rootScope, $location, AuthService){
        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            if ( !AuthService.isAuthenticated() && !($location.path() == '/login')) {
                $location.path('/login/');
            }

        });
    })
    .constant('Config', {
        dateFormat : 'DD/MM/YYYY'
    })
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });
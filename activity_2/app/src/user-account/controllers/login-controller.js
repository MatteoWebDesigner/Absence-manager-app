'use strict';

angular
    .module('AbsenceManager')
    .controller('LoginController', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function(credentials) {
            AuthService.login(credentials).then(function(user) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(user);
                $location.path('/');
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    });

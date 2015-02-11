'use strict';

angular
    .module('AbsenceManager')
    .controller('LoginController', function($scope, $rootScope, $location, AUTH_EVENTS, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function(credentials) {
            AuthService
                .login(credentials)
                .then(
                    function (resolve) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $scope.setCurrentUser(resolve);
                        $location.path('/');
                    }, 
                    function (reject) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
        };
    });

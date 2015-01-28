'use strict';

angular
    .module('AbsenceManager')
    .controller('UserAccountController', function($scope, USER_ROLES, AuthService) {
        $scope.currentUser = AuthService.restoreLoginSession();
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };
    })

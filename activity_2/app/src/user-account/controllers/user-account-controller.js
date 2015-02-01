'use strict';

angular
    .module('AbsenceManager')
    .controller('UserAccountController', function($scope, $rootScope, $location, AuthService, AUTH_EVENTS) {
        $scope.currentUser = AuthService.restoreLoginSession();
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        $scope.logout = function () {
            var resolve = AuthService.logout();
			
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		    $scope.setCurrentUser(resolve);
		    $location.path('/login/');
        };

        //$scope.$watch()
    });
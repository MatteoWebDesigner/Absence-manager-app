'use strict';

angular
    .module('AbsenceManager')
    .controller('UserAccountController', function($scope, $rootScope, $location, AbsenceService, AuthService, AUTH_EVENTS) {
        
        // main
        $scope.AbsenceData = [];
        AbsenceService
            .get()
            .then(function (res) {
                $scope.AbsenceData = res;
            });

        // user account
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

        $scope.$watch('AbsenceData', function(){
            if ($scope.currentUser !== null) {
                var userAbsences = AbsenceService.getUserAbsences($scope.currentUser.id).count;
                var daysOff = $scope.currentUser.daysOff;

                $scope.currentUser.daysOffLeft = daysOff - userAbsences;
            }
        })
    });
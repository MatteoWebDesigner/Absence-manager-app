'use strict';

angular
	.module('AbsenceManager')
	.controller('UsersRecordsController', function($log, $scope, $rootScope, AbsenceService) {
		$scope.userSelected = $scope.currentUser.id;
		$scope.listUsers = AbsenceService.getListUsers();
		$scope.listRecords = AbsenceService.getAbsenceByUser($scope.userSelected);

		$scope.$watch('AbsenceData', function () {
			$scope.listUsers = AbsenceService.getListUsers();
			$scope.listRecords = AbsenceService.getAbsenceByUser($scope.userSelected);
		});

		$scope.$watch('userSelected', function () {
			$scope.listRecords = AbsenceService.getAbsenceByUser($scope.userSelected);
		});
	});
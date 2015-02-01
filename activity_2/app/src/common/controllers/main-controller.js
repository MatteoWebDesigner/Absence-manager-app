'use strict';

/**
 * @ngdoc function
 * @name AbsenceManager.Absence.controller:MainController
 * @description
 * # MainController
 * Controller of the AbsenceManager
 */
angular.module('AbsenceManager')
	.controller('MainController', function ($scope, $rootScope, $location, AuthService, AbsenceService) {
		$scope.AbsenceData = [];

		AbsenceService.get()
			.then(function (res) {
				$scope.AbsenceData = res;
			});
	});

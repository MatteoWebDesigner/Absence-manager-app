'use strict';

/**
 * @ngdoc function
 * @name AbsenceManager.Absence.controller:LightboxController
 * @description
 * # LightboxController
 * Controller of the AbsenceManager
 */
angular.module('AbsenceManager')
	.controller('LightboxController', function ($scope) {
		$scope.type = 'default';
		$scope.display = false;
		$scope.message = {
			type: '',
			problem: '',
			situation : '',
			next : ''
		};
		$scope.action = null;

		$scope.open = function (poSetting) {
			$scope.type = poSetting.type;
			$scope.display = true;
			$scope.message = {
				type: poSetting.message.type || '',
				situation : poSetting.message.situation,
				problem : poSetting.message.problem || '',
				next : poSetting.message.next || ''
			};
			$scope.action = poSetting.action;
		}

		$scope.close = function (pfCallback) {
			$scope.type = 'default';
			$scope.display = false;
			$scope.message = {
				type: '',
				problem: '',
				situation : '',
				next : ''
			};
			$scope.action = null;

			if (pfCallback) { pfCallback() };
		}

		$scope.$on('openLightBox', function (po$on, poSetting) {
			$scope.open(poSetting);
		})
	});

'use strict';

/**
 * @ngdoc function
 * @name AbsenceManager.Absence.controller:LightboxController
 * @description
 * # LightboxController
 * Controller of the AbsenceManager
 */
angular.module('AbsenceManager')
	.controller('LightboxController', function ($scope, $rootScope) {
		$scope.type = 'default';
		$scope.display = false;
		$scope.message = {
			type: '',
			problem: '',
			situation : '',
			next : ''
		};
		$scope.action = null;

		$scope.reset = function () {
			$scope.type = 'default';
			$scope.display = false;
			$scope.message = {
				type: '',
				problem: '',
				situation : '',
				next : ''
			};
			$scope.action = null;
		};

		$scope.open = function (poSetting) {
			$scope.reset();

			$scope.type = poSetting.type;
			$scope.display = true;
			$scope.message = {
				type: poSetting.message.type || '',
				situation : poSetting.message.situation,
				problem : poSetting.message.problem || '',
				next : poSetting.message.next || ''
			};
			$scope.action = poSetting.action;
		};

		$scope.close = function (pfCallback) {
			$scope.display = false;

			if (pfCallback) { 
				pfCallback();
			};
		};

		$scope.$on('openLightBox', function (po$on, poSetting) {
			$scope.open(poSetting);
		});
	});

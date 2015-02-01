'use strict';

angular
	.module('AbsenceManager')
	.controller('AbsenceInputController', function($log, $scope, $rootScope, AbsenceService) {
		$scope.absenceSubmit = {
			dateFrom : '',
			unitFrom : 'AM',
			dateTo: '',
			unitTo : 'AM',
			type : 'Vacation'
		};

		$scope.minDate = moment().add(1,'days').format("DD/MM/YYYY"); // tomorrow
		$scope.maxDate = moment().add(1,'days').add(1,'years').format("DD/MM/YYYY"); // next year

		$scope.focus = false;

		$scope.reset = function () {
			$scope.absenceSubmit = {
				dateFrom : '',
				unitFrom : 'AM',
				dateTo: '',
				unitTo : 'AM',
				type : 'Vacation'
			};
			$scope.inputAbsence.$setPristine();
		}

		$scope.request = function(){
			var submitParams = $scope.absenceSubmit;

			// STEP 1 - GET DATA
			AbsenceService.get().then(absenceCheckClashes, errorHandler);

			// STEP 2 or END - CHECK DATES
			function absenceCheckClashes (resolve) {
				return AbsenceService.checkClashes(resolve, submitParams)
				.then($scope.submit, errorHandler);
			}

			function errorHandler (reject) {
				if (reject.action) {
					reject.action.ok = $scope.submit;
				}

				$rootScope.$broadcast('openLightBox', reject);
			    return reject;
			}
		};

		$scope.submit = function () {
			var submitParams = $scope.absenceSubmit;

			AbsenceService
				.post(submitParams)
			    .then(
			    	function (resolve) {
						$rootScope.$broadcast('openLightBox', resolve);
						$scope.reset();	
			    	}, 
			    	function (reject) {
			    		$rootScope.$broadcast('openLightBox', reject);
			    	});
		}

		$scope.$on('submit', $scope.submit);
		$scope.$on('fillInput', function ($on, dateFrom, dateTo) {
			$scope.absenceSubmit.dateFrom = dateFrom;
			$scope.absenceSubmit.dateTo = dateTo;
			$scope.focus = true;
		})
	});
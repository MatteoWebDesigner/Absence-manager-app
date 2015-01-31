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

			// // STEP 3 - POST and END
			// function absencePost (resolve) {
			// 	return AbsenceService.post(submitParams)
			// 	.then(resolveHandler, errorHandler);
			// }

			function errorHandler (reject) {
				if (reject.action) {
					reject.action.ok = $scope.submit;
				}

				$rootScope.$broadcast('openLightBox', reject);
			    return reject;
			}

			// function resolveHandler (resolve) {
			// 	$rootScope.$broadcast('openLightBox', resolve);
			// 	$scope.reset();	
			// }
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
	});
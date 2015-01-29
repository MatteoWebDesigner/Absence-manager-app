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

		var ngAbsenceSubmit = angular.copy($scope.absenceSubmit);

		$scope.minDate = moment().add(1,'days').format("DD/MM/YYYY"); // tomorrow
		$scope.maxDate = moment().add(1,'days').add(1,'years').format("DD/MM/YYYY"); // next year

		$scope.reset = function () {
			$scope.absenceSubmit = ngAbsenceSubmit;
			$scope.inputAbsence.$setPristine();
		}

		$scope.request = function(){
			var submitParams = this.absenceSubmit;

			AbsenceService
				.get()
			    
			    // check Dates Clashes
			    .then(
			    	function (resolve) {
			    		return AbsenceService.checkClashes(resolve, submitParams);
			    }, 
			    	function (reject) {
			    		$rootScope.$broadcast('openLightBox', reject);
			    })

			    // POST Dates
			    .then(
			    	function (resolve) {
			    		return AbsenceService.post(resolve);
			    }, 
			    	function (reject){ 
			    		$rootScope.$broadcast('openLightBox', reject);
			    })

			    // POST Response
			    .then(
			    	function (resolve) {
						$rootScope.$broadcast('openLightBox', resolve);
						$scope.reset();
			    },
			    	function (reject) {
			    		$rootScope.$broadcast('openLightBox', reject);
			    });
		};

		$scope.submit = function () {
			var submitParams = this.absenceSubmit;

			AbsenceService
				.post()
			    .then(
			    	function (resolve) {
			    		return resolve;
			    }, 
			    	function (reject) {
			    		return reject;
			    });
		}
	});
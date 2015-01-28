'use strict';

angular
	.module('AbsenceManager')
	.controller('AbsenceInputController', function($log, $scope, AbsenceService) {
		$scope.absenceSubmit = {
			dateFrom : '',
			unitFrom : 'AM',
			dateTo: '',
			unitTo : 'AM',
			type : 'Vacation'
		};

		//AbsenceService.get();
		var tomorrow = moment().add(1,'days');
		var nextYear = moment(tomorrow).add(1,'years')

		$scope.minDate = tomorrow.format("DD/MM/YYYY");
		$scope.maxDate = nextYear.format("DD/MM/YYYY");

		$scope.request = function(){
			var submitParams = this.absenceSubmit;

			AbsenceService
				.get()
			    .then(
			    	function (resolve) {
			    		return AbsenceService.checkClashes(resolve, submitParams)
			    }, 
			    	function (reject) {
			    		return 'get does not get'
			    })
			    .then(
			    	function (resolve) {
			    		return AbsenceService.post(resolve)
			    }, 
			    	function (reject){
			    		return 'Absence clash'
			    });
		};
	});
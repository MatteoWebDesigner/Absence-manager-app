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
			    
			    // check Dates Clashes
			    .then(
			    	function (resolve) {
			    		return AbsenceService.checkClashes(resolve, submitParams);
			    }, 
			    	function (reject) {
			    		return alert(reject);
			    })

			    // POST Dates
			    .then(
			    	function (resolve) {
			    		return AbsenceService.post(resolve);
			    }, 
			    	function (reject){
			    		return alert(reject);
			    })

			    // POST Response
			    .then(
			    	function (resolve) {
						return alert(resolve);
			    },
			    	function (reject) {
			    		return alert(reject);
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
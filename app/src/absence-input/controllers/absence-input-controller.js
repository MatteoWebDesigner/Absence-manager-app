'use strict';

angular
	.module('AbsenceManager')
	.controller('AbsenceInputController', function($scope, AbsenceService) {
		$scope.absenceSubmit = {
			unitFrom : 'AM',
			unitTo : 'AM',
			type : 'Vacation'
		};

		//AbsenceService.get();
		var tomorrow = moment().add(1, 'days');
		var nextYear = tomorrow.add(1, 'years')

		$scope.minDate = tomorrow.format("DD/MM/YYYY");
		$scope.maxDate = nextYear.format("DD/MM/YYYY");

		$scope.request = function(){
			AbsenceService.post(this.absenceSubmit);
		};
	});
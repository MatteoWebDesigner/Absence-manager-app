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
		var tomorrow = moment().add(1, 'days');
		var nextYear = moment(tomorrow).add(1, 'years')

		$scope.minDate = tomorrow.format("DD/MM/YYYY");
		$scope.maxDate = nextYear.format("DD/MM/YYYY");

		$scope.request = function(){
			AbsenceService
			    .submit(this.absenceSubmit, $scope.$parent.currentUser)
			    .then(function(res) {
			            $log.debug('request()', res);
			        });
		};
	});
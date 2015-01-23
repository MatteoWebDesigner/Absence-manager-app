'use strict';

angular
	.module('AbsenceManager')
	.directive('absenceInput', function () {
		return {
			  retrict: 'E'
			, templateUrl: 'src/absence-input/views/absence-input.html'
		};
	});
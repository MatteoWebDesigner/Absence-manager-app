'use strict';

angular
	.module('AbsenceManager')
	.directive('calendarAbsenceIntensity', function () {
		return {
			  retrict: 'E'
			, templateUrl: 'src/absence-calendar/views/absence-calendar.html'
		};
	});
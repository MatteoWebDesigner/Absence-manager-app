'use strict';

angular
	.module('AbsenceManager')
	.directive('calendarAbsenceDensity', function () {
		return {
			  retrict: 'E'
			, replace: true
			, templateUrl: '/src/absence-calendar/views/absence-calendar.html'
		};
	});
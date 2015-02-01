'use strict';

angular
	.module('AbsenceManager')
	.directive('calendarAbsenceDensity', function () {
		return {
			  retrict: 'E'
			, replace: true
			, controller: 'CalendarController'
			, templateUrl: '/src/absence-calendar/views/absence-calendar.html'
			, link: function($scope, iElm, iAttrs, controller) {}
		};
	});
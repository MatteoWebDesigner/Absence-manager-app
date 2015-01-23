'use strict';

angular
	.module('AbsenceManager')
	.directive('chartAbsenceIntensity', function () {
		return {
			  retrict: 'E'
			, templateUrl: '/src/absence-chart/views/absence-chart.html'
		};
	});
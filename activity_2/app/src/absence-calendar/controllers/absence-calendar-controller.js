'use strict';

angular
	.module('AbsenceManager')
	.controller('CalendarController', function($scope, AbsenceService){
		var monthData = [];
		
		var year = moment().year()
		var indexMonth =  moment().month();
		var nameMonth = moment(indexMonth).format('MMMM');
		var lngMonth = moment().endOf("month").date();

		// service
		for (var i = 0; i < lngMonth; i++) {
			var date = moment({d:i+1, m:indexMonth, y:year});
			var dayOfWeek = date.days();

			var isWeekend = (dayOfWeek == 6) || (dayOfWeek == 0);
			if (isWeekend) { continue; }

			// create object
			monthData.push({
				fullDate : date.format('DD/MM/YYYY'),
				number : date.date(),
				user : [{},{}],
				am : [],
				pm : []
			});
		}

		// public scope
		$scope.MonthData = monthData;
		$scope.indexMonth = indexMonth;
		$scope.nameMonth = nameMonth;
	});
'use strict';

angular
	.module('AbsenceManager')
	.controller('CalendarController', function($scope, $rootScope, Config, AbsenceService){
		$scope.MonthData = [];

		$scope.CalendarDate = moment().set({
			'year': moment().year(), 
			'month': moment().month(),
			'date': 1
		});

		$scope.year = $scope.CalendarDate.year();
		$scope.indexMonth = $scope.CalendarDate.month();
		$scope.nameMonth = $scope.CalendarDate.format('MMMM');

		$scope.selectableOn = false;
		
		// init
		AbsenceService.get()
			.then(function (res) {
				$scope.MonthData = AbsenceService.MonthDataCalendar($scope.CalendarDate);
			});

		$scope.prevMonth = function () {
			// set date
			$scope.CalendarDate.subtract('1','month');

			// change view
			$scope.year = $scope.CalendarDate.year();
			$scope.indexMonth = $scope.CalendarDate.month();
			$scope.nameMonth = $scope.CalendarDate.format('MMMM');

			$scope.MonthData = AbsenceService.MonthDataCalendar($scope.CalendarDate);
		}

		$scope.nextMonth = function () {
			// set date
			$scope.CalendarDate.add('1','month');

			// change view
			$scope.year = $scope.CalendarDate.year();
			$scope.indexMonth = $scope.CalendarDate.month();
			$scope.nameMonth = $scope.CalendarDate.format('MMMM');

			$scope.MonthData = AbsenceService.MonthDataCalendar($scope.CalendarDate);
		}

		// calendar selection
		var calendarSelection = {
			clinkCount : 0,
			startPoint : null,
			endPoint : null
		}

		$scope.activateSelection = function ($index, psDate) {
			if (calendarSelection.clinkCount == 0) {
				$scope.MonthData[$index].selected = true;

				calendarSelection.startPoint = {
					date : psDate,
					index : $index
				}

				calendarSelection.clinkCount++;
				$scope.selectableOn = true;
			} 

			else {
				calendarSelection.endPoint = {
					date : psDate,
					index : $index
				}

				tempSelection($index); // on mouse over does not work

				var startdate = calendarSelection.startPoint.date;
				var endPoint = calendarSelection.endPoint.date;

				var startdateFormatted = moment(calendarSelection.startPoint.date, Config.dateFormat);
				var endPointFormatted = moment(calendarSelection.endPoint.date, Config.dateFormat);

				var dateFrom = startdateFormatted <= endPointFormatted ? startdate : endPoint;
				var dateTo = startdateFormatted >= endPointFormatted ? startdate : endPoint;

				$rootScope.$broadcast('fillInput', dateFrom, dateTo)

				calendarSelection.clinkCount--;
				$scope.selectableOn = false;
			}
		}

		function tempSelection (end$index) {
			if (!$scope.selectableOn) {
				return false;
			}
			var start$index = calendarSelection.startPoint.index;

			var lngMonthData = $scope.MonthData.length;
			for (var i = 0; i < lngMonthData; i++) {
				if ( (i >= start$index && i <= end$index) || (i >= end$index && i <= start$index) ) {
					$scope.MonthData[i].selected = true;
				} else {
					$scope.MonthData[i].selected = false;
				}
			}
		}
	});
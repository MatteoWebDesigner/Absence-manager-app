'use strict';

angular
	.module('AbsenceManager')
	.controller('CalendarController', function($scope, AbsenceService){
		$scope.year = moment().year();
		$scope.indexMonth = moment().month();
		$scope.nameMonth = moment($scope.indexMonth).format('MMMM');
		
		$scope.CalendarDate = moment().set({
			'year': $scope.year, 
			'month': $scope.indexMonth,
			'date': 1
		});

		//$scope.MonthData = AbsenceService.MonthCalendar($scope.indexMonth, $scope.year);

		$scope.prevMonth = function () {
			$scope.CalendarDate.subtract('1','month');
			$scope.year = $scope.CalendarDate.year();
			$scope.nameMonth = $scope.CalendarDate.format('MMMM');

			$scope.MonthData = AbsenceService.MonthCalendar($scope.CalendarDate.month(), $scope.CalendarDate.year());
		}

		$scope.nextMonth = function () {
			$scope.CalendarDate.add('1','month');
			$scope.year = $scope.CalendarDate.year();
			$scope.nameMonth = $scope.CalendarDate.format('MMMM');

			$scope.MonthData = AbsenceService.MonthCalendar($scope.CalendarDate.month(), $scope.CalendarDate.year());
		}
	});
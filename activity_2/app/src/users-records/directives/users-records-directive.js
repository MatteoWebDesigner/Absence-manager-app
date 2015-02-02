'use strict';

angular
	.module('AbsenceManager')
	.directive('usersRecords', function () {
		return {
			  retrict: 'E'
			, replace: true
			, controller : 'UsersRecordsController'
			, templateUrl: '/src/users-records/views/users-records.html'
			, link : function (scope, element, attrs) {

			}
		};
	});
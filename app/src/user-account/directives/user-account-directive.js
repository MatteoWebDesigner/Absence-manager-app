'use strict';

angular
	.module('AbsenceManager')
	.directive('userAccount', function () {
		return {
			  retrict: 'E'
			, replace: true
			, templateUrl: '/src/user-account/views/user-account.html'
		};
	});
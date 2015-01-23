'use strict';

angular
	.module('AbsenceManager')
	.directive('userAccount', function () {
		return {
			  retrict: 'E'
			, templateUrl: 'src/user-account/views/user-account.html'
		};
	});
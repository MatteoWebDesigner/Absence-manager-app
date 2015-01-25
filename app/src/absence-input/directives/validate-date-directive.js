'use strict';

angular
	.module('AbsenceManager')
	.directive('validateDate', function ($log) {
		return {
			  retrict: 'A'
			, require: 'ngModel'
			, link : function (scope, element, attrs, ctrl) {
				$log(scope, element, attrs, ctrl);

				ctrl.$validators.validDate = function(modelValue, viewValue) {
				    var date = moment(viewValue);
				    var isDate = true;
				    var minDate = 0;//attr.min;
				    var maxDate = 0;//attr.max;


				    if (isDate & date >= minDate & date <= maxDate) {
				        // it is valid
				        return true;
				    }

				    // it is invalid
				    return false;
				};
			}
		};
	});
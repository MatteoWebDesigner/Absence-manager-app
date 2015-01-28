'use strict';

angular
	.module('AbsenceManager')
	.directive('validDate', function ($log) {
		return {
			  retrict: 'A'
			, require: 'ngModel'
			, link : function (scope, element, attrs, ctrl) {
				
				ctrl.$validators.validdate = function(modelValue, viewValue) {
				    var date = moment(viewValue, 'DD/MM/YYYY');
				    var MinDate = moment(attrs.min, 'DD/MM/YYYY');
				    var MaxDate = moment(attrs.max, 'DD/MM/YYYY');
				    var optionDateCheck = moment(attrs.validDate, 'DD/MM/YYYY');

				    var isDate = moment(viewValue, 'DD/MM/YYYY', true).isValid();
				    var isGreaterMinDate = date >= MinDate;
				    var isLowerMaxDate = date <= MaxDate;

				    if (attrs.validDate != '' && date < optionDateCheck) {
						return false;
				    }

				    if (isDate & isGreaterMinDate & isLowerMaxDate) {
				        return true;
				    }

				    return false;
				};
			}
		};
	});
'use strict';

angular
	.module('AbsenceManager')
	.directive('validDate', function ($log, Config) {
		return {
			  retrict: 'A'
			, require: 'ngModel'
			, link : function (scope, element, attrs, ctrl) {
				
				ctrl.$validators.validdate = function (modelValue, viewValue) {
				    var date = moment(viewValue, Config.dateFormat);
				    var MinDate = moment(attrs.min, Config.dateFormat);
				    var MaxDate = moment(attrs.max, Config.dateFormat);
				    var optionDateCheck = moment(attrs.validDate, Config.dateFormat);

				    var isDate = moment(viewValue, Config.dateFormat, true).isValid();
				    var isGreaterMinDate = date >= MinDate;
				    var isLowerMaxDate = date <= MaxDate;

				    if (!isGreaterMinDate || !isLowerMaxDate) {
				    	return false;
				    }

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
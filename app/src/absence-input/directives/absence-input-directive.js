'use strict';

angular
	.module('AbsenceManager')
	.directive('absenceInput', function () {
		return {
			  retrict: 'E'
			, replace: true
			, templateUrl: '/src/absence-input/views/absence-input.html'
			, scope : { name: '=name' }
			, link : function (scope, element, attrs) {
				var name = attrs.name;

				element.eq(0).addClass(name);
				
				var elm$LabelsList = element.find('label');
				var elm$InputsList = element.find('input');

				for (var i = elm$LabelsList.length - 1; i >= 0; i--) {
					// map elements
					var elm$Label = elm$LabelsList.eq(i);
					var elm$Input = elm$InputsList.eq(i);

					// create string
					var string = elm$Label.attr('for');
					string = name + '-' + string;
					
					// replace for and id
					elm$Label.attr('for', string);
					elm$Input.attr('id', string);
				};
			}
		};
	});
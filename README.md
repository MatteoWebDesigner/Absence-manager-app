# Mudano

install node module and bower library
> npm install & bower install

## App Folder Structure
	index.html
	app.js
		/dump/
			name.json
			
		/src/
			/common/
				/assets/
					/styles/
					/images/
				{{repeat component's folders}}
			
			/component/
				/services/
					name-service.js
				/directives/
					name-directive.js
				/controllers/
					name-controller.js
				/views/
					name.html
				name.js /* if the scripts are just few */

			/sub-module/
				/common/
					{{repeat common's folders}}

				/component/
					{{repeat component's folders}}

				{{repeat sub-module's folders}}


// implement this for sorting
var Absences = [
	{date:'01/01/2015', ambsence: ['Matteo','Alberto']},
	{date:'02/01/2015', ambsence: ['Alberto']},
	{date:'03/01/2015', ambsence: ['Carlo']}
];

var index = Absences.map(function(e){return e.date}).indexOf('01/01/2015');

TODO add limit Absence

linechart
http://codepen.io/sravikiran/pen/wFEvH
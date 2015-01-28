# Mudano

- Author: <info@matteowebdesigner.com>
- Date created: 21/01/2015


# Installation

## Requirements:

### Node.js & npm
Probably already installed on your computer
If not, visit <http://nodejs.org/download/> to get the latest node.js and npm


### Grunt

	> npm install -g grunt grunt-cli

### Yeoman:

	> npm install -g yo

### install node modules and bower libraries
	
	> npm install & bower install


## Environments

### Web App Folder Structure
	index.html
	app.js
		/dump/
			name.json
		
		/vendor/

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

### URL
- PRD: <http://matteowebdesigner.com/test/mudano/>
# Setting up the project
The project uses the [git flow](http://nvie.com/posts/a-successful-git-branching-model/) method to implement the continuous integration.
All development should be done on `development` branch. New features goes to `feature/newfeature` and hotfixes to `hotfix/newhotfix`.

When all development done, all features shoud be merged to development branch. Then, development should be merged to `master`.


# Testing project

## TODO


# Data and E2E Testing

## TODO


# Building project

Use Grunt for build Production web app

	> grunt build


# How it works

## TODO


# TO DO
TODO improve form validation dates do more test
TODO add validation even on the UNIT select input
TODO add limit Absence
TODO select and display absences user
TODO Density chart http://codepen.io/sravikiran/pen/wFEvH
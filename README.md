# Absence manager tool

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

### Run the server
	> Grunt serve

### Access Node Server from outside
Configure window firewall. Add a port 1337. 
If you want view the web app on another device use the IPv4 is using the machine is running the node server and add the port Address 
You can get the IPv4 on Windows typing on your cmd
	> ipconfig

e.g.: 192.186.2.90:1337

reference:
<http://userx.co.za/journal/accessing-grunt-connect-server-on-wifi-network>
<http://www.mobitechie.com/android-2/how-to-access-localhost-on-android-over-wifi/>

### URL
- localhost: <http://localhost:1337/>
- PRD: <http://matteowebdesigner.com/test/absence-manager-app/>
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


# Technology
Mobily first & Responsive
Less
CSS3 and transition
Session Storage
D3
Angular
Angular generator
grunt ng template
Yeoman
Grunt


# TO DO
TODO Density chart
TODO create toolip
TODO improve form validation dates do more test
TODO add validation even on the UNIT select input
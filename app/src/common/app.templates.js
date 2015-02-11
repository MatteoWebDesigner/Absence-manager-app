angular.module('AbsenceManager').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/src/absence-calendar/views/absence-calendar.html',
    "<div><div class=controller><button ng-click=prevMonth()><span class=arrow>Prev Month</span></button><div class=title>{{nameMonth}} {{year}}</div><button ng-click=nextMonth()><span class=arrow>Next Month</span></button></div><ul class=\"display clear\"><li class=day ng-repeat=\"day in MonthData\" ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t'selection-absence' : day.selected,\r" +
    "\n" +
    "\t\t\t\t'active-am' : day.am.listUsersAbsent.length,\r" +
    "\n" +
    "\t\t\t\t'active-pm' : day.pm.listUsersAbsent.length\r" +
    "\n" +
    "\t\t\t}\" ng-click=\"activateSelection($index, day.fullDate)\"><div class=am ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t'active-am' : day.am.listUsersAbsent.length, \r" +
    "\n" +
    "\t\t\t\t'user-absence' : day.am.isUserAbsent,\r" +
    "\n" +
    "\t\t\t\t'others-absence' : day.am.listUsersAbsent.length\r" +
    "\n" +
    "\t\t\t}\"></div><div class=pm ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t'active-pm' : day.pm.listUsersAbsent.length, \r" +
    "\n" +
    "\t\t\t\t'user-absence' : day.pm.isUserAbsent,\r" +
    "\n" +
    "\t\t\t\t'others-absence' : day.pm.listUsersAbsent.length\r" +
    "\n" +
    "\t\t\t}\"></div><div class=number>{{ day.number }}</div><div class=absent-user-number>{{ day.users.length }} <i class=\"fa fa-user\"></i></div></li></ul><ul class=legend><li><i class=dot></i> No absence</li><li class=user-absence><i class=dot></i> User absence</li><li class=others-absence><i class=dot></i> Others absence</li></ul></div>"
  );


  $templateCache.put('/src/absence-chart/views/absence-chart.html',
    "<div><div class=controller><button><span class=arrow>Prev Year</span></button><div class=title>2015</div><button><span class=arrow>Next Year</span></button></div><div id=display></div></div>"
  );


  $templateCache.put('/src/absence-input/views/absence-input.html',
    "<div><form name=inputAbsence class=clear novalidate><label for=form-absence-input-from class=dateTo><span class=text-label>From</span> <input id=form-absence-input-from placeholder=DD/MM/YYYY autofocus name=dateFrom maxlength=10 ng-model=absenceSubmit.dateFrom valid-date min={{minDate}} max={{maxDate}} required><select class=unit ng-model=absenceSubmit.unitFrom><option>AM</option><option>PM</option></select></label><label for=form-absence-input-to class=dateFrom><span class=text-label>To</span> <input id=form-absence-input-to placeholder=DD/MM/YYYY name=dateTo maxlength=10 ng-model=absenceSubmit.dateTo valid-date=\"{{ absenceSubmit.dateFrom }}\" min={{minDate}} max={{maxDate}} required><select class=unit ng-model=absenceSubmit.unitTo><option>AM</option><option>PM</option></select></label><label for=form-absence-input-type class=type><select id=form-absence-input-type class=unit ng-model=absenceSubmit.type><option value=W>Present</option><option value=V>Vacation</option><option value=P>Public Holiday</option><option value=T>Training</option></select></label><div class=saveDate><button class=\"btn btn-primary btn-lg btn-block\" ng-click=\"inputAbsence.$valid && request()\">Request</button></div></form></div>"
  );


  $templateCache.put('/src/common/views/main.html',
    "<div class=container><div class=row><div class=col-md-12><div id=absence-input><h1>Insert your absence period:</h1><absence-input name=page></absence-input></div></div></div><div class=row><div class=col-md-7><div id=calendar><h3>Team Absence Calendar</h3><calendar-absence-density></calendar-absence-density></div><div id=users-records><h3>View User Absences</h3><users-records></users-records></div></div><div class=col-md-5><div id=chart><h3>Team density absence</h3><chart-absence-density></chart-absence-density></div></div></div></div>"
  );


  $templateCache.put('/src/lightbox/views/lightbox.html',
    "<div id=lightbox class={{type}} ng-show=display><div class=container><div class=row><div class=col-md-12 ng-switch=type><div ng-switch-when=alert><i class=\"fa fa-exclamation-triangle\"></i><h2>Alert !</h2><p>{{message.situation}}</p><p ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t\t\t'bg-warning' : message.type == 'warning',\r" +
    "\n" +
    "\t\t\t\t\t\t'bg-danger' : message.type == 'danger'\r" +
    "\n" +
    "\t\t\t\t\t}\">{{message.problem}}</p><p>{{message.next}}</p><button class=\"btn btn-primary\" ng-click=close(action.cancel)>Cancel</button> <button class=\"btn btn-primary\" ng-click=close(action.ok)>OK</button></div><div ng-switch-default><i class=\"fa fa-info-circle\"></i><h2>Info:</h2><p>{{message.situation}}</p><button class=\"btn btn-primary\" ng-click=close(action.ok)>OK</button></div></div></div></div></div>"
  );


  $templateCache.put('/src/user-account/views/login.html',
    "<div class=\"container login\"><p>You can type every username and password, everything will work. You will log in as</p><p>{ name: <strong>'Matthew Webb'</strong>, id : '1' }</p><form name=loginForm ng-controller=LoginController ng-submit=login(credentials) novalidate><label><span class=text-label>Username:</span> <input ng-model=credentials.username></label><label for=password><span class=text-label>Password:</span> <input type=password ng-model=credentials.password></label><button type=submit class=\"btn btn-primary btn-lg btn-block\">Login</button></form></div>"
  );


  $templateCache.put('/src/users-records/views/users-records.html',
    "<div><select ng-model=userSelected ng-options=\"user.userid as user.name for user in listUsers\"></select><ul><li ng-repeat=\"record in listRecords\">{{record.date}} - {{record.unit}} - {{record.value}}</li><li ng-if=\"listRecords.length == 0\">empty records</li></ul></div>"
  );

}]);

angular.module('AbsenceManager').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/src/absence-calendar/views/absence-calendar.html',
    "<div><div class=controller><button><span class=arrow>Prev Month</span></button><div class=title>January</div><button><span class=arrow>Next Month</span></button></div><ul class=\"display clear\"><li class=day ng-repeat=\"day in MonthData\" ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t'active-am' : day.am.length,\r" +
    "\n" +
    "\t\t\t\t'active-pm' : day.pm.length\r" +
    "\n" +
    "\t\t\t}\"><div class=am ng-class=\"{\r" +
    "\n" +
    "\t\t\t\t'active-am' : day.am,\r" +
    "\n" +
    "\t\t\t\t'active-pm' : day.pm\r" +
    "\n" +
    "\t\t\t}\"></div><div class=pm></div><div class=number>{{ day.number }}</div><div class=absent-user-number>{{ day.user.length }} <i class=\"fa fa-user\"></i></div><absence-input name=tooltip class=tooltip></absence-input></li></ul><ul class=legend><li><i class=dot></i> No absence</li><li class=user-absence><i class=dot></i> User absence</li><li class=others-absence><i class=dot></i> Others absence</li></ul></div>"
  );


  $templateCache.put('/src/absence-chart/views/absence-chart.html',
    "<div><div class=controller><button><span class=arrow>Prev Year</span></button><div class=title>2015</div><button><span class=arrow>Next Year</span></button></div><div id=display></div></div>"
  );


  $templateCache.put('/src/absence-input/views/absence-input.html',
    "<div><form name=inputAbsence novalidate><label for=form-absence-input-from class=dateTo><span class=text-label>From</span> <input id=form-absence-input-from placeholder=DD/MM/YYYY autofocus name=dateFrom maxlength=10 ng-model=absenceSubmit.dateFrom ng-model-options=\"{ updateOn: 'blur' }\" valid-date min={{minDate}} max={{maxDate}} required><select class=unit ng-model=absenceSubmit.unitFrom><option>AM</option><option>PM</option></select></label><label for=form-absence-input-to class=dateFrom><span class=text-label>To</span> <input id=form-absence-input-to placeholder=DD/MM/YYYY name=dateTo maxlength=10 ng-model=absenceSubmit.dateTo ng-model-options=\"{ updateOn: 'blur' }\" valid-date=\"{{ absenceSubmit.dateFrom }}\" min={{minDate}} max={{maxDate}} required><select class=unit ng-model=absenceSubmit.unitTo><option>AM</option><option>PM</option></select></label><label for=form-absence-input-type class=type><select id=form-absence-input-type class=unit ng-model=absenceSubmit.type><option>Present</option><option>Vacation</option><option>Public Holiday</option><option>Training</option></select></label><div class=saveDate><button class=\"btn btn-primary btn-lg btn-block\" ng-click=\"inputAbsence.$valid && request()\">Request</button></div></form></div>"
  );


  $templateCache.put('/src/common/views/main.html',
    "<div class=container><div class=row><div class=col-md-12><div id=absence-input><h1>Insert your absence period:</h1><absence-input name=page></absence-input></div></div></div><div class=row><div class=col-md-7><div id=calendar><h3>Team Absence Calendar</h3><calendar-absence-density></calendar-absence-density></div></div><div class=col-md-5><div id=chart><h3>Team density absence</h3><chart-absence-density></chart-absence-density></div></div></div></div>"
  );


  $templateCache.put('/src/user-account/views/login.html',
    "<div class=container><p>You can type every username and password, everything will work. You will be log in as { name: 'Matthew Webb', id : '1' }</p><form name=loginForm ng-controller=LoginController ng-submit=login(credentials) novalidate><label for=username>Username:</label><input id=username ng-model=credentials.username><label for=password>Password:</label><input type=password id=password ng-model=credentials.password> <button type=submit>Login</button></form></div>"
  );

}]);

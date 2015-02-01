'use strict';

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function($log, $q, $http, Config, Session) {
        // Private
        function checkAbsenceDate (psFullDate, psUnit) {
            var saveDateMatch = [];
            var result = Service.Data.map(function(obj, index, array){
                if (
                    psFullDate === obj.date &&
                    psUnit === obj.unit
                ) {
                    saveDateMatch.push(obj);
                }

                // DD/MM/YYYY-AM
                return obj.date + '-' + obj.unit;
            }).indexOf(psFullDate + '-' + psUnit);

            return (result >= 0);
        };

        function getListAbsentUser (psFullDate) {
            var listUser = [];
            var listUserByID = {};

            Service.Data.map(function(obj, index, array){
                var userid = obj.userid

                if (
                    psFullDate === obj.date &&
                    listUserByID[userid] === undefined
                ) {
                    var newObj = {
                        "userid": userid,
                        "name": obj.name
                    }

                    listUserByID[userid] = newObj;
                    listUser.push(newObj);
                }

            })

            return listUser;
        }

        function getDateAbsence (psFullDate, psUnit, pnUserid) {
            var listAbsences = [];
            var isUserAbsent = false;

            Service.Data.map(function(obj, index, array){
                if (
                    psFullDate === obj.date &&
                    psUnit === obj.unit
                ) {
                    listAbsences.push(obj);

                    if ( obj.userid === pnUserid) {
                        isUserAbsent = true;
                    }
                }

                return obj.userid;
            });

            return {
                isUserAbsent : isUserAbsent,
                listUsersAbsent : listAbsences
            };
        }

        // Public
        var Service = {};

        Service.Data = [];

        Service.get = function () {
            var deferred = $q.defer();
            
            $http.get('dump/absences.json')
                .success(function(data, status, headers, config) {
                    Service.Data = data;

                    deferred.resolve(data, status, headers, config);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject({
                        type : 'default',
                        message : {
                            situation : 'Data Not found!'
                        }
                    });
                });

            return deferred.promise;
        };

        Service.post = function (poSubmitParams) {
            var deferred = $q.defer();

            // emulate the server response
            setTimeout(function() {
                
                // response from the server
                $log.debug('EXAMPLE SERVER UPDATE REQUEST', poSubmitParams);
                deferred.resolve({
                    type : 'default',
                    message : {
                        situation : 'Your Absence ' + poSubmitParams.dateFrom + ' ' + poSubmitParams.unitFrom + ' to ' + poSubmitParams.dateTo + ' ' + poSubmitParams.unitTo + ' (' + poSubmitParams.type + ') submission is completed.'
                    }
                });

            }, 200);

            return deferred.promise;
        };

        Service.checkClashes = function (poaAbsenceData, poSubmitParams) {
            var deferred = $q.defer();

            var $this = this;

            if ( !hasEnoughHoliday() ) {
                deferred.reject({
                    type : 'default',
                    message : {
                        situation : 'You do not have enough holidays left!'
                    }
                });
            }

            if ( this.selectRangeDate('overlap', poSubmitParams) ) {
                deferred.reject({
                    type : 'alert',
                    message : {
                        type : 'danger',
                        situation : 'The dates you are going to request are:' ,
                        problem : 'Overlaps with another user',
                        next : 'Do you still want submit your Absence request?'
                    },
                    action : {
                        ok : function () {
                            $this.post(poSubmitParams);
                        }
                    }
                });
            }

            else if ( this.selectRangeDate('near', poSubmitParams, {rangeDay:1}) ) {
                deferred.reject({
                    type : 'alert',
                    message : {
                        type : 'warning',
                        situation : 'The dates you are going to request are:' ,
                        problem : 'Adjacent to another user',
                        next : 'Do you still want submit your Absence request?'
                    },
                    action : {
                        ok : function () {
                            $this.post(poSubmitParams);
                        }
                    }
                });
            }

            else if ( this.selectRangeDate('near', poSubmitParams, {rangeDay:4}) ) {
                deferred.reject({
                    type : 'alert',
                    message : {
                        type : 'warning',
                        situation : 'The dates you are going to request are:' ,
                        problem : 'Within 4 days of another user',
                        next : 'Do you still want submit your Absence request?'
                    },
                    action : {
                        ok : function () {
                            $this.post(poSubmitParams);
                        }
                    }
                });
            } 

            else {
                deferred.resolve(poSubmitParams);
            }

            return deferred.promise;

            function hasEnoughHoliday () {
                var dateFrom = moment(poSubmitParams.dateFrom, Config.dateFormat);
                var dateTo = moment(poSubmitParams.dateTo, Config.dateFormat);
                var holidaysRequested = dateTo.diff(dateFrom, 'days') + 1;

                return Session.user.daysOffLeft >= holidaysRequested;
            }
        };

        Service.selectRangeDate = function (psMethodName, poSubmitParams, poMethodParams) {
            var startDate = moment(poSubmitParams.dateFrom, Config.dateFormat);
            var endDate = moment(poSubmitParams.dateTo, Config.dateFormat);
            var lngDays = endDate.diff(startDate, 'days') + 1;

            // methods
            var methods = {
                "overlap": overlap,
                "near" : near
            };

            return methods[psMethodName](poSubmitParams, poMethodParams);

            function overlap (poSubmitParams) {
                // scope variables
                var result = false;
                var dateInstance = moment(startDate);

                $log.debug('StartDate: ' + startDate.format(Config.dateFormat) + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDate.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                
                // loop
                // I used two index one is for alternate the Unit and the other one is for increase the Date
                for (var i = 0, j = 0; i < lngDays;) {
                    
                    // first date do 'PM'
                    if (i == 0 && poSubmitParams.unitFrom == 'PM') {
                        i += 0.5; // increase day + 0.5
                        j += 0.5; // increase day + 0.5
                    }

                    // logic check
                    var dateFrequence = Number.isInteger(i) && i > 0 ? 1 : 0;
                    var unitFrequence = Number.isInteger(j) ? 0 : 1;

                    dateInstance.add(dateFrequence, 'day'); // when i is even increase one day
                    var unit = unitFrequence ? 'PM' : 'AM'; // numbers odd = 'PM' & even = 'AM'

                    result = checkAbsenceDate(
                        dateInstance.format(Config.dateFormat),
                        unit
                    ); 
                    
                    if (result) { 
                        return result;
                    };

                    $log.debug('date checked: ' + dateInstance.format(Config.dateFormat) + '-' + unit, ' i = ' + i + ' j = ' + j);

                    // last date do 'AM'
                    if (i == lngDays -1 && poSubmitParams.unitTo == 'AM') {
                        i += 1; // increase day + 0.5
                    }

                    // loop increase indexes do 'AM' and 'PM'
                    i += 0.5; // increase day + 0.5
                    j += 0.5; // change unit  + 0.5
                }

                return false;
            };

            function near (poSubmitParams, poParams) {
                // scope variables
                var result = false;

                var dateInstance = null;
                var startDateInstance = moment(startDate);
                var endDateInstance = moment(endDate);

                var lngDays = poParams.rangeDay;
                var lngLoop = lngDays * 2;

                $log.debug('StartDate: ' + startDateInstance.format(Config.dateFormat) + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDateInstance.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                
                // loop
                // I used two index one is for alternate the Unit and the other one is for increase the Date
                for (var i = 0, j = 0; i < lngLoop;) {
                    // logic check
                    var dateFrequence = Number.isInteger(i) ? 1 : 0;
                    var unitFrequence = Number.isInteger(j) ? 0 : 1;

                    // choose date
                    if (i < lngDays) {
                        startDateInstance.subtract(dateFrequence,'day');
                        dateInstance = startDateInstance;
                    } else {
                        endDateInstance.add(dateFrequence,'day');
                        dateInstance = endDateInstance;
                    }

                    var unit = unitFrequence ? 'PM' : 'AM'; // numbers odd = 'PM' & even = 'AM'

                    result = checkAbsenceDate(
                        dateInstance.format(Config.dateFormat),
                        unit
                    ); 
                    
                    if (result) { 
                        return result;
                    };

                    $log.debug('date checked: ' + dateInstance.format(Config.dateFormat) + '-' + unit, ' i = ' + i + ' j = ' + j);

                    // loop increase indexes do 'AM' and 'PM'
                    i += 0.5; // increase day + 0.5
                    j += 0.5; // change unit  + 0.5
                }

                return false;
            }
        };

        Service.getUserAbsences = function (pnUserId) {
            var listAbsence = [];
            var absenceCount = 0;

            Service.Data.map(function(obj, index, array){
                if (obj.userid == pnUserId) {
                    listAbsence.push(obj);
                    absenceCount += 0.5;
                }

            })

            return {
                list : listAbsence,
                count : absenceCount,
            };   
        }

        Service.MonthDataCalendar = function (poFullDate) {
            var MonthData = [];

            var userdid = Session.user.id;
            var iDateMonth = moment(poFullDate, Config.dateFormat);
            var lngMonth = iDateMonth.daysInMonth();

            for (var i = 1; i <= lngMonth; i++) {
                iDateMonth.set('date', i);
                var dayNumberDate = iDateMonth.date();
                var fullDate = iDateMonth.format(Config.dateFormat);
                
                var dayOfWeek = iDateMonth.days();
                if (dayOfWeek == 6 || dayOfWeek == 0) { // skip week-end
                    continue; 
                }

                // create object
                MonthData.push({
                    selected : false,
                    fullDate : fullDate,
                    number : dayNumberDate,
                    users : getListAbsentUser(fullDate),
                    am : getDateAbsence(fullDate,'AM', userdid),
                    pm : getDateAbsence(fullDate,'PM', userdid)
                });
            }

            return MonthData;
        };

        return Service;
});
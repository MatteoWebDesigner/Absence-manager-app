'use strict';

/*
 * Private API:
 * selectRangeDate
 * checkAbsenceRangeDate
 * getListAbsentUser
 * getDateAbsence
 *
 * Public API:
 * get
 * post
 * checkClashes
 * getUserAbsences
 * getListUsers
 * getAbsenceByUser
 * MonthDataCalendar
 */

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function($log, $q, $http, Config, Session) {
        // Private
        function selectRangeDate (psMethodName, poSubmitParams, poMethodParams) {
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
                var result = [];
                var dateInstance = moment(startDate);
                var value = poSubmitParams.type;

                //$log.debug('StartDate: ' + startDate.format(Config.dateFormat) + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDate.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                
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

                    result.push({
                        date : dateInstance.format(Config.dateFormat),
                        unit : unit,
                        value : value
                    });

                    //$log.debug('date checked: ' + dateInstance.format(Config.dateFormat) + '-' + unit, ' i = ' + i + ' j = ' + j);

                    // last date do 'AM'
                    if (i == lngDays -1 && poSubmitParams.unitTo == 'AM') {
                        i += 1; // increase day + 0.5
                    }

                    // loop increase indexes do 'AM' and 'PM'
                    i += 0.5; // increase day + 0.5
                    j += 0.5; // change unit  + 0.5
                }

                return result;
            };

            function near (poSubmitParams, poParams) {
                // scope variables
                var result = [];

                var dateInstance = null;
                var startDateInstance = moment(startDate);
                var endDateInstance = moment(endDate);
                var value = poSubmitParams.type;

                var lngDays = poParams.rangeDay;
                var lngLoop = lngDays * 2;

                //$log.debug('StartDate: ' + startDateInstance.format(Config.dateFormat) + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDateInstance.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                
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

                    result.push({
                        date : dateInstance.format(Config.dateFormat),
                        unit : unit,
                        value : value
                    });

                    //$log.debug('date checked: ' + dateInstance.format(Config.dateFormat) + '-' + unit, ' i = ' + i + ' j = ' + j);

                    // loop increase indexes do 'AM' and 'PM'
                    i += 0.5; // increase day + 0.5
                    j += 0.5; // change unit  + 0.5
                }

                return result;
            }
        };

        function checkAbsenceRangeDate (paRangeDate) {
            var hasAbsenceDate = false;

            var lngRangeDate = paRangeDate.length;
            for (var i = 0; i < lngRangeDate; i++) {
                var date = paRangeDate[i].date;
                var unit = paRangeDate[i].unit;

                var result = Service.Data.map(function(obj, index, array){
                    
                    return obj.date + '-' + obj.unit; // DD/MM/YYYY-AM
                    
                }).indexOf(date + '-' + unit);

                hasAbsenceDate = (result >= 0);
                if (hasAbsenceDate) {
                    break;
                }
            }

            return hasAbsenceDate;
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

        function changeUserRecord (paRangeDate, poUser) {
            var newServiceData = Service.Data;
            
            var userID = poUser.id;
            var userName = poUser.name;
            
            var lngRangeDate = paRangeDate.length;
            for (var i = 0; i < lngRangeDate; i++) {
                var DateObj = paRangeDate[i];
                var date = DateObj.date;
                var unit = DateObj.unit;
                var value = DateObj.value;

                // remove record
                Service.Data.map(function (obj, index, array) {
                    if (
                        obj.date == date &&
                        obj.unit == unit &&
                        obj.userid == userID
                    ) {
                        newServiceData.splice(index, 1);
                    }
                });

                // add record
                if (value !== 'W') {
                    newServiceData.push({
                        "userid": userID,
                        "name": userName,
                        "date": date,
                        "unit": unit,
                        "value": value
                    });
                }
            }

            Service.Data = newServiceData;

            return newServiceData;
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

            var rangeDate = selectRangeDate('overlap', poSubmitParams);
            var newServiceData = changeUserRecord(rangeDate, Session.user);

            // emulate the server response
            setTimeout(function() {
                
                // response from the server
                $log.debug('EXAMPLE SERVER UPDATE REQUEST', poSubmitParams);
                deferred.resolve({
                    lightbox : {
                        type : 'default',
                        message : {
                            situation : 'Your Absence ' + poSubmitParams.dateFrom + ' ' + poSubmitParams.unitFrom + ' to ' + poSubmitParams.dateTo + ' ' + poSubmitParams.unitTo + ' (' + poSubmitParams.type + ') submission is completed.'
                        }
                    }, 
                    AbsenceData : newServiceData
                });

            }, 200);

            return deferred.promise;
        };

        Service.checkClashes = function (poaAbsenceData, poSubmitParams) {
            var deferred = $q.defer();

            var $this = this;

            var rangeDateOverlap = selectRangeDate('overlap', poSubmitParams);
            var rangeDateAdjacent = selectRangeDate('near', poSubmitParams, {rangeDay:1});
            var rangeDateNear4days = selectRangeDate('near', poSubmitParams, {rangeDay:4});

            var isRangeDateOverlap = checkAbsenceRangeDate(rangeDateOverlap);
            var isRangeDateAdjacent = checkAbsenceRangeDate(rangeDateAdjacent);
            var isRangeDateNear4days = checkAbsenceRangeDate(rangeDateNear4days);

            // check if you are removing absence or if you have enough holiday
            var isNotRemovingAbsence = poSubmitParams.type !== 'W';
            
            if ( isNotRemovingAbsence && !hasEnoughHoliday() ) {
                deferred.reject({
                    type : 'default',
                    message : {
                        situation : 'You do not have enough holidays left!'
                    }
                });
            }

            if ( isNotRemovingAbsence && isRangeDateOverlap ) {
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

            else if ( isNotRemovingAbsence && isRangeDateAdjacent ) {
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

            else if ( isNotRemovingAbsence && isRangeDateNear4days ) {
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

        Service.getUserAbsences = function (pnUserId) {
            var listAbsence = [];
            var absenceCount = 0;

            Service.Data.map(function(obj, index, array){
                if (obj.userid == pnUserId) {
                    listAbsence.push(obj);
                    absenceCount += 0.5;
                }
            });

            return {
                list : listAbsence,
                count : absenceCount,
            };   
        }

        Service.getListUsers = function () {
            var listUser = [];
            var listUserByID = {};

            Service.Data.map(function(obj, index, array){
                var userid = obj.userid

                if (listUserByID[userid] === undefined && userid !== undefined && userid !== '') {
                    var newObj = {
                        "userid": userid,
                        "name": obj.name
                    }

                    listUserByID[userid] = newObj;
                    listUser.push(newObj);
                }

            });

            return listUser;
        }

        Service.getAbsenceByUser = function (psUserid) {
            var listRecords = [];

            Service.Data.map(function(obj, index, array){
                
                if (obj.userid === psUserid) {
                    listRecords.push(obj);
                }

            });

            return listRecords;
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
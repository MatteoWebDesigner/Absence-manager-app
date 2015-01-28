'use strict';

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function($log, $q, $http) {
        var service = {
            get: function (parameters) {
                return $http.get('/dump/absences.json')
                    .success(function(data, status, headers, config) {
                        return data;
                    })
                    .error(function(data, status, headers, config) {
                        return data;
                    });
            },
            post: function (parameters) {
                var deferred = $q.defer();

                // emulate the server response
                setTimeout(function() {
                    // response from the server
                    if (auth !== null) {
                        $log.debug('EXAMPLE SERVER UPDATE REQUEST', parameters);
                        deferred.resolve('Absence submitted');
                    } else {
                        $log.debug('ACCESS DENIED', parameters);
                        deferred.reject('Your are not logged in');
                    }
                }, 200);

                return deferred.promise;
            },
            submit: function (parameters) {
                return this.get()
                    .then(function(AbsenceData) {
                        if ( selectRangeDate('overlap', parameters) ) {
                            return 'Absenteeism overlaps with another user';
                        }
                        if ( selectRangeDate('adjacent', parameters) ) {
                            return 'Absenteeism is adjacent to another user';
                        }
                        if ( 0 ) {
                            return 'Absenteeism is within 4 days of another user';
                        }
                        //return this.post(parameters);
                    
                        function selectRangeDate (methodName, poDateRange) {
                            // methods:
                            var methods = {
                                "overlap": function () {
                                    // first date
                                    var dateInstance = moment(startDate);
                                    var dateInstanceFormatted = dateInstance.format('DD/MM/YYYY')

                                    if (poDateRange.unitFrom == 'PM') {
                                        var index = checkAbsenceDate(dateInstanceFormatted, 'PM'); 
                                        if (index) { return index };
                                    } else {
                                        var index = checkAbsenceDate(dateInstanceFormatted, 'AM'); 
                                        if (index) { return index };

                                        index = checkAbsenceDate(dateInstanceFormatted, 'PM'); 
                                        if (index) { return index };
                                    }

                                    // loop two index
                                    // I used two index one for alternate the Unit and another for increase the date
                                    for (var i = 0, j = 0; i < lngDays;) {
                                        var frequence = j % 2;

                                        dateInstance.add(frequence, 'day');

                                        index = checkAbsenceDate(
                                            dateInstance.format('DD/MM/YYYY'),
                                            (frequence ? 'AM' : 'PM')
                                        ); 
                                        
                                        if (index) { return index };

                                        // increase day + 0.5
                                        i += 0.5;
                                        // change unit  + 1
                                        j += 1;
                                    }
                                    
                                    // last date
                                    dateInstance.add(1, 'day');
                                    if (poDateRange.unitTo == 'AM') {
                                        index = checkAbsenceDate(dateOlderFormatted, 'AM'); 
                                        if (index) { return index };
                                    } 
                                    else {
                                        index = checkAbsenceDate(dateOlderFormatted, 'AM'); 
                                        if (index) { return index };

                                        index = checkAbsenceDate(dateOlderFormatted, 'PM'); 
                                        if (index) { return index };
                                    }

                                    return false;
                                },
                                "adjacent" : function () {
                                    // adjacent start date
                                    var dateInstance = moment(startDate).subtract('1','day');
                                    var dateInstanceFormatted = dateOlder.format('DD/MM/YYYY');

                                    var index = checkAbsenceDate(dateInstanceFormatted, 'AM'); 
                                    if (index) { return index };

                                    index = checkAbsenceDate(dateInstanceFormatted, 'PM'); 
                                    if (index) { return index };

                                    // adjacent end date
                                    dateInstance = moment(endDate).add('1','day');
                                    dateInstanceFormatted = dateOlder.format('DD/MM/YYYY');
                                    
                                    index = checkAbsenceDate(dateInstanceFormatted, 'AM'); 
                                    if (index) { return index };

                                    index = checkAbsenceDate(dateInstanceFormatted, 'PM'); 
                                    if (index) { return index };
                                },
                                "near" : function () {

                                }
                            };

                            var startDate = moment(poDateRange.dateFrom, 'DD/MM/YYYY');
                            var endDate = moment(poDateRange.dateTo, 'DD/MM/YYYY');
                            var lngDays = endDate.diff(startDate, 'days');

                            return methods[methodName]();
                        }

                        // DD/MM/YYYY-AM
                        function checkAbsenceDate (psDate, psUnit) {
                            var index = AbsenceData.data.map(function(obj, index, array){
                                if (
                                    psDate === obj.date &&
                                    psUnit === obj.unit
                                ) {
                                    save.push(obj);
                                }

                                return obj.date + '-' + obj.unit;
                            }).indexOf(psDate + '-' + psUnit);

                            return (index >= 0);
                        }

                        function getAbsenceDate (psDate,psUnit) {
                            var arr = [];

                            AbsenceData.data.map(function(obj, index, array) {
                                if (
                                    psDate === obj.date &&
                                    psUnit === obj.unit
                                ) {
                                    arr.push(obj);
                                }
                            });
                        }


                    });
            }
        }

        return service;
});
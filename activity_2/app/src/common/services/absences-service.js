'use strict';

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function($log, $q, $http) {
        var service = {
            get : function () {
                return $http.get('/dump/absences.json')
                    .success(function(data, status, headers, config) {
                        return data;
                    })
                    .error(function(data, status, headers, config) {
                        return data;
                    });
            },
            post : function (poSubmitParams) {
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
            },
            checkClashes : function (poaAbsenceData, poSubmitParams) {
                var deferred = $q.defer();

                var $this = this;

                if ( selectRangeDate('overlap', poSubmitParams) ) {
                    deferred.reject({
                        type : 'alert',
                        message : {
                            type : 'danger',
                            situation : 'The dates you are going to request are:' ,
                            problem : 'Overlaps with another user',
                            next : 'Do you still want submit your Absence request?'
                        },
                        action : {
                            fn : $this.post,
                            arguments : poSubmitParams
                        }
                    });
                }

                if ( selectRangeDate('near', poSubmitParams, {rangeDay:1}) ) {
                    deferred.reject({
                        type : 'alert',
                        message : {
                            type : 'warning',
                            situation : 'The dates you are going to request are:' ,
                            problem : 'Adjacent to another user',
                            next : 'Do you still want submit your Absence request?'
                        },
                        action : {
                            fn : $this.post,
                            arguments : poSubmitParams
                        }
                    });
                }

                if ( selectRangeDate('near', poSubmitParams, {rangeDay:4}) ) {
                    deferred.reject({
                        type : 'alert',
                        message : {
                            type : 'warning',
                            situation : 'The dates you are going to request are:' ,
                            problem : 'Within 4 days of another user',
                            next : 'Do you still want submit your Absence request?'
                        },
                        action : {
                            fn : $this.post,
                            arguments : poSubmitParams
                        }
                    });
                }

                deferred.resolve(poSubmitParams);

                return deferred.promise;

                function selectRangeDate (psMethodName, poSubmitParams, poMethodParams) {
                    var startDate = moment(poSubmitParams.dateFrom, 'DD/MM/YYYY');
                    var endDate = moment(poSubmitParams.dateTo, 'DD/MM/YYYY');
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

                        $log.debug('StartDate: ' + startDate.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDate.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                        
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
                                dateInstance.format('DD/MM/YYYY'),
                                unit
                            ); 
                            
                            if (result) { 
                                return result;
                            };

                            $log.debug('date checked: ' + dateInstance.format('DD/MM/YYYY') + '-' + unit, ' i = ' + i + ' j = ' + j);

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

                        $log.debug('StartDate: ' + startDateInstance.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' endDate: ' + endDateInstance.format('DD/MM/YYYY') + '-' + poSubmitParams.unitFrom + ' lngDays: ' + lngDays);
                        
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
                                dateInstance.format('DD/MM/YYYY'),
                                unit
                            ); 
                            
                            if (result) { 
                                return result;
                            };

                            $log.debug('date checked: ' + dateInstance.format('DD/MM/YYYY') + '-' + unit, ' i = ' + i + ' j = ' + j);

                            // loop increase indexes do 'AM' and 'PM'
                            i += 0.5; // increase day + 0.5
                            j += 0.5; // change unit  + 0.5
                        }

                        return false;
                    };

                    // DD/MM/YYYY-AM
                    function checkAbsenceDate (psDate, psUnit) {
                        var saveDateMatch = [];
                        var result = poaAbsenceData.data.map(function(obj, index, array){
                            if (
                                psDate === obj.date &&
                                psUnit === obj.unit
                            ) {
                                saveDateMatch.push(obj);
                            }

                            return obj.date + '-' + obj.unit;
                        }).indexOf(psDate + '-' + psUnit);

                        return (result >= 0);
                    };
                }
            }
        }

        return service;
});
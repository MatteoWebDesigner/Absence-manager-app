'use strict';

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function($log, $q, $http) {
        var service = {
            get: function (parameters) {
                // response from the server
                $http.get('/dump/absences.json')
                    .success(function(data, status, headers, config) {
                        return data;
                    })
                    .error(function(data, status, headers, config) {
                        return data;
                    });
            },
            post: function (parameters, auth) {
                return $q(function(resolve, reject) {
                    setTimeout(function() {
                        // response from the server
                        if (auth !== null) {
                            $log.debug('EXAMPLE SERVER UPDATE REQUEST', parameters);
                            resolve('Absence submitted');
                        } else {
                            $log.debug('ACCESS DENIED', parameters);
                            reject('Your are not logged in');
                        }
                    }, 200);
                });
            },
            submit: function (parameters, auth) {
                
                  var deferred = $q.defer();

                  setTimeout(function() {
                    deferred.notify('About to greet ' + name + '.');

                    if (okToGreet(name)) {
                      deferred.resolve('Hello, ' + name + '!');
                    } else {
                      deferred.reject('Greeting ' + name + ' is not allowed.');
                    }
                  }, 1000);

                  return deferred.promise;

                //return this.get()




                    //.then(function(res) {
                        

                        // if (0) {
                        //     return 'Absenteeism overlaps with another user';
                        // }

                        // if (0) {
                        //     return 'Absenteeism is adjacent to another user';
                        // }

                        // if (0) {
                        //     return 'Absenteeism is within 4 days of another user';
                        // }


                        // return ;

                    //});


                    // .then(function(res) {
                    //     return this.post(parameters, auth);
                    // });
            }
        }

        return service;

        function selectRangeDate () {

        }
});
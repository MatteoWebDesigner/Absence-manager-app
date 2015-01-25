'use strict';

angular
	.module('AbsenceManager')
	.factory('AbsenceService', function( $log, $http ) {
        var service = {
            get: function (parameters) {
                $http.get('/dump/absences.json')
                    .success(function(data, status, headers, config) {
                        return data;
                    })
                    .error(function(data, status, headers, config) {
                        
                        return ;
                    });
            },
            post: function (parameters) {
                $log.debug('EXAMPLE SERVER UPDATE REQUEST', parameters);
            }
        }

        return service;
});
'use strict';

angular
    .module('AbsenceManager')
    .factory('AuthService', function($http, $q, Session, AbsenceService) {
        // Private API
        function sendLoginCredential (poCredentials) {
            var deferred = $q.defer(); // $http.post('/login', poCredentials)
            
            // fake async POST login
            setTimeout(function() {
                
                // I should not use this function
                AbsenceService
                    .get()
                    .then(function (resolve) {
                        var userAbsence = AbsenceService.getUserAbsences(1);
                        postResponse(userAbsence.count);
                    });

                function postResponse (pnUserCount) {
                    // hardcode POST login response
                    var postReturn = {
                        data : {
                            sessionId : Math.random(),
                            user : {
                                id : '1',
                                name: 'Matthew Webb',
                                role : 'all',
                                daysOff: 25,
                                daysOffLeft: (25 - pnUserCount)
                            }
                        }
                    };

                    if (postReturn) {
                        deferred.resolve( postReturn );
                    } else {
                        deferred.reject( null );
                    }
                }

            }, 200);

            return deferred.promise;
        }

        // Public API
        var authService = {};

        authService.login = function(poCredentials) {
            return sendLoginCredential(poCredentials)
                .then(function(res) {
                    Session.create(res);
                    return res.data.user;
                });
        };

        authService.logout = function () {
            Session.destroy();
            return null;
        };

        authService.restoreLoginSession = function() {
            return Session.restoreState();
        };

        authService.isAuthenticated = function() {     
            return Session.user !== undefined && Session.user !== null;
        };

        authService.isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    });
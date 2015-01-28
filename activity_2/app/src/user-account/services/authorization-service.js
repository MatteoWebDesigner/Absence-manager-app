'use strict';

angular
    .module('AbsenceManager')
    .factory('AuthService', function($http, $q, Session) {
        var authService = {};

        authService.login = function(credentials) {
            return (function($q, credentials){ // $http.post('/login', credentials)
            		
                    // hard code POST login
                    var postReturn = {
            			data : {
            				id : Math.random(),
            				user : {
            					id : '1',
            					name: 'Matthew Webb',
            					role : 'all'
            				}
            			}
            		};

            		// promise
					return $q(function(resolve, reject) {
					    setTimeout(function() {
					        if (postReturn) {
					            resolve( postReturn );
					        } else {
					            reject( null );
					        }
					    }, 200);
					});
                })($q, credentials)
                .then(function(res) {
                    Session.create(res);
                    return res.data.user;
                });
        };

        authService.restoreLoginSession = function() {
            return Session.restoreState();
        };

        authService.isAuthenticated = function() {
            return !!Session.userId;
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
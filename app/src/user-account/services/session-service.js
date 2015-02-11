'use strict';

angular
    .module('AbsenceManager')
    .service('Session', function() {
        this.create = function(res) {
            this.sessionId = res.data.id;
            this.user = res.data.user;
            
            sessionStorage.Auth = angular.toJson({
                sessionId : res.data.id,
                user : res.data.user
            });
        };

        this.destroy = function() {
            this.sessionId = null;
            this.user = null;

            sessionStorage.clear();
        };

        this.restoreState = function () {
            if (sessionStorage.Auth !== undefined) {
                var session = angular.fromJson(sessionStorage.Auth);
                
                this.id = session.id;
                this.user = session.user;

                return this.user;
            }
            else {
                return null;
            }
        };

        this.restoreState();

        return this;
    })

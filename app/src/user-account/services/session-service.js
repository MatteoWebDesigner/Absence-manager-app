'use strict';

angular
    .module('AbsenceManager')
    .service('Session', function() {
        this.create = function(res) {
            this.id = res.data.id;
            this.user = res.data.user;
            this.userId = res.data.user.id;
            this.userRole = res.data.user.role;
            
            sessionStorage.Auth = angular.toJson({
                id : res.data.id,
                user : res.data.user,
                userId : res.data.user.id,
                userRole : res.data.user.role
            });
        };

        this.destroy = function() {
            this.id = null;
            this.user = null;
            this.userId = null;
            this.userRole = null;
        };

        this.restoreState = function () {
            if (sessionStorage.Auth !== undefined) {
                var session = angular.fromJson(sessionStorage.Auth);
                
                this.id = session.id;
                this.user = session.user;
                this.userId = session.userId;
                this.userRole = session.userRole;

                return this.user;
            }
            else {
                return null;
            }
        };

        this.restoreState();

        return this;
    })

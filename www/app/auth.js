/**
 * Created by Ets Simon on 03/06/2017.
 */


auth

    .factory('Auth', function (API, $auth, AclService,$q,$rootScope) {

        return {
            login: function (credentials) {
                var defer = $q.defer();

                $auth.login(credentials).then(function (response) {
                    var data = response.data.data;
                    angular.forEach(data.userRole, function (value) {
                        AclService.attachRole(value)
                    });

                    AclService.setAbilities(data.abilities)
                    $auth.setToken(response.data)
                    defer.resolve(response.data)
                })
                return defer.promise;
            },
            logout: function () {
                var defer = $q.defer();

                $auth.logout().then(function () {
                    delete $rootScope.me
                    AclService.flushRoles()
                    AclService.setAbilities({})
                    defer.resolve(true);
                })
                return defer.promise;
            },

            getContext: function () {
                if ($auth.isAuthenticated()) {
                    var UserData = API.service('me', API.all('users'));

                    return UserData.one().get();
                } else {
                    return null;
                }
            },

            me: function (cb) {
                $rootScope.$watch('me', function (nv) {
                    cb(nv)
                })
            }
        }

    });

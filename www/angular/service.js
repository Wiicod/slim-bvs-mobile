/**
 * Created by bvnand01 on 17/02/2017.
 */

service
    .factory('NameFactory', ['$http', '$filter', '$q', '$rootScope',
        function ($http,$filter,$q,$rootScope) {

            var factory = {
                attrib1: false,
                getAttribut: function (obj) {
                    var deferred = $q.defer();
                    $http.get(adresse).success(function(data,status){
                        factory.attrib1 = data;
                        deferred.resolve(factory.attrib1);

                    }).error(function(data,status){
                        console.log(status);
                        deferred.reject('Impossible de recuperer les indicateurs');
                    });

                    return deferred.promise;

                },
                addAttrib: function (obj) {
                    var deferred = $q.defer();
                    //console.log(obj);
                    $http.post(adresse+"indicateur",JSON.stringify(obj)).
                        success(function(data,status){
                            deferred.resolve(data);
                        }).error(function(data,status){
                            console.log(data);
                            console.log(status);
                            deferred.reject('Impossible de recuperer les users');
                        });
                    return deferred.promise;
                }
            }

            return factory

        }]);
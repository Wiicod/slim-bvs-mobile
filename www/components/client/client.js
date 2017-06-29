/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("UniversCtrl",function($scope,NgMap,$rootScope,$cordovaGeolocation,Customers){
        $scope.current=new Date();
        // douala 4.0526383,9.6973306
        $scope.position=null;
        $scope.lat=null;
        $scope.lng=null;
        $scope.choix=false;

        // recuperation des clients
        Customers.getList({_includes:"customer_type,town.region.country,bills",town_id:2}).then(function(c){
           console.log(c);
            $scope.clients=c;
        },function(q){
            console.log(q);
        });

        $scope.choix_client=function(c){
            $scope.choix=true;
            $scope.client=c;
        };

        $cordovaGeolocation
            .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
            .then(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                $scope.position=pos;
                $scope.lat=pos.lat;
                $scope.lng=pos.lng;

            }, function(err) {
                // error
            });
    });

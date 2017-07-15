/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("UniversCtrl",function($scope,$rootScope,$cordovaGeolocation,Customers,NgMap,Auth){
        Auth.getContext().then(function (userData) {
            $scope.user=userData;
        });
        $scope.current=new Date();
        // douala 4.0526383,9.6973306
        $scope.position=null;
        $scope.lat=null;
        $scope.lng=null;
        $scope.choix=false;

        // recuperation des clients
        Customers.getList({_includes:"company,customer_type,town.region.country,bills",town_id:$scope.user.seller.depot.town_id}).then(function(c){
           console.log("client",c);
            $scope.clients=c;
        },function(q){
            console.log(q);
        });

        $scope.choix_client=function(c){
            $scope.choix=true;
            c.echue=0;
            c.ca=0;
            console.log(c);

            // recuperation des factures echues et du chiffre d'affaire
            angular.forEach(c.bills,function(v,k){
                if(v.status=='not_paided'){
                    c.echue++;
                }
                c.ca+= v.amount;
            });
            // recuperation du ciffre d'affaire
            $scope.client=c;
        };

        NgMap.getMap().then(function(map) {
            $rootScope.map = map;

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
                    map.setCenter(pos);


                }, function(err) {
                    // error
                });

            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    });

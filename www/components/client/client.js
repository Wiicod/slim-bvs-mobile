/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("UniversCtrl",function($scope,NgMap,$rootScope,$cordovaGeolocation){
        $scope.current=new Date();
        // douala 4.0526383,9.6973306
        $scope.position=null;
        $scope.lat=null;
        $scope.lng=null;

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                $scope.position=pos;
                $scope.lat=pos.lat;
                $scope.lng=pos.lng;
                console.log($scope.lng,$scope.lat);
                map.setCenter(pos);
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            }, function(err) {
                // error
            });

        /*NgMap.getMap().then(function(map) {
            $rootScope.map = map;
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $scope.position=pos;
                    $scope.lat=pos.lat;
                    $scope.lng=pos.lng;
                    console.log($scope.lng,$scope.lat);
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });*/
    });

/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("UniversCtrl",function($scope,$rootScope,$cordovaGeolocation,Customers,NgMap,$state,InfiniteLoad){
        //console.log(convert_date("2017-07-27 17:34:34"));
        $scope.user=$rootScope.me;
        if($scope.user==undefined){
            $state.go("accueil");
        }
        $scope.F={};
        // douala 4.0526383,9.6973306
        $scope.position=null;
        $scope.lat=null;
        $scope.lng=null;
        $scope.choix=false;

        // recuperation des clients
        var options={
            _includes:"company,customer_type,town.region.country,bills",
            town_id:$scope.user.seller.depot.town_id
        };
        $scope.inf_cus = new InfiniteLoad(Customers,options);
        $scope.nextPage = function () {
            $scope.inf_cus.nextPage().then(function (data) {
                    $scope.clients = data;
                }
            );
        };
        /*Customers.getList({_includes:"company,customer_type,town.region.country,bills",town_id:$scope.user.seller.depot.town_id}).then(function(c){
           console.log("client",c);
            $scope.clients=c;
        },function(q){
            console.log(q);
        });*/

        $scope.choix_client=function(c){
            $scope.choix=true;
            $scope.F.id= c.id;
            c.echue=0;
            c.ca=0;
            console.log(c);

            // recuperation des factures echues et du chiffre d'affaire
            angular.forEach(c.bills,function(v,k){
                if(convert_date(v.deadline)<new Date() && v.seller_id==$scope.user.seller.id){
                    if(v.status=='expired'){
                        console.log(v.seller_id,convert_date(v.deadline),"q", v.id,new Date());
                        c.echue++;
                    }
                }
                /*if(v.status=='expired' && convert_date(v.deadline)<new Date()){
                    c.echue++;
                }*/
                c.ca+= v.amount;
            });
            // recuperation du ciffre d'affaire
            $scope.client=c;
        };


        $scope.detail_facture=function(f){
            console.log("f",f);
            console.log(f.deadline);
            f.prix_remise=(f.amount/(1-f.discount))*f.discount;
            f.prix_sans_remise= f.prix_remise+ f.amount;
            $scope.facture=f;
            $scope.facture.customer=$scope.client;
            $("#btn_detail_facture").trigger("click");
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

function convert_date(d){
    var tab= d.split(" ");
    var tab_1=tab[0].split("-");
    var tab_2=tab[1].split(":");
    return new Date(tab_1[0],parseInt(tab_1[1])-1,tab_1[2],parseInt(tab_2[0])+1,tab_2[1],tab_2[2]);
}
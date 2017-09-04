/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("UniversCtrl",function($scope,$rootScope,$cordovaGeolocation,Sellers,Customers,NgMap,$state,InfiniteLoad,ToastApi,$translate){
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

        /*/ recuperation des clients
        var options={
            _includes:"company,customer_type,town.region.country,bills,customer_type_seller",
            //town_id:$scope.user.seller.depot.town_id,
            seller_id:$scope.user.seller.id
        };
        $scope.inf_cus = new InfiniteLoad(Customers,options);
        $scope.nextPage = function () {
            $scope.inf_cus.nextPage().then(function (data) {
                    $scope.clients = data;
                }
            );
        };*/
        //api/sellers/id?_includes='customer_types.customers'
        $scope.clients=[];
        Sellers.get($scope.user.seller.id,{_includes:"customer_types.customers"}).then(function(c){
            angular.forEach(c.data.customer_types,function(v,k){
                angular.forEach(v.customers,function(cc,kk){
                    if(cc.town_id==$scope.user.seller.depot.town_id) {
                        $scope.clients.push(cc);
                    }
                });
            });
            console.log("f",$scope.clients.length);
           // $scope.clients= c.customer_types.compagnies ;
        },function(q){
            console.log(q);
        });

        $scope.choix_client=function(c){
            $scope.choix=true;
            $scope.F.id= c.id;
            c.echue=0;
            Customers.get(c.id,{_includes:"company,customer_type,town.region.country,bills"}).then(function(data){
                c=data.data;
                c.ca=0;
                console.log("client",c);
                if(c.latitude==null || c.longitude==null || c.latitude==0 || c.longitude==0){
                    $scope.plan=false;
                }
                else{
                    $scope.plan=true;
                }
                angular.forEach(c.bills,function(v,k){
                    if(convert_date(v.deadline)<new Date() && v.seller_id==$scope.user.seller.id){
                        if(v.status=='expired'){
                            c.echue++;
                        }
                    }
                    c.ca+= v.amount;
                });
                $scope.client=c;
            });
        };

        $scope.coordonnees_client=function(c){
            Customers.get(c.id).then(function(data){
                data.id=data.data.id;
                $cordovaGeolocation
                    .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
                    .then(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        data.latitude=pos.lat;
                        data.longitude=pos.lng;
                        data.put().then(function(data){
                            console.log("ok",data);
                            ToastApi.success({msg:$translate.instant("CLIENT.ARG_31")});
                        },function(q){console.log(q)});

                    }, function(err) {
                        // error
                    });
            });
          //recupération des coordonnées d'un client

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
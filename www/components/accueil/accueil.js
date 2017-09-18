/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope,Depots,Auth){
        $scope.current=new Date();
        Auth.getContext().then(function (userData) {
            console.log(userData);
            $scope.user=userData;
            //verification si la caisse du depot est ouverte
            $scope.open=$scope.user.seller.depot.is_open;
            var date_o=$scope.user.seller.depot.open_at;
            var date_f=$scope.user.seller.depot.close_at;
            $scope.date_o=new Date(date_o.date);
            $scope.date_f=new Date(date_f.date);
            $scope.sell_time=$scope.date_o.getHours()+"h - "+$scope.date_f.getHours()+"h";

            // verife si c un seller dabord, sinon tu le lui dit
            Depots.get($scope.user.seller.depot.id,{_includes:"saletypes"}).then(function(d){
                console.log('depot',d);
                $scope.saletypess= d.data.saletypes;
            },function(q){
                console.log(q);
            });
        });
    });

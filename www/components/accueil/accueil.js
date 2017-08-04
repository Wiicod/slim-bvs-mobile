/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope,Depots,Auth){
        $scope.current=new Date();
        Auth.getContext().then(function (userData) {
            console.log(userData);
            $scope.user=userData;
            // verife si c un seller dabord, sinon tu le lui dit
            Depots.get($scope.user.seller.depot.id,{_includes:"saletypes"}).then(function(d){
                console.log('depot',d);
                $scope.saletypess= d.data.saletypes;
            },function(q){
                console.log(q);
            });
        });
    });

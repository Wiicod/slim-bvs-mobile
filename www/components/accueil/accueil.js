/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope,Depots,Auth){
        $scope.current=new Date();
        Auth.getContext().then(function (userData) {
            console.log(userData);
        })
        Depots.get(1,{_includes:"saletypes"}).then(function(d){
            console.log(d);
            $scope.saletypes= d.saletypes;
        },function(q){
            console.log(q);
        });
    });

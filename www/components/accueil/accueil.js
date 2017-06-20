/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope,Depots){
        $scope.current=new Date()
        Depots.get(3,{_includes:"saletypes"}).then(function(d){
            console.log(d);
            $scope.saletypes= d.saletypes;
        });
    });

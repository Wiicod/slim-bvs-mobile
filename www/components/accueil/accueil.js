/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope,Depots){
        $scope.current=new Date();
        Depots.get(1,{_includes:"saletypes"}).then(function(d){
            console.log(d);
            $scope.saletypess= d.data.saletypes;
        },function(q){
            console.log(q);
        });
    });

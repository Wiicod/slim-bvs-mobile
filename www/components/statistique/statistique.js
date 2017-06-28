/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("StatistiqueCtrl",function($scope,SaleTargets){
        var d=new Date();
        var user_id=1;
        // recuperation des objectifs de l'utilisateur
        SaleTargets.getList({"user_id":user_id,"_includes":"category"}).then(function(o){
            $scope.objectifs=o;
        },function(q){
            console.log(q);
        });

    });

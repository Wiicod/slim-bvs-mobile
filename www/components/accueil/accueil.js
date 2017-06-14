/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AccueilCtrl",function($scope){
        $scope.current=new Date();

        console.log("ede");

        // recuperation des modes de ventes
        $scope.saletypes=[
            {id:1,name:"Promo",description:"Mode de vente promotionel"},
            {id:2,name:"T5",description:"Mode de vente habituel"}
        ]
    });

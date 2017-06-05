/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("CommandeCtrl",function($scope,$stateParams,$state){
        console.log("edw");
        $scope.current=new Date();

        $scope.produit={remise:0,quantite:5};

        $scope.commande=[];
        var mode=$stateParams.mode;

        $scope.detail_produit=function(produit){
            $scope.produit={remise:0,quantite:5};
            $("#btn_detail_produit").trigger("click");
        };

        $scope.memoriser_commande=function(){
            $state.go("accueil");
        };console.log("saq");
        $scope.h=height+"-"+$(window).width();
        $(document).ready(function(){
            console.log("sqs");
        });
        console.log("sq");
    })

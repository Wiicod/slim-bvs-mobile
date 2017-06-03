/**
 * Created by Ets Simon on 03/06/2017.
 */

controller

    .controller("AccueilCtrl",function($scope){
        $scope.current=new Date();
        $scope.statutAuth=true;
        $scope.code="0000";
        $scope.h=height;

        //authentification pour ouverture de la caisse
        $scope.authentification=function(code){
            console.log(code);
            if(code=="0000"){
                $scope.statutAuth=false;
            }
            else{
                console.log("Erreur");
                console.log(code);
            }
        };
    })

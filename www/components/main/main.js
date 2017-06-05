/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AppCtrl",function($scope){
        $scope.current=new Date();
        $scope.statutAuth=true;
        $scope.code="0000";
        console.log("ed");

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

    .controller("HeaderCtrl",function($scope){
        $scope.current=new Date();
    })
    .controller("FooterCtrl",function($scope){
        $scope.current=new Date();
        $scope.enregistrerSuggestion=function(){
            console.log($scope.suggestion);
            $("#closeSuggestion").trigger("click");
        };
    })

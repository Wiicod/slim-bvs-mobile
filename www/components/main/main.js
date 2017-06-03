/**
 * Created by Ets Simon on 03/06/2017.
 */

controller

    .controller("AppCtrl",function($scope){
        $scope.current=new Date();
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

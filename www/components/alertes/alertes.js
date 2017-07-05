/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AlertesCtrl",function($scope,$cookies){
        $scope.current=new Date();
        $scope.alertes=$cookies.getObject("agenda");

    });

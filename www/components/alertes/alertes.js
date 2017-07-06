/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AlertesCtrl",function($scope,Bills){
        $scope.current=new Date();
        var user_id=1;
        var j=new Date();
        var deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 00:00:00";
        Bills.getList({seller_id:user_id,status:0,_includes:"customer","deadline-lt":deb}).then(function(b){
            $scope.factures=b;
        });
    });

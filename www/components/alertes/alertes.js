/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AlertesCtrl",function($scope,Bills,Auth){
        Auth.getContext().then(function (userData) {
            $scope.user=userData;
        });
        var j=new Date();
        var deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 00:00:00";
        Bills.getList({seller_id:$scope.user.seller.id,status:0,_includes:"customer","deadline-lt":deb}).then(function(b){
            $scope.factures=b;
        });
    });

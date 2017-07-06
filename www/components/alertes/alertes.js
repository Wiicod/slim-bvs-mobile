/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AlertesCtrl",function($scope,Diaries){
        $scope.current=new Date();
        Diaries.getList({seller_id:user_id,"start_at-bt":deb+","+fin}).then(function(d){
            $scope.alertes=d;
        },function(q){console.log(q)});

    });

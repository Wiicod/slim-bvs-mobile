/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("AgendaCtrl",function($scope,Diaries){
        var user_id=1;
        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var deb= now+'-01 00:00:00';
        var fin= now+'-30 23:59:59';
        Diaries.getList({seller_id:user_id,"start_at-bt":deb+","+fin}).then(function(d){
            $scope.agendas=d;
        },function(q){console.log(q)});
    });

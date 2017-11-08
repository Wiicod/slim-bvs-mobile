/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("HeaderCtrl",function($scope,Suggestions,ToastApi,Auth,$state,$cookies,$localStorage,$interval,Bills){

        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var today=now+"-"+ j.getDate()+" 00:00:00,"+now+"-"+j.getDate()+" 23:59:59";

        Auth.getContext().then(function (userData) {
            // la variable est aussi stocke dans $rootscope.me
            $scope.user=userData;



        });
        $scope.enregistrerSuggestion=function(){
            Suggestions.post({content:$scope.suggestion,user_id:$scope.user.id}).then(function(d){
                $scope.suggestion="";
                $("#closeSuggestion").trigger("click");
                ToastApi.success({msg:$translate.instant("HEADER.ARG_7")});
            },function(q){
                ToastApi.error({msg:$translate.instant("HEADER.ARG_8")});
            });

        };



        $scope.logout = function () {
            Auth.logout().then(function () {
                $state.go('login');
            });
        }
    })

    .controller("AppCtrl",function($scope,$cookies,Diaries,Bills,Auth,$rootScope,$interval){
        $scope.current=new Date();
        $scope.open=10;
        Auth.getContext().then(function (userData) {
            $scope.user=userData;
            //verification si la caisse du depot est ouverte
            $scope.open=$scope.user.seller.depot.is_open;
            console.log($scope.open,"open");
           // verifie d abord si un seller
            // calcul du chiffre d'affaire de la journée
            Bills.getList({seller_id:$scope.user.seller.id,"status-bt":"2,3","created_at-bt":today}).then(function(f){
                $scope.ca= _.reduce(f,function(memo, num){
                    return memo+num.amount;
                },0);
                $cookies.putObject("facture",f);
            });

            // mise à jour du CA chaque 15 secondes
            $interval(function(){
                Bills.getList({seller_id:$scope.user.seller.id,"status-bt":"2,3","created_at-bt":today}).then(function(f){
                    $scope.ca= _.reduce(f,function(memo, num){
                        return memo+num.amount;
                    },0);
                    $cookies.putObject("facture",f);
                });
                // console.log("CA mis à jours");
            },15000);

            // recuperation des agendas du mois

            Bills.getList({seller_id:$scope.user.seller.id,status:5,_includes:"customer","deadline-lt":new Date()}).then(function(b){
                $scope.factures_ech=b;
               // console.log("ech",b);
            });
        });

        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var today=now+"-"+ j.getDate()+" 00:00:00,"+now+"-"+j.getDate()+" 23:59:59";
        $scope.statutAuth=true;
        $scope.code="0000";
        $scope.commande_memo=$cookies.getObject("commande_memo");
        $interval(function(){
            $scope.commande_memo=$cookies.getObject("commande_memo");
        },5000);

        //authentification pour ouverture de la caisse
        $scope.authentification=function(code){
            if(code=="0000"){
                $scope.statutAuth=false;
            }
            else{
                console.log("Erreur");
                console.log(code);
            }
        };


    })

    .controller("FooterCtrl",function($scope){
        $scope.current=new Date();

    });

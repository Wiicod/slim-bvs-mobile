/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("HeaderCtrl",function($scope,Suggestions,ToastApi,Auth,$state,$rootScope){
        $scope.current=new Date();
        Auth.getContext().then(function (userData) {
            $scope.user=userData.data.data;
            $rootScope.user=$scope.user;
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

    .controller("AppCtrl",function($scope,$cookies,Diaries,Bills,Auth,$rootScope){
        $scope.current=new Date();
        Auth.getContext().then(function (userData) {
            $scope.user=userData.data.data;
            $rootScope.user=$scope.user;
            // calcul du chiffre d'affaire de la journée
            Bills.getList({seller_id:$scope.user.seller.id,"created_at-bt":today}).then(function(f){
                $scope.ca= _.reduce(f,function(memo, num){
                    return memo+num.amount;
                },0);
                $cookies.putObject("facture",f);
            });

            // recuperation des agendas du mois

            Bills.getList({seller_id:$scope.user.seller.id,status:0,_includes:"customer","deadline-lt":new Date()}).then(function(b){
                $scope.factures=b;
            });
        });
        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var today=now+"-"+ j.getDate()+" 00:00:00,"+now+"-"+j.getDate()+" 23:59:59";
        $scope.statutAuth=true;
        $scope.code="0000";
        $scope.commande_memo=$cookies.getObject("commande_memo");

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

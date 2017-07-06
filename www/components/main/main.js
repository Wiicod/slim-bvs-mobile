/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AppCtrl",function($scope,$cookies,Diaries,Bills){
        $scope.current=new Date();
        var user_id=1;
        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var today=now+"-"+ j.getDate()+" 00:00:00,"+now+"-"+j.getDate()+" 23:59:59";
        $scope.statutAuth=true;
        $scope.code="0000";
        $scope.commande_memo=$cookies.getObject("commande_memo");
        console.log("c",$scope.commande_memo);

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

        // calcul du chiffre d'affaire de la journée
        Bills.getList({seller_id:user_id,"created_at-bt":today}).then(function(f){
            $scope.ca= _.reduce(f,function(memo, num){
                return memo+num.amount;
            },0);
            $cookies.putObject("facture",f);
        });

        // recuperation des agendas du mois

        Bills.getList({seller_id:user_id,status:0,_includes:"customer","deadline-lt":new Date()}).then(function(b){
            $scope.factures=b;
        });
    })

    .controller("HeaderCtrl",function($scope,Suggestions,ToastApi){
        $scope.current=new Date();
        var user_id=1;
        $scope.enregistrerSuggestion=function(){
            Suggestions.post({content:$scope.suggestion,user_id:user_id}).then(function(d){
                $scope.suggestion="";
                $("#closeSuggestion").trigger("click");
                ToastApi.success({msg:$translate.instant("HEADER.ARG_7")});
            },function(q){
                ToastApi.error({msg:$translate.instant("HEADER.ARG_8")});
            });

        };
    })
    .controller("FooterCtrl",function($scope){
        $scope.current=new Date();

    });

/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("HistoriqueCtrl",function($scope,Bills,ToastApi,$translate,InfiniteLoad,Auth,$rootScope,$state,Customers){
        $scope.endDateBeforeRender = endDateBeforeRender;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.startDateOnSetTime = startDateOnSetTime;
        $scope.user=$rootScope.me;
        $scope.codes="";
        $scope.motifs="";
        if($scope.user==undefined){
            $state.go("accueil");
        }
        var j=new Date();
        var deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 00:00:00";
        var fin= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 23:59:59";

        var options  ={
            "created_at-bt": deb+","+fin,
            "seller_id":$scope.user.seller.id,
            "per_page":20,
            "_sort":"created_at",
            "_sortDir":"desc",
            _includes: 'paymentmethod,product_saletypes.product,customer.customer_type,seller'
        };

        charger_factures(InfiniteLoad,Bills,options,$scope);
        /*Auth.getContext().then(function (userData) {
            $scope.user=userData;

        });*/
        /*if($rootScope.user==undefined){
            $state.go("accueil");
        }
        else{
            /*Auth.getContext().then(function (userData) {
             $scope.user=userData;

             });*
            var j=new Date();
            var deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 00:00:00";
            var fin= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 23:59:59";

            var options  ={
                "created_at-bt": deb+","+fin,
                "seller_id":$scope.user.seller.id,
                _includes: 'product_saletypes.product,customer.customer_type,seller'
            };

            charger_factures(InfiniteLoad,Bills,options,$scope);
        }*/




        function startDateOnSetTime () {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime () {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender ($dates) {
            if ($scope.dateRangeEnd) {
                var activeDate = moment($scope.dateRangeEnd);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender ($view, $dates) {
            if ($scope.dateRangeStart) {
                var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        $scope.actualiser_facture=function(){
            console.log($scope.dateRangeStart);
            if($scope.dateRangeStart!=undefined && $scope.dateRangeEnd!=undefined){
                var options  ={
                    "created_at-bt": format_date("d",$scope.dateRangeStart)+","+format_date("f",$scope.dateRangeEnd),
                    "seller_id":$scope.user.seller.id,
                    _includes: 'product_saletypes.product,customer.customer_type,seller'
                };
                charger_factures(InfiniteLoad,Bills,options,$scope);
                $scope.nextPage();
            }
            else{
                ToastApi.error({msg:$translate.instant("HISTORIQUE.ARG_24")});
            }
        };


        $scope.detail_facture=function(f){
            f.prix_remise=(f.amount/(1-f.discount))*f.discount;
            f.prix_sans_remise= f.prix_remise+ f.amount;
            $scope.facture=f;
            $("#btn_detail_facture").trigger("click");
        };
        $scope.e={};

        $scope.extourner_facture=function(e){
            console.log($scope.facture);
            // verification du code
            if(e.codes=="admin"){
                $scope.facture.status=4;
                $scope.facture.put().then(function(data){
                    console.log(data);
                    // modification solde client
                    Customers.get($scope.facture.customer.id).then(function(c){
                        console.log(c);
                        c.id= c.data.id;
                        //c.amount= c.data.amount-$scope.facture.amount;
                        c.put().then(function(a){
                            console.log(a);
                        },function(q){console.log(q);})
                    });
                    $scope.erreur=$translate.instant("HISTORIQUE.ARG_35");
                },function(q){console.log(q);})
            }
            else{
                $scope.erreur=$translate.instant("HISTORIQUE.ARG_34");
            }
        };
    })

    .controller("FactureMemoCtrl",function($scope,$cookies){
        // facture en mémo
        $scope.commande_memo=$cookies.getObject("commande_memo");
        $scope.current=new Date();

        $scope.supprimer_memo=function(cm){
            var index= _.indexOf($scope.commande_memo,cm);
            $scope.commande_memo.splice(index,1);
            // mise à jour des cookies
            $cookies.putObject("commande_memo",$scope.commande_memo);
        }
    });

function format_date(e,d){
    if(e=="d")
        return 1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 00:00:00";
    else if(e=="f")
        return 1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 23:59:59";
}

function charger_factures(InfiniteLoad,resource,options,scope){
    console.log("ici");
    scope.inf = new InfiniteLoad(resource,options);
    console.log(scope.inf);
    scope.nextPage = function () {
        console.log("s");
        scope.inf.nextPage().then(function (data) {
                console.log(data);
                scope.factures_historique = data;
            }
        );
    }
}
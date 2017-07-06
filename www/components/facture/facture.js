/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("HistoriqueCtrl",function($scope,Bills,ToastApi,$translate,InfiniteLoad){
        $scope.endDateBeforeRender = endDateBeforeRender;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.startDateOnSetTime = startDateOnSetTime;


        var j=new Date();
        var deb= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-01';
        var fin= (j.getYear()+1900)+'-'+(j.getMonth()+1)+'-'+ j.getDate()+" 23:59:59";
        var user_id=1;

        var options  ={
            "created_at-bt": deb+","+fin,
            "seller_id":user_id,
            _includes: 'product_saletypes.product,customer.customer_type,seller'
        };

        charger_factures(InfiniteLoad,Bills,options,$scope,ToastApi,$translate);


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
            if($scope.dateRangeStart!=undefined && $scope.dateRangeEnd!=undefined){
                // charger_factures(format_date("d",$scope.dateRangeStart)+","+format_date("f",$scope.dateRangeEnd),$scope,Bills,ToastApi,$translate,user_id);
                var options  ={
                    "created_at-bt": format_date("d",$scope.dateRangeStart)+","+format_date("f",$scope.dateRangeEnd),
                    "seller_id":user_id,
                    _includes: 'product_saletypes.product,customer.customer_type,seller'
                };

                charger_factures(InfiniteLoad,Bills,options,$scope,ToastApi,$translate);

            }
            else{
                ToastApi.error({msg:$translate.instant("HISTORIQUE.ARG_24")});
            }
        };


        $scope.detail_facture=function(f){
            console.log(f);
            $scope.facture=f;
            $("#btn_detail_facture").trigger("click");
        };
    })

    .controller("FactureMemoCtrl",function($scope,$cookies){
        // facture en mémo
        $scope.commande_memo=$cookies.getObject("commande_memo");
        $scope.current=new Date();
    });

function format_date(e,d){
    if(e=="d")
        return 1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 00:00:00";
    else if(e=="f")
        return 1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 23:59:59";
}

function charger_factures(InfiniteLoad,resource,options,scope,toast,translate){
    scope.inf = new InfiniteLoad(resource,options);
    scope.nextPage = function () {
        scope.inf.nextPage().then(function (data) {
                scope.factures = data;
            },function(q){
                toast.error({msg:translate.instant("HISTORIQUE.ARG_27")+ q.data.error+"  |   "+ q.data.reason});
                console.log(q);
            }
        );
    }
}
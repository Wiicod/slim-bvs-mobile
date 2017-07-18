/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("AgendaCtrl",function($scope,Diaries,$rootScope,Customers,Products,$state,Sellers,SaleTargets){

        $scope.endDateBeforeRender = endDateBeforeRender;
        $scope.endDateOnSetTime = endDateOnSetTime;
        $scope.startDateBeforeRender = startDateBeforeRender;
        $scope.startDateOnSetTime = startDateOnSetTime;


        function startDateOnSetTime () {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime () {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender ($dates) {
            if ($scope.dateEnd) {
                var activeDate = moment($scope.dateEnd);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender ($view, $dates) {
            if ($scope.dateStart) {
                var activeDate = moment($scope.dateStart).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }


        $scope.user=$rootScope.me;
        if($scope.user==undefined){
            $state.go("accueil");
        }
        $scope.a={};
        $scope.new=false;
        $scope.ajouter=function(){
            $scope.new=true;
        };
        $scope.annuler=function(){
            $scope.new=false;
            $scope.a={};
        };

        $scope.concernes=[
            {
                id:0,
                name:"Clients"
            },
            {
                id:1,
                name:"Produits"
            },
            {
                id:2,
                name:""
            },
            {
                id:3,
                name:"Vendeur"
            },
            {
                id:4,
                name:"Objectifs de vente"
            }
        ];

        $scope.$watch('a.concern_type',function(type,old_type){
            if(type==0){
                $scope.concerne=$scope.customers;
            }
            else if(type==1){
                $scope.concerne=$scope.products;
            }
            else if(type==2){
                $scope.concerne=$scope.products;
            }
            else if(type==3){
                $scope.concerne=$scope.sellers;
            }
            else if(type==4){
                $scope.concerne=$scope.saletargets;
            }

        });

        Customers.getList({"_includes":"customer_type","town_id":$scope.user.seller.depot.town_id}).then(function(c){
            $scope.customers=c;
        },function(q){
            console.log(q);
        });
        Products.getList().then(function(p){
            $scope.products=p;
        });

        Sellers.getList().then(function(s){
            $scope.sellers=s;
        });

        SaleTargets.getList({seller_id:$scope.user.seller.id}).then(function(s){
            $scope.saletargets=s;
        });

        var j=new Date();
        var now=(j.getYear()+1900)+'-'+(j.getMonth()+1);
        var deb= now+'-01 00:00:00';
        var fin= now+'-30 23:59:59';

        Diaries.getList({seller_id:$scope.user.seller.id,"start_at-bt":deb+","+fin}).then(function(d){
            $scope.agendas=d;
        },function(q){console.log(q)});

        $scope.enregistrer_evenement=function(a){
            console.log($scope.dateRangeStart,$scope.dateRangeEnd);
            a.start_at=$scope.dateRangeStart;
            a.end_at=$scope.dateRangeEnd;
            console.log(a);
            $("#close_ajouter_evenement").trigger("click");
        }


    });

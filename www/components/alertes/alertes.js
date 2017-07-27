/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("AlertesCtrl",function($scope,Bills,$rootScope,$state,InfiniteLoad){
        $scope.user=$rootScope.me;
        if($scope.user==undefined){
            $state.go("accueil");
        }
        var options  ={
            "seller_id":$scope.user.seller.id,
            _includes: 'product_saletypes.product,customer.customer_type,seller',
            status:5,
            "deadline-lt":new Date()
        };
        $scope.inf = new InfiniteLoad(Bills,options);
        $scope.nextPage = function () {
            $scope.inf.nextPage().then(function (data) {
                    console.log(data);
                    $scope.factures_echues = data;
                }
            );
        };
        /*Bills.getList(options).then(function(b){
            $scope.factures_echues=b;
            console.log(b);
        });*/
        $scope.detail_facture=function(f){
            console.log("f",f);
            f.prix_remise=(f.amount/(1-f.discount))*f.discount;
            f.prix_sans_remise= f.prix_remise+ f.amount;
            $scope.facture=f;
            $("#btn_detail_facture").trigger("click");
        };
    });

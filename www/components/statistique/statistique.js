/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("StatistiqueCtrl",function($scope,Bills,BillProductSaleTypes,SaleTargets,$rootScope,$state,InfiniteLoad){
        $scope.user=$rootScope.me;
        if($scope.user==undefined){
            $state.go("accueil");
        }

        $scope.inf_cat = new InfiniteLoad(SaleTargets,{seller_id:$scope.user.seller.id,_includes:"category"});
        $scope.nextPage = function () {
            $scope.inf_cat.nextPage().then(function (data) {
                    $scope.objectifs = data;
                    angular.forEach($scope.objectifs,function(o){

                        var options={
                            seller_id : $scope.user.seller.id,
                            "created_at-get":o.updated_at ,
                            "created_at-lt":o.deadline ,
                            _fields: 'id,discount',
                            should_paginate:false
                        };
                        Bills.getList(options).then(
                            function(results){

                                var bill_by_id = _.keyBy(results,'id');
                                //console.log("ill",bill_by_id);
                                var bill_ids = _.reduce(results , function(result, value, key)
                                {
                                    result = result==""?value.id:result+','+value.id;
                                    return result;
                                },"");
                                BillProductSaleTypes.getList({"bill_id-in": bill_ids,_includes: 'product_saletype.product',
                                    _fields : 'bill_id,quantity,product_price_was,product_saletype_id',should_paginate:false}).then(
                                    function(results2){
                                        //console.log(results2,"res2");
                                        var prix_par_category = _.reduce(results2 , function(result, val, key)
                                        {
                                            //console.log("a",result[val.product_saletype.product.category_id]);
                                            // console.log("a",result,val.product_saletype.product.category_id);
                                            if(result.hasOwnProperty(val.product_saletype.product.category_id)){
                                                result[val.product_saletype.product.category_id]+=
                                                    val.product_price_was*val.quantity*(1-bill_by_id[val.bill_id].discount);
                                            }else {
                                                result[val.product_saletype.product.category_id]=
                                                    val.product_price_was*val.quantity*(1-bill_by_id[val.bill_id].discount);
                                            }
                                            return result;
                                        },[]);
                                        //console.log(prix_par_category);
                                        o.objectif=prix_par_category[o.category_id];

                                        if(o.objectif==undefined){
                                            o.objectif=0;
                                        }
                                        o.name= o.category.name;

                                        //angular.forEach($scope.objectifs,function(o){                            });
                                        //console.log($scope.objectifs);
                                    }

                                )

                            }
                        );

                    });
                }
            );
        };



        Bills.getList({seller_id : $scope.user.seller.id,created_at:"", _fields: 'id,discount',should_paginate:false}).then(
            function(results){
                //console.log("result",results);
                var bill_by_id = _.keyBy(results,'id');
                //console.log("ill",bill_by_id);
                var bill_ids = _.reduce(results , function(result, value, key)
                {
                    result = result==""?value.id:result+','+value.id;
                    return result;
                },"");
                console.log(bill_ids,"bil id");
                BillProductSaleTypes.getList({"bill_id-in": bill_ids,_includes: 'product_saletype.product',
                    _fields : 'bill_id,quantity,product_price_was,product_saletype_id',should_paginate:false}).then(
                    function(results2){
                        //console.log(results2,"res2");
                        var prix_par_category = _.reduce(results2 , function(result, val, key)
                        {
                            //console.log("a",result[val.product_saletype.product.category_id]);
                           // console.log("a",result,val.product_saletype.product.category_id);
                            if(result.hasOwnProperty(val.product_saletype.product.category_id)){
                                console.log("a");
                                result[val.product_saletype.product.category_id]+=
                                    val.product_price_was*val.quantity*(1-bill_by_id[val.bill_id].discount);
                            }else {
                                console.log("b");
                                result[val.product_saletype.product.category_id]=
                                    val.product_price_was*val.quantity*(1-bill_by_id[val.bill_id].discount);
                            }
                            return result;
                        },[]);
                        //console.log(prix_par_category);
                        angular.forEach($scope.objectifs,function(o){
                            o.objectif=prix_par_category[o.category_id];
                            if(o.objectif==undefined){
                                o.objectif=0;
                            }
                            o.name= o.category.name;
                        });
                        //console.log($scope.objectifs);
                    }

                )

            }
        );

    });

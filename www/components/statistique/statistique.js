/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("StatistiqueCtrl",function($scope,Bills,BillProductSaleTypes,SaleTargets,Auth){
        Auth.getContext().then(function (userData) {
            $scope.user=userData.data.data;


            // recuperation des objectifs par catégories
            SaleTargets.getList({seller_id:$scope.user.seller.id,_includes:"category"}).then(function(o){
                $scope.objectifs=o;
                console.log("&");
            });
            console.log("q");
            Bills.getList({seller_id : $scope.user.seller.id, _fields: 'id,discount', should_paginate: false}).then(
                function(results){
                    console.log(results);
                    var bill_by_id = _.keyBy(results,'id');
                    console.log("ill",bill_by_id);
                    var bill_ids = _.reduce(results , function(result, value, key)
                    {
                        result = result==""?value.id:result+','+value.id;
                        return result;
                    },"");

                    BillProductSaleTypes.getList({"bill_id-in": bill_ids,_includes: 'product_saletype.product',
                        _fields : 'bill_id,quantity,product_price_was,product_saletype_id'}).then(
                        function(results2){
                            console.log("resul",results2);
                            var prix_par_category = _.reduce(results2 , function(result, val, key)
                            {
                                //console.log(result,val);
                                if(result.hasOwnProperty(val.product_saletype.product.category_id)){
                                    result[val.product_saletype.product.category_id]+=
                                        val.product_price_was*val.quantity*bill_by_id[val.bill_id].discount;
                                }else {
                                    result[val.product_saletype.product.category_id]=
                                        val.product_price_was*val.quantity*bill_by_id[val.bill_id].discount;
                                }
                                return result;
                            },[]);
                            //console.log(prix_par_category);
                            angular.forEach($scope.objectifs,function(o){
                                o.objectif=prix_par_category[o.category_id];
                                o.name= o.category.name;
                            });
                            //console.log($scope.objectifs);
                        }

                    )

                }
            );
        });


        // recuperation des objectifs de l'utilisateur

    });

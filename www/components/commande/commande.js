/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("CommandeCtrl",function($scope,$stateParams,$state,Bills,BillProductSaleTypes,DepotSaletypes,Customers,Categories,ToastApi,$translate,$cookies,PaymentMethods){
        $scope.current=new Date();
        var mode=$stateParams.mode;
        $scope.commande={total:0,produits:[],mode_vente:mode};
        $scope.remise=0;
        $scope.F={c_id:undefined};
        if($stateParams.commande_memo_id!=undefined){
            var commande_memo_id=parseInt($stateParams.commande_memo_id);
        }
        // depot_saletypes?_includes=depot,saletype.products
        DepotSaletypes.get(mode,{"_includes":"depot.product_saletypes.product"}).then(function(p){
            $scope.produits= p.depot.product_saletypes;
        },function(q){
            console.log(q);
        });
        Categories.getList().then(function(c){
            $scope.categories=c;
        },function(q){
            console.log(q);
        });
        Customers.getList({"_includes":"customer_type","town_id":2}).then(function(c){
            $scope.clients=c;
        },function(q){
            console.log(q);
        });
        PaymentMethods.getList().then(function(p){
            $scope.mode_paiements=p;
        },function(q){
            console.log(q);
        });

        if(commande_memo_id>0){
            //recuperation de la facture en mémo
            var commande_memo=$cookies.getObject("commande_memo");
            $scope.commande= _.find(commande_memo,function(c){
                if(c.id==commande_memo_id){
                    return c;
                }
            });
            $scope.remise= $scope.commande.remise;
        }

        $scope.$watch('produit.command_quantity',function(q){
            $scope.commande.total=prix_total($scope.commande.produits);
        });
        $scope.$watch('commande',function(q){
            $scope.commande.total=prix_total($scope.commande.produits);
        });


        $scope.detail_produit=function(p){
            $scope.produit=p;
            $("#btn_detail_produit").trigger("click");
        };

        $scope.supprimer_produit=function(p) {
            $("#close_detail_produit").trigger("click");
            var index= _.indexOf($scope.commande.produits,p);
            $scope.commande.produits.splice(index,1);
            $scope.commande.total=prix_total($scope.commande.produits);
            ToastApi.success({msg:$translate.instant("COMMANDE.ARG_24")});
        };

        $scope.memoriser_commande=function(){
            var commande_memo=$cookies.getObject("commande_memo");
            if($scope.commande.id==undefined){
                if(commande_memo==undefined){
                    commande_memo=[];
                }
                $scope.commande.date=new Date();
                if(commande_memo.length==0){
                    $scope.commande.id=1;
                }
                else{
                    $scope.commande.id=commande_memo[commande_memo.length-1].id+1;
                }
                commande_memo.push($scope.commande);
                $cookies.putObject("commande_memo",commande_memo);
            }
            else{
                _.find(commande_memo,function(c){
                    if(c.id==commande_memo_id){
                        c=$scope.commande;
                        return c;
                    }
                });
            }
            $state.go("accueil");
        };

        $scope.ajouter_produit=function(p){
            var t= _.find($scope.commande.produits,function(produit){
                if(p.id==produit.id){
                    return p;
                }
            });

            if(t==null){
                //nouveau produits comme
                p.command_quantity=1;
                $scope.commande.produits.push(p);
            }
            else{
                if(t.pivot.quantity>t.command_quantity)
                {
                    t.command_quantity+=1;
                }
                else{
                    ToastApi.error({msg:$translate.instant("COMMANDE.ARG_23")});
                }
            }
            $scope.commande.total=prix_total($scope.commande.produits);
        };

        $scope.choix_client=function(c){
            $scope.commande.client=c;
            $scope.remise= c.customer_type.discount/100;
            $scope.commande.remise= c.customer_type.discount/100;
            $("#close_ajouter_client").trigger("click");
        };

        $scope.supprimer_client=function(){
            $scope.commande.client=undefined;
            $scope.remise=0;
            $scope.commande.remise=0;
            $("#close_ajouter_client").trigger("click");
        };

        $scope.choix_mode_paiement=function(mode){
            $scope.commande.mode_paiement=mode;
            $scope.mode_paiement=mode.title;
        };

        $scope.facturer=function(){
            var c=$scope.commande;
            if(c.client!=undefined){
                if(c.produits.length>0){
                    // impression du bon de preparation identique à la facture mais avec la mention bon de preparation
                    $("#btn_facturer").trigger("click");
                }
                else{
                    ToastApi.error({msg:$translate.instant("COMMANDE.ARG_27")});
                }
            }
            else{
                ToastApi.error({msg:$translate.instant("COMMANDE.ARG_26")});
            }
        };

        $scope.payer=function(){
            console.log($scope.commande,$scope.echeance);
            var c=$scope.commande;
            var bill={};
            var d =new Date();
            bill.deadline= $scope.echeance==undefined?1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 00:00:00":$scope.echeance;
            bill.discount= c.remise;
            bill.customer_id= c.client.id;
            bill.paymentmethod_id= c.mode_paiement.id;
            bill.seller_id=1;
            bill.statut=$scope.echeance==undefined?1:0;

            // enregistrement de la facture
            console.log("Facture",bill);
            Bills.post(bill).then(function(f){
                console.log(f);
                // enregistrement du bill_product_saletype
                angular.forEach($scope.commande.produits,function(v,k){
                    BillProductSaleTypes.post({quantity:v.command_quantity,bill_id:f.id,product_saletype_id:v.pivot.product_saletype_id}).then(function(b){
                        console.log(b);
                    },function(q){console.log(q)});
                })
            },function(q){
                console.log(q);
            });
            // impression des factures
        };
    });

function prix_total(produits){
    var total=0;
    _.each(produits,function(p){
        total+= p.command_quantity* p.price;
    });
    return total;
}

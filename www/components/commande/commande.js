/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("CommandeCtrl",function($scope,Auth,$stateParams,$rootScope,$state,Bills,BillProductSaleTypes,DepotSaletypes,InfiniteLoad,Customers,Categories,ToastApi,$translate,$cookies,PaymentMethods){

        $scope.user=$rootScope.me;
        if($scope.user==undefined){
            $state.go("accueil");
        }
        $scope.if_payer=true;
        var mode=$stateParams.mode;
        $scope.commande={total:0,produits:[],mode_vente:mode};
        $scope.remise=0;
        $scope.F={c_id:undefined};
        if($stateParams.commande_memo_id!=undefined){
            var commande_memo_id=parseInt($stateParams.commande_memo_id);
        }

        DepotSaletypes.get(mode,{"_includes":"depot.product_saletypes.product"}).then(function(p){
            $scope.produits= p.data.depot.product_saletypes;
        },function(q){
            console.log(q);
        });

        $scope.inf_cat = new InfiniteLoad(Categories,{});
        $scope.nextPage = function () {
            $scope.inf_cat.nextPage().then(function (data) {
                    $scope.categories = data;
                }
            );
        };

        Customers.getList({"_includes":"customer_type","town_id":$scope.user.seller.depot.town_id}).then(function(c){
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

        $scope.modifier_produit=function(code){
            if(code!=undefined){

            }
            $("#close_detail_produit").trigger('click');
        };

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
            if(p.pivot.quantity>0){
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
                $scope.if_payer=true;
            }
            else{
                ToastApi.error({msg:$translate.instant("COMMANDE.ARG_23")});
            }

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
            console.log(c.client);
            if(c.client!=undefined){
                if(c.produits.length>0){
                    // TODO impression du bon de preparation identique à la facture mais avec la mention bon de preparation
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

        $scope.check_payer=function(){
            console.log("i");
            if($scope.if_payer){
                console.log("payer");
                $scope.payer();
                $scope.if_payer=false;
            }
            else{
                console.log("peut pas payer");
            }
        };

        $scope.payer=function(){
            var c=$scope.commande;
            var bill={};
            var d =new Date();

            if(c.mode_paiement.title=="En compte"){
                bill.deadline= $scope.echeance==undefined?1900+ d.getYear()+"-"+(2+ d.getMonth())+"-"+ d.getDate()+" 00:00:00":$scope.echeance;
                bill.status=1;
            }
            else{
                bill.deadline= $scope.echeance==undefined?1900+ d.getYear()+"-"+(1+ d.getMonth())+"-"+ d.getDate()+" 00:00:00":$scope.echeance;
                bill.status=2;
            }

            bill.discount= c.remise;
            bill.customer_id= c.client.id;
            bill.paymentmethod_id= c.mode_paiement.id;
            bill.seller_id=$scope.user.seller.id;
            console.log(bill);
            // enregistrement de la facture
            Bills.post(bill).then(function(f){
                // enregistrement du bill_product_saletype
                angular.forEach($scope.commande.produits,function(v,k){
                    BillProductSaleTypes.post({quantity:v.command_quantity,bill_id:f.data.id,product_saletype_id:v.pivot.product_saletype_id}).then(function(b){
                    },function(q){console.log(q)});
                });
                $scope.commande={total:0,produits:[],mode_vente:mode};
                $scope.mode_paiement="";
                $scope.remise=0;
                $scope.if_payer=true;
                // rafraichissement des produits
                DepotSaletypes.get(mode,{"_includes":"depot.product_saletypes.product"}).then(function(p){
                    $scope.produits= p.data.depot.product_saletypes;
                },function(q){
                    console.log(q);
                });
                $("#btn-facturer-close").trigger("click");
                ToastApi.success({msg:$translate.instant("COMMANDE.ARG_28")});
            },function(q){
                console.log(q);
            });
            // TODO: impression des factures e tenvoi des mail
        };

        $scope.precommande=function(){
            // envoi de la facture au client pour validation.
            // generation du pdf de la facture
        }
    });

function prix_total(produits){
    var total=0;
    _.each(produits,function(p){
        total+= p.command_quantity* p.price;
    });
    return total;
}

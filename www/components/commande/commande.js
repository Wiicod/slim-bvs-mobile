/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("CommandeCtrl",function($scope,$stateParams,$state,Products,ToastApi,$translate,$cookies){
        $scope.current=new Date();
        var mode=$stateParams.mode;
        $scope.commande={total:0,produits:[],mode_vente:mode};
        $scope.remise=0;
// tous les produits
        Products.getList().then(function(data){
            console.log(data);
        },function(a){
            console.log(a);
        });
// post
        Products.post({});

        $scope.clients=[
            {
                id:1,
                name:"Wiicod S.A",
                account:0,
                customer_types_id:1,
                customer_types:{
                    id:1,
                    name:"VIP en compte",
                    client_id:1,
                    discount:1,
                    max_credit:500000
                }
            }
        ];

        $scope.mode_paiements=[
            {
                id:1,
                name:"Espèce"
            },
            {
                id:2,
                name:"Compte client"
            },
            {
                id:3,
                name:"Cheque"
            },
            {
                id:4,
                name:"Virement"
            }
        ];

        $scope.categories=[
            {
                id:1,
                name:"Very"
            },
            {
                id:2,
                name:"MAISON CASTEL"
            }
        ];

        $scope.produits=[
            {
                id:1,
                name:"Very Pamplemousse",
                category_id:1,
                categorie:{
                    id:1,
                    name:"Very"
                },
                product_saletypes_id:1,
                product_saletypes:{
                    id:1,
                    product_id:1,
                    price:15000,
                    saletype_id:1
                },
                stock_id:1,
                stock:{
                    id:1,
                    quantity:2,
                    product_id:1,
                    depot_id:1,
                    max_quantity:2,
                    unity:"C6"
                },
                vintage:2015,
                bar_code:"x"
            },
            {
                id:2,
                name:"Chateau l'évangile",
                category_id:2,
                categorie:{
                    id:2,
                    name:"MAison castel"
                },
                product_saletypes_id:2,
                product_saletypes:{
                    id:2,
                    product_id:2,
                    price:51000,
                    saletype_id:1
                },
                stock_id:2,
                stock:{
                    id:1,
                    quantity:5,
                    product_id:2,
                    depot_id:1,
                    max_quantity:20,
                    unity:"C6"
                },
                vintage:2015,
                bar_code:"x"
            }
        ];

        $scope.$watch('produit.command_quantity',function(q){
            $scope.commande.total=prix_total($scope.commande.produits);
        });
        $scope.$watch('commande',function(q){
           $scope.commande.total=prix_total($scope.commande.produits);
        });

        $scope.old_produits=$scope.produits;



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
            console.log($cookies);
            $state.go("accueil");
        };

        $scope.ajouter_produit=function(p){
            var t= _.find($scope.commande.produits,function(produit){
                if(p.id==produit.id){
                    return p;
                }
            });

            if(t==null){
                // nouveau produits
                p.command_quantity=1;
                $scope.commande.produits.push(p);
                $scope.commande.total+= p.command_quantity*p.product_saletypes.price;
            }
            else{
                if(t.stock.quantity>t.command_quantity)
                {
                    t.command_quantity+=1;
                    $scope.commande.total+= p.command_quantity*p.product_saletypes.price;
                }
                else{
                    ToastApi.error({msg:$translate.instant("COMMANDE.ARG_23")});
                }
            }
        };

        $scope.filtrer_categories=function(c){
            if(c=="tout"){
                $scope.produits=$scope.old_produits;
            }
            else{
                $scope.produits= _.filter($scope.old_produits,function(p){
                    if(p.category_id== c.id){
                        return p;
                    }
                })
            }
        };

        $scope.choix_client=function(c){
            $scope.commande.client=c;
            $scope.remise= c.customer_types.discount/100;
            $scope.commande.remise= c.customer_types.discount/100;
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
            $scope.mode_paiement=mode.name;
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
            // enregistrement dans le serveur
            // impression des factures
        };
    });

function prix_total(produits){
    var total=0;
    _.each(produits,function(p){
        total+= p.command_quantity* p.product_saletypes.price;
    });
    return total;
}

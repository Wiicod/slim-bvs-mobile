/**
 * Created by Ets Simon on 03/06/2017.
 */

app
    .controller("CommandeCtrl",function($scope,$stateParams,$state,Products){
        $scope.current=new Date();
        $scope.commande=[];
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

        $scope.old_produits=$scope.produits;

        $scope.produit={remise:0,quantite:5};

        $scope.commande={total:0,produits:[]};
        var mode=$stateParams.mode;

        $scope.detail_produit=function(p){
            $scope.produit=p;
            $("#btn_detail_produit").trigger("click");
        };

        $scope.memoriser_commande=function(){
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
        }

    });

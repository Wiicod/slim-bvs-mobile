/**
 * Created by Edward NANDA on 17/02/2017.
 */

app


    .controller("RapportsFormulaireCtrl",function($scope,Restangular,$filter,$cookies,Auth){

        Auth.getContext().then(function (userData) {
            $scope.user=userData.data.data;
        });

        $scope.ventes=[];
        $scope.ventes[0]={produits:[],besoins:[]};
        $scope.ventes[0].produits[0]={};
        $scope.ventes[0].produits[0].quantite=0;
        $scope.ventes[0].besoins[0]={quantite:0};

        var allVisite=Restangular.all("visite");
        var allVente=Restangular.all("vente");


        Restangular.all("produit").getList().then(function(produit){
            $scope.produits=produit;
        });

        Restangular.all("client").getList().then(function(client){
            $scope.clients=client;
        });

        $scope.ajouter_visite=function(){
            $scope.ventes.push({produits:[{quantite:0}],besoins:[{quantite:0}]});
        };

        $scope.supprimer_visite=function(v){
            if($scope.ventes.length>1){
                $scope.ventes.splice($scope.ventes.indexOf(v), 1);
            }
        };

        $scope.ajouter_produit=function(v){
            v.produits.push({quantite:0});
        };

        $scope.supprimer_produit=function(v,p){
            if(v.produits.length>1){
                v.produits.splice(v.produits.indexOf(p), 1);
            }
        };

        $scope.ajouter_besoin=function(v){
            v.besoins.push({quantite:0});
        };

        $scope.supprimer_besoin=function(v,p){
            if(v.besoins.length>1){
                v.besoins.splice(v.besoins.indexOf(p), 1);
            }
        };

        $scope.enregistrer_visite=function(){
            var date=""+(new Date().getYear()+1900)+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate();
            angular.forEach($scope.ventes,function(v,k){
                if(v.client_id!=undefined){
                    v.client_id= v.client_id.originalObject.id;
                    v.date=date;
                    v.user_id=user.id;
                    var somme=0;
                    allVisite.post(v).then(function(data){
                        angular.forEach(v.produits,function(p,pk){
                            if(p.quantite>0){
                                p.produit_id= p.produit_id.originalObject.id;
                                // recuperation du prix du produit
                                var pro=$filter("filter")($scope.produits,{id: p.produit_id})[0];
                                somme+=(pro.prix* p.quantite);
                                p.date=date;
                                p.user_id=user.id;
                                p.type="livre";
                                p.visite_id=data.id;
                                allVente.post(p).then(function(pdata){
                                },function(pq){
                                    console.log(pq);
                                });
                            }
                        });

                        angular.forEach(v.besoins,function(p,pk){
                            if(p.produit_id!=undefined && p.quantite>0){
                                console.log(p);
                                p.date=date;
                                p.user_id=user.id;
                                p.type="besoins";
                                p.produit_id= p.produit_id.originalObject.id;
                                p.visite_id=data.id;
                                allVente.post(p).then(function(pdata){

                                },function(pq){
                                    console.log(pq);
                                });
                            }
                        });

                        data.somme=somme;

                        var fd = new FormData();
                        _.each(data, function (val, key) {
                            fd.append(key, val);
                        });
                        fd.append("_method", "PUT");
                        Restangular.one('visite',data.id).withHttpConfig({transformRequest: angular.identity})
                            .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data){
                                //console.log(data);

                            },function(q){
                                console.log(q);
                            });

                    },function(q){
                        console.log(q);
                        alert("Erreur");
                    });
                    $scope.ventes=[];
                    $scope.ventes[0]={produits:[],besoins:[]};
                    $scope.ventes[0].produits[0]={};
                    $scope.ventes[0].produits[0].quantite=0;
                    $scope.ventes[0].besoins[0]={quantite:0};
                }
                else{
                    alert("Aucun client s�lectionn�");
                }
            });
            alert("Rapports enregistr�");
        };
    })


    .controller("RapportsCtrl",function($scope){
        $scope.current=new Date();
    })
    .controller("StatistiqueCtrl",function($scope){
        $scope.current=new Date();
    })


;
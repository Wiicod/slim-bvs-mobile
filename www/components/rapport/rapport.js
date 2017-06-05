/**
 * Created by Edward NANDA on 17/02/2017.
 */

app
    .controller("AppCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("HeaderCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("FooterCtrl",['$scope',function($scope){
        $scope.current=new Date();
        $scope.enregistrerSuggestion=function(){
            console.log($scope.suggestion);
            $("#closeSuggestion").trigger("click");
        };
    }])

    .controller("CommandeCtrl",['$scope','$stateParams','$state',function($scope,$stateParams,$state){
        $scope.current=new Date();

        $scope.produit={remise:0,quantite:5};

        $scope.commande=[];
        var mode=$stateParams.mode;

        $scope.detail_produit=function(produit){
            $scope.produit={remise:0,quantite:5};
            $("#btn_detail_produit").trigger("click");
        };

        $scope.memoriser_commande=function(){
            $state.go("accueil");
        };console.log("saq");
        $scope.h=height+"-"+$(window).width();
        $(document).ready(function(){
            console.log("sqs");
        });
        console.log("sq");
    }])

    .controller("AccueilCtrl",['$scope',function($scope){
        $scope.current=new Date();
        $scope.statutAuth=true;
        $scope.code="0000";
        $scope.h=height;

        //authentification pour ouverture de la caisse
        $scope.authentification=function(code){
            console.log(code);
            if(code=="0000"){
                $scope.statutAuth=false;
            }
            else{
                console.log("Erreur");
                console.log(code);
            }
        };
    }])

    .controller("RapportsFormulaireCtrl",['$scope','Restangular','$filter','$cookies',function($scope,Restangular,$filter,$cookies){
        var user=$cookies.getObject("user");

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
    }])

    .controller("HistoriqueCtrl",['$scope',function($scope){
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
    }])

    .controller("RapportsCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("StatistiqueCtrl",['$scope',function($scope){
        $scope.current=new Date();
    }])
    .controller("UniversCtrl",['$scope',function($scope){
        $scope.current=new Date();

        $scope.plan=true;
    }])

;
/**
 * Created by Ets Simon on 03/06/2017.
 */

config.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    $stateProvider
        .state('app',{
            abstract: true,
            loginRequired:false,
            title:"",
            views:{
                '':{
                    templateUrl: 'main/index.html'
                },
                'header@app': {
                    templateUrl: 'main/header.html',
                    controller: "HeaderCtrl"
                },
                'body@app': {}
            }
        })
        .state('squellete',{
            //abstract: true,
            url:"/",
            parent:"app",
            title:"accueil",
            views:{
                'body@app': {
                    templateUrl: 'main/squellete.html',
                    controller: "AppCtrl"
                } ,
                'vue@squellete': {}
            }
        })
        .state('accueil',{
            url:"accueil",
            parent:"squellete",
            title:"accueil",
            views:{
                'vue@squellete': {
                    templateUrl: 'accueil/content.html',
                    controller:'AccueilCtrl'
                }
            }
        })
        .state('commande',{
            url:"/commande/:mode",
            title:"commande",
            views:{
                '':{
                    templateUrl:   'main/index.html',
                    controller:'CommandeCtrl'
                },
                'header@commande': {
                    templateUrl:   'main/header.html',
                    controller: "HeaderCtrl"
                },
                'body@commande': {
                    templateUrl: 'commande/commande.html'
                }
            }
        })
        .state('rapport',{
            url:"/rapport",
            title:"Rapports",
            views:{
                '':{
                    templateUrl:   'main/index.html',
                    controller:'RapportsCtrl'
                },
                'header@rapport': {
                    templateUrl:   'main/header.html',
                    controller: "HeaderCtrl"
                },
                'body@rapport': {
                    templateUrl: 'rapport/liste_rapports.html'
                }
            }
        })
        .state('formulaire_rapport',{
            url:"/formulaire_rapport",
            title:"Rapports",
            views:{
                '':{
                    templateUrl:  'main/index.html',
                    controller:'RapportsFormulaireCtrl'
                },
                'header@formulaire_rapport': {
                    templateUrl:   'main/header.html',
                    controller: "HeaderCtrl"
                },
                'body@formulaire_rapport': {
                    templateUrl: 'rapport/formulaire_rapport.html'
                }
            }
        })
        .state('historique',{
            url:"/historique",
            parent:"app",
            title:"Historique",
            views:{
                'vue@app': {
                    templateUrl: 'facture/historique.html',
                    controller:'HistoriqueCtrl'
                }
            }
        })
        .state('statistique',{
            url:"/statisique",
            parent:"app",
            title:"Statisitque",
            views:{
                'vue@app': {
                    templateUrl: 'statistique/statistiques.html',
                    controller:'StatistiqueCtrl'
                }
            }
        })

        .state('univers_client',{
            url:"/univers_client",
            title:"Univers Client",
            views:{
                '':{
                    templateUrl:   'main/index.html',
                    controller:'UniversCtrl'
                },
                'header@univers_client': {
                    templateUrl:   'main/header.html',
                    controller: "HeaderCtrl"
                },
                'body@univers_client': {
                    templateUrl: 'client/univers_client.html'
                }
            }
        })


    ;

    $urlRouterProvider.otherwise( '/accueil');

}]);
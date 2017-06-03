/**
 * Created by Ets Simon on 03/06/2017.
 */

config.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    $stateProvider
        .state('app',{
            url:"/app",
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
                'body@app': {
                    templateUrl: 'main/squellete.html',
                    controller:"AppCtrl"
                },
                'modal@app': {
                    templateUrl:'auth/modal/modal.html'
                }
            }
        })
        .state('accueil',{
            url:"/accueil",
            parent:"app",
            title:"accueil",
            views:{
                'vue@app': {
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
                },
                'modal@commande': {
                    templateUrl: 'auth/modal/modal.html'
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
                },
                'modal@rapport': {
                    templateUrl: 'auth/modal/modal.html'
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
                },
                'modal@rapport': {
                    templateUrl: 'auth/modal/modal.html'
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
                },
                'modal@univers_client': {
                    templateUrl: 'auth/modal/modal.html'
                }
            }
        })

    $urlRouterProvider.otherwise( 'app/accueil');

}]);
/**
 * Created by Edward NANDA on 17/02/2017.
 */

config.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise( 'app/accueil');

    $stateProvider
        .state('app',{
            url:"/app",
            loginRequired:false,
            title:"",
            views:{
                '':{
                    templateUrl: template_url + 'index.html'
                },
                'header@app': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@app': {
                    templateUrl: template_url+'static/squellete.html',
                    controller:"AppCtrl"
                },
                'modal@app': {
                    templateUrl: template_url+'static/modal.html'
                }
            }
        })
        .state('accueil',{
            url:"/accueil",
            parent:"app",
            title:"accueil",
            views:{
                'vue@app': {
                    templateUrl: template_url+'accueil/content.html',
                    controller:'AccueilCtrl'
                }
            }
        })
        .state('commande',{
            url:"/commande/:mode",
            title:"commande",
            views:{
                '':{
                    templateUrl: template_url + 'index.html',
                    controller:'CommandeCtrl'
                },
                'header@commande': {
                    templateUrl: template_url + 'static/header.html',
                    controller: "HeaderCtrl"
                },
                'body@commande': {
                    templateUrl: template_url+'command/commande.html'
                },
                'modal@commande': {
                    templateUrl: template_url+'static/modal.html'
                }
            }
        })
        .state('historique',{
            url:"/historique",
            parent:"app",
            title:"Historique",
            views:{
                'vue@app': {
                    templateUrl: template_url+'facture/historique.html'
                }
            }
        })
}]);
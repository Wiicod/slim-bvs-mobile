/**
 * Created by Ets Simon on 03/06/2017.
 */
filter
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

    .filter('billStatus', function ($translate) {
        return function(statut) {
            if(statut=='expired')
            {
                return $translate.instant("HISTORIQUE.ARG_29");
            }
            else if(statut=='waiting_customer_approval'){
                return $translate.instant("HISTORIQUE.ARG_31");
            }
            else if(statut=='waiting_cashier_approval'){
                return $translate.instant("HISTORIQUE.ARG_32");
            }
            else if(statut=='canceled'){
                return $translate.instant("HISTORIQUE.ARG_33");
            }
            else if(statut=='paided'){
                return $translate.instant("HISTORIQUE.ARG_28");
            }

        };
    })

    .filter('roundCoin',function(){

        return function (value,step,up){
            if(up==undefined){
                up=true;
            }
            if(value==undefined)
                return;
            var offset =step||5;
            if(up){
                return parseFloat((Math.ceil(value/offset)*offset).toFixed(2));
            }else{

                return parseFloat((Math.floor(value/offset)*offset).toFixed(2));
            }
        }
    });
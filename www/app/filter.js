/**
 * Created by Ets Simon on 03/06/2017.
 */
filter
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

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
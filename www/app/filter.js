/**
 * Created by Ets Simon on 03/06/2017.
 */
filter
    .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
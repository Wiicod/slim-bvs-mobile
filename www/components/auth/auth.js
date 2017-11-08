/**
 * Created by bvnand01 on 16/06/2017.
 */

app

    .controller("LoginCtrl",function($scope,Auth,$state){
        $scope.user = {};
        $scope.login=function(){
            console.log($scope.user);
            Auth.login($scope.user).then(function (data) {
                $state.go('accueil');
            },function(q){
                console.log(q);
            });
        }

    });
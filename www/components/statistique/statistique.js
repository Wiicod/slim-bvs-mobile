/**
 * Created by Ets Simon on 03/06/2017.
 */

app

    .controller("StatistiqueCtrl",function($scope,Bills){
        var d=new Date();
        var user_id=1;
        // recuperation des objectifs de l'utilisateur
        Bills.getList({"seller_id":user_id,"should_paginate":false}).then(function(o){
            console.log(o);
        },function(q){
            console.log(q);
        });

    });

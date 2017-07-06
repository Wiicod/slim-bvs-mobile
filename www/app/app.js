'use strict';

// Declare app level module which depends on views, and components

var config = angular.module('slim.config',["ui.router",'ionic','pascalprecht.translate', 'satellizer','restangular']);
var filter =  angular.module('slim.filter',["ui.router"]);
var service=angular.module('slim.service',["ui.router"]);
var resources=angular.module('slim.resources',["ui.router"]);
var height=$(window).height();
var ratio=540/720;
var tab_w=962;
var tab_h=577;

// Declare app level module which depends on views, and components
var app = angular.module('slim', [
    'ui.router',
    'slim.filter',
    'slim.config',
    'slim.service',
    'slim.resources',
    'ionic-toast',
    'ngCookies',
    'restangular',
    'ui.bootstrap.datetimepicker',
    'ngStorage',
    'templates',
    'mm.acl',
    'ngMap',
    'ngCordova',
    'signature',
    'infinite-scroll'

])

    .run(function($ionicPlatform,$localStorage,$state,$rootScope,AclService) {

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            $.material.init();
            moment.locale("fr");
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });


        $ionicPlatform.on('resume', function(){
            // your staff here
            if($localStorage.saved_state){
                var s = $localStorage.saved_state;
                if(s.name !=$state.current.name)
                    $state.go(s.name,s.params);
            }
        });

        $ionicPlatform.on('pause', function(){
            // your staff here
            $localStorage.saved_state=$state.current;
        });
    })
;


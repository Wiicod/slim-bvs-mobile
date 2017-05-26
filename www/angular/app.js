'use strict';

// Declare app level module which depends on views, and components

var template_url='templates/'; // chemin vers le dossier des templates
var config=angular.module('slim.config',["ui.router"]);
var controller=angular.module('slim.controller',["ui.router"]);
var service=angular.module('slim.service',["ui.router"]);
var height=$(window).height();
var ratio=540/720;
var tab_w=962;
var tab_h=577;

// Declare app level module which depends on views, and components
angular.module('slim', [
    'ui.router',
    'slim.config',
    'slim.controller',
    'slim.service',
    'ngCookies',
    'restangular',
    'ui.bootstrap.datetimepicker'
]);

$.material.init();
moment.locale("fr");


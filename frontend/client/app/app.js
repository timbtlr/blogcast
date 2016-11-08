// create a angular module named 'blogcast'
angular.module('blogcast', [
        'ui.bootstrap',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls"
    ])
    // Generic router options

    .config(['$urlRouterProvider', '$locationProvider',
        function ($urlRouterProvider, $locationProvider) {
        'use strict';

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }])
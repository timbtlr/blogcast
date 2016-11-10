// "blogcast" application.  Main navigation and content of the page.  Controls the audio player application.
angular
    .module('blogcast', [
        'ui.bootstrap',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls"
    ])
    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
        'use strict';

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        angular.element(document).ready(function() {
            angular.element(document.getElementById("audioApp")).scope().initializeMedia({
                source: "https://s3.amazonaws.com/noscorepodcastaudio/Dark+Souls+3+DLC+OST+-+Sister+Friede.mp3",
                title: "Sister Friede Main Theme",
                description: "Optional boss OST from Dark Souls III DLC.",
                image: null
            });
        });

    }]);


// "audioPlayer" application.  Controls the audio player docked at the bottom of the page.
angular
    .module('audioPlayer', [
        'ui.bootstrap',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls"
    ])
    .controller("audioCtrl", ['$scope', "$sce", "$timeout", '$window', function($scope, $sce, $timeout, $window) {
        $scope.API = null;
        $scope.initialized = false;

        $scope.setMedia = function(item, autoplay){
            $scope.$apply(function() {
                $scope.API.stop();
                $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
                if (autoplay) {
                    $timeout($scope.API.play.bind($scope.API), 100);
                };
            });
        };

        $scope.initializeMedia = function(item){
            $scope.$apply(function() {
                if (!$scope.initialized) {
                    $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
                    $scope.initialized = true;
                };
            });
        };

        $scope.onPlayerReady = function(API) {
            $scope.API = API;
        };

        $scope.config = {
            sources: [],
            theme: {
                url: "bower_cache/videogular-themes-default/videogular.css"
            },
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false
        };


    }]);


angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById("audioApp"), ['audioPlayer']);
});
angular
    .module("sharedAudioService", [])
    .factory("AudioService", function() {
        var currentlyPlaying = null;

        return {
            currentlyPlaying: currentlyPlaying,
            setCurrentlyPlaying: function(newAudio) {
                currentlyPlaying = newAudio;
            },
            getCurrentlyPlaying: function() {
                return currentlyPlaying;
            }
        };
    });



// "blogcast" application.  Main navigation and content of the page.  Controls the audio player application.
angular
    .module('blogcast', [
        'ui.bootstrap',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "sharedAudioService"
    ])
    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
        'use strict';

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        angular.element(document).ready(function() {
            var initialAudio = {
                id: "1",
                source: "https://s3.amazonaws.com/noscorepodcastaudio/Dark+Souls+3+DLC+OST+-+Sister+Friede.mp3",
                title: "Sister Friede Main Theme",
                description: "Optional boss OST from Dark Souls III DLC.",
                image: "http://img02.deviantart.net/13ab/i/2012/360/6/3/ff13_logo_by_bugendaiyaikari-d5pahc2.jpg"
            }
            angular.element(document.getElementById("audioApp")).scope().initializeMedia(initialAudio);
        });

    }]);


// "audioPlayer" application.  Controls the audio player docked at the bottom of the page.
angular
    .module('audioPlayer', [
        'ui.bootstrap',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "sharedAudioService"
    ])
    .controller("audioCtrl", ['$scope', "$sce", "$timeout", '$window', 'AudioService', function($scope, $sce, $timeout, $window, AudioService) {
        $scope.API = null;
        $scope.currentlyPlaying = null;

        $scope.setMedia = function(item, autoplay){
            $scope.$apply(function() {
                $scope.API.stop();
                $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
                $scope.currentlyPlaying = item;
                AudioService.setCurrentlyPlaying(item);
                if (autoplay) {
                    $timeout($scope.API.play.bind($scope.API), 100);
                };
            });
        };

        $scope.initializeMedia = function(item){
            $scope.$apply(function() {
                $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
                $scope.currentlyPlaying = item;
                AudioService.setCurrentlyPlaying(item);
            });
        };

        $scope.onPlayerReady = function(API) {
            $scope.API = API;
        };

        $scope.config = {
            type: "audio",
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
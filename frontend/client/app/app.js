/*
    Main installed application.  This will be the app that renders the pages.
*/
let blogcastInstalledApps = [
    require('./navbar'),
    // "LocalStorageModule",
    // "sharedAudioService",
    // "PodcastService",
    // "BlogService",
    //"envConfig",
    "ui.router",
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "ngFileUpload",
    "hc.marked"
]

angular
    .module("blogcast", blogcastInstalledApps)
    .config(["$urlRouterProvider", "$locationProvider", "markedProvider"/*, "localStorageServiceProvider"*/, function ($urlRouterProvider, $locationProvider, markedProvider/*, localStorageServiceProvider*/) {
        "use strict"

        $locationProvider.html5Mode(true)
        $urlRouterProvider.otherwise("/")

        // Force markdown links to be opened in a new tab by default
        markedProvider.setOptions({gfm: true})
        // markedProvider.setRenderer({
        //     link: function(href, title, text) {
        //         return `<a href="` + href + `"` + (title ? ` title="` + title + `"` : ") + ` target="_blank">` + text + `</a>`;
        //     }
        // })

        // Local storage options
        //localStorageServiceProvider.setPrefix("blogcast")
    }])


// /*
//     "audioPlayer" application.  Controls the audio player docked at the bottom of the page.
// */
// audioInstalledApps = [
//     "ui.bootstrap",
//     "ui.router",
//     "ngSanitize",
//     "com.2fdevs.videogular",
//     "com.2fdevs.videogular.plugins.controls"
// ]

// audioPlayerApp = angular.module("audioPlayer", audioInstalledApps)
//     .controller("audioCtrl", ($scope, $sce, $timeout, $window) ->
//         $scope.API = null;
//         $scope.currentlyPlaying = null;

//         $scope.setMedia = function(item, autoplay){
//             $scope.$apply(function() {
//                 $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
//                 $scope.currentlyPlaying = item;

//                 if ($scope.API  != null) {
//                     $scope.API.stop();
//                      if (autoplay) {
//                         $timeout($scope.API.play.bind($scope.API), 100);
//                     };
//                 };
//             });
//         };

//         $scope.initializeMedia = function(item){
//             $scope.$apply(function() {
//                 $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
//                 $scope.currentlyPlaying = item;
//             });
//         };

//         $scope.onPlayerReady = function(API) {
//             $scope.API = API;
//         };

//         $scope.config = {
//             type: "audio",
//             sources: [],
//             theme: {
//                 url: "bower_cache/videogular-themes-default/videogular.css"
//             },
//             preload: "none",
//             autoHide: false,
//             autoHideTime: 3000,
//             autoPlay: false
//         };
//     );


// /*
//     Shared audio service.  Sits as a middleware between the blogcast app and the audioPlayer app.
// */
// audioService = angular.module("sharedAudioService", [])
//     .factory("AudioService", () ->
//         var currentlyPlaying = null;

//         return {
//             currentlyPlaying: currentlyPlaying,
//             setCurrentlyPlaying: function(newAudio) {
//                 currentlyPlaying = newAudio;
//             },
//             getCurrentlyPlaying: function() {
//                 return currentlyPlaying;
//             }
//         };
//     );


// angular.element(document).ready(() ->
//     angular.bootstrap(document.getElementById("audioApp"), ["audioPlayer"]);
//);
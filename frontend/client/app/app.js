/*
    Main installed application.  This will be the app that renders the pages.
*/
let blogcastInstalledApps = [
    require("./navbar"),
    require("./login"),
    require("./common"),
    require("./podcast"),
    require("./blog"),
    require("./audio").sharedAudioService,
    require("./audio").audioPlayerApp,
    "LocalStorageModule",
    "ui.router",
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "ngFileUpload",
    "hc.marked",
    "ngResource"
]

angular
    .module("blogcast", blogcastInstalledApps)
    .config(["$urlRouterProvider", "$locationProvider", "markedProvider", "localStorageServiceProvider", function ($urlRouterProvider, $locationProvider, markedProvider, localStorageServiceProvider) {
        "use strict"

        $locationProvider.html5Mode(true)
        $urlRouterProvider.otherwise("/")

        // Force markdown links to be opened in a new tab by default
        markedProvider.setOptions({gfm: true})
        // markedProvider.setRenderer({
        //     link: function(href, title, text) {
        //         return `
        //             <a href=" + #{href} + " + (title ?  title=" + title + " : ") +  target="_blank"> + text + </a>;
        //         `

        //     }
        // })

        // Local storage options
        localStorageServiceProvider.setPrefix("blogcast")
    }])
    .config(require("./urls"))

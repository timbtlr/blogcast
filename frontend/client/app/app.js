/*
    Main installed application.  This will be the app that renders the pages.
*/
let blogcastInstalledApps = [
    require("./navbar"),
    require("./login"),
    require("./common"),
    require("./config"),
    require("./podcast"),
    require("./blog"),
    require("./audio").audioPlayerApp,
    "LocalStorageModule",
    "ui.router",
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "ngFileUpload",
    "hc.marked",
    "ngResource",
    "ngWYSIWYG"
]

angular
    .module("blogcast", blogcastInstalledApps)
    .config(["$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", function ($urlRouterProvider, $locationProvider, localStorageServiceProvider) {
        "use strict"

        $locationProvider.html5Mode(true)
        $urlRouterProvider.otherwise("/")

        // Local storage options
        localStorageServiceProvider.setPrefix("blogcast")
    }])
    .config(require("./urls"))



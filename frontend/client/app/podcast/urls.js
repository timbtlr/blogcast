module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider.state("app.podcast", {
        url: "/podcast",
        title: "Podcast Episodes",
        templateUrl: "templates/podcast/components/Podcast.html"
    })

    $stateProvider.state("app.upload", {
        url: "/upload",
        title: "Upload a Podcast Episode",
        templateUrl: "templates/podcast/components/UploadEpisode.html",
        resolve: {
            verify: ($stateParams, $state, LoginAPI) => {
                LoginAPI.checkLogin().catch(() => $state.go("app.podcast"))
            }
        }
    })
}
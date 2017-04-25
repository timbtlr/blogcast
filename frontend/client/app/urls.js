module.exports = ($stateProvider, $urlRouterProvider) => {
    "use strict"

    $stateProvider.state("app", {
        abstract: true,
        template: "<div ui-view></div>",
        resolve: {
            podcastEpisodes: (PodcastActions) => {
                PodcastActions.listEpisodes()
            }
        }
    })

    $stateProvider.state("app.upload", {
        url: "/upload",
        templateUrl: "templates/podcast/templates/uploadEpisode.html",
        controller: "EpisodeUploadController"
    })

    $urlRouterProvider.otherwise("/")
}
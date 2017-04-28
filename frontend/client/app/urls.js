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

    $urlRouterProvider.otherwise("/")
}
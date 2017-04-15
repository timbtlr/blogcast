module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider.state("podcast",
        {
            url: "/",
            templateUrl: "templates/podcast/templates/podcast.html",
            controller: "PodcastController"
        }
    )

    $stateProvider.state("upload",
        {
            url: "/upload",
            templateUrl: "templates/podcast/templates/uploadEpisode.html",
            controller: "EpisodeUploadController"
        }
    )
}
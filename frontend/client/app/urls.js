module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider.state("podcast",
        {
            url: "/",
            templateUrl: "templates/podcast/templates/podcast.html",
            controller: "PodcastController"
        }
    )

    $stateProvider.state("blog",
        {
            url: "/blog",
            templateUrl: "templates/blog/templates/blog.html",
            controller: "BlogController"
        }
    )

    $stateProvider.state("write",
        {
            url: "/write",
            templateUrl: "templates/blog/templates/writeBlog.html",
            controller: "WriteController"
        }
    )

    $stateProvider.state("login",
        {
            url: "/login",
            templateUrl: "templates/login/templates/login.html",
            controller: "LoginCtrl"
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
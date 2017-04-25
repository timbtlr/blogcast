module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider.state("app.podcast", {
        url: "/podcast",
        title: "Podcast Episodes",
        templateUrl: "templates/podcast/components/Podcast.html"
    })
}
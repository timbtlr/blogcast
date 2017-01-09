module.exports = angular
    .module("podcast", [])
    //.service("EpisodeUploadService", require("./services/EpisodeUploadService"))
    .service("Episode", require("./services/EpisodeResource"))
    .controller("PodcastCtrl", require("./controllers/PodcastControl"))
    .name
module.exports = angular
    .module("podcast", [])
    .controller("PodcastController", require("./controllers/PodcastControl"))
    .controller("EpisodeUploadController", require("./controllers/EpisodeUploadControl"))
    .service("Episode", require("./services/EpisodeResource"))
    .service("EpisodeUploadService", require("./services/EpisodeUploadService"))
    .name
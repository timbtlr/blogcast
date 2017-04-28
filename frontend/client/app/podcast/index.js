import EpisodeList from "./components/smart/EpisodeList"
import Playlist from "./components/dumb/Playlist"
import UploadEpisodeForm from "./components/smart/UploadEpisodeForm"

module.exports = angular
    .module("podcast", [])
    .service("PodcastActions", require("./actions/PodcastActions"))
    .service("EpisodeAPI", require("./services/EpisodeAPI"))
    .controller("EpisodeUploadController", require("./controllers/EpisodeUploadControl"))
    .service("Episode", require("./services/EpisodeResource"))
    .service("EpisodeResource", require("./services/EpisodeResource"))
    .service("EpisodeUploadService", require("./services/EpisodeUploadService"))
    .component(EpisodeList.selector, EpisodeList)
    .component(Playlist.selector, Playlist)
    .component(UploadEpisodeForm.selector, UploadEpisodeForm)
    .config(require("./urls"))
    .name
module.exports = ($ngRedux, constants, EpisodeAPI) => {
    return {
        selectEpisode: (item) => {
            $ngRedux.dispatch({
                type: constants.SET_CURRENT_PLAYING,
                item: item
            })

            let audioElement = angular.element(document.getElementById("audioApp")).scope()
            if (audioElement !== undefined) {
                audioElement.setMedia(item, true)
            }
        },
        listEpisodes: () => {
            const api = new EpisodeAPI()
            api.list()
        }
    }
}
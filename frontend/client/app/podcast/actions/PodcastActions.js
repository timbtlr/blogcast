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
        },
        createEpisode: (title, desc, audio, image) => {
            const api = new EpisodeAPI()
            api.create({
                "title": title,
                "description": desc,
                "source": audio,
                "image": image
            })
        },
        deleteEpisode: (id) => {
            if (id) {
                const api = new EpisodeAPI()
                api.delete(id)
            }
        }
    }
}
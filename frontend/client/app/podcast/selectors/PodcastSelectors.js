import * as PlayerSelectors from "app/audio/selectors/PlayerSelectors"

const episodesById = (state) => state.podcast.byId

export const episodeList = (state) => {
    return Object.values(episodesById(state))
}

export const formattedEpisodeList = (state) => {
    const currentlyPlaying = PlayerSelectors.currentlyPlaying(state)
    return Object.values(episodesById(state)).map((episode) => {
        let selected = false
        if (currentlyPlaying) {
            selected = currentlyPlaying.id === episode.id
        }

        let correctDate = episode.uploaded_time.substring(0, episode.uploaded_time.length-3)
        return {
            ...episode,
            selected,
            uploaded_time: new Date(correctDate).toISOString().substring(0, 10)
        }
    })
}

export const formattedEpisodeListForDelete = (state) => {
    const currentlyPlaying = PlayerSelectors.currentlyPlaying(state)
    return [
        {
            title: "Select an episode to delete"
        },
        ...Object.values(episodesById(state)).map((episode) => {
            let selected = false
            if (currentlyPlaying) {
                selected = currentlyPlaying.id === episode.id
            }

            let correctDate = episode.uploaded_time.substring(0, episode.uploaded_time.length-3)
            return {
                ...episode,
                selected,
                uploaded_time: new Date(correctDate).toISOString().substring(0, 10)
            }
        })
    ]
}

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
        return {
            ...episode,
            selected,
            uploaded_time: new Date(episode.uploaded_time).toISOString().substring(0, 10)
        }
    })
}

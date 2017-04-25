const player = (state) => state.player

export const currentlyPlaying = (state) => {
    return player(state).current
}

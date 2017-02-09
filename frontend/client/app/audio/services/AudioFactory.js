module.exports = () => {
    let currentlyPlaying = null

    return {
        currentlyPlaying: currentlyPlaying,
        setCurrentlyPlaying: function(newAudio) {
            currentlyPlaying = newAudio
        },
        getCurrentlyPlaying: function() {
            return currentlyPlaying
        }
    }
}
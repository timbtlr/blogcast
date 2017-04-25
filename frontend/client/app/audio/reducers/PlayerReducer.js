import constants from "app/config/constants"

const defaultState = {
    current: null
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.SET_CURRENT_PLAYING: {
            return {
                ...state,
                current: action.item
            }
        }
    }
    return state
}

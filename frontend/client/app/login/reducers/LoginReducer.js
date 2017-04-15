import constants from "app/config/constants"

const defaultState = {
    error: null
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.LOGIN: {
            return {
                ...state,
                error: null
            }
        }
        case constants.LOGIN_ERROR: {
            return {
                ...state,
                error: action.message
            }
        }
    }
    return state
}

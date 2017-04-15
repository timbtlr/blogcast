import constants from "app/config/constants"

const defaultState = {
    loggingIn: false,
    user: null
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.VERIFY:
        case constants.LOGIN: {
            return {
                ...state,
                loggingIn: true
            }
        }
        case constants.VERIFY_SUCCESS:
        case constants.LOGIN_SUCCESS: {
            return {
                ...state,
                loggingIn: false,
                user: action.user
            }
        }
        case constants.VERIFY_ERROR:
        case constants.LOGIN_ERROR: {
            return {
                ...state,
                loggingIn: false,
                user: null
            }
        }
        case constants.LOGOUT: {
            return {
                ...state,
                user: null
            }
        }
    }
    return state
}

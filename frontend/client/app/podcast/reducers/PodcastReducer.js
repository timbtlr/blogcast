import constants from "app/config/constants"

const defaultState = {
    byId: {},
    current: null,
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    hasError: false,
    errorMessage: null
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.LIST_EPISODES: {
            return {
                ...state,
                isFetching: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.LIST_EPISODES_SUCCESS: {
            let newState = {
                ...state,
                isFetching: false
            }
            action.data.forEach((episode) => {
                newState = {
                    ...newState,
                    byId: {
                        ...newState.byId,
                        [episode.id]: episode
                    }
                }
            })
            return newState
        }
    }
    return state
}

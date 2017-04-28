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
        case constants.CREATE_EPISODE: {
            return {
                ...state,
                isCreating: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.CREATE_EPISODE_SUCCESS: {
            return {
                ...state,
                isCreating: false,
                byId: {
                    ...state.byId,
                    [action.data.id]: action.data
                }

            }
        }
        case constants.DELETE_EPISODE: {
            return {
                ...state,
                isDeleting: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.DELETE_EPISODE_SUCCESS: {
            let newState = {...state}
            delete newState.byId[action.id]
            return newState
        }
    }
    return state
}

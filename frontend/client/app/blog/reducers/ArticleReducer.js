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
        case constants.LIST_ARTICLES: {
            return {
                ...state,
                isFetching: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.LIST_ARTICLES_SUCCESS: {
            let newState = {
                ...state,
                isFetching: false
            }
            action.data.forEach((article) => {
                newState = {
                    ...newState,
                    byId: {
                        ...newState.byId,
                        [article.id]: article
                    }
                }
            })
            return newState
        }
        case constants.GET_ARTICLE: {
            return {
                ...state,
                isFetching: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.GET_ARTICLE_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                byId: {
                    ...state.byId,
                    [action.data.id]: action.data
                }

            }
        }
        case constants.CREATE_ARTICLE: {
            return {
                ...state,
                isCreating: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.CREATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                isCreating: false,
                byId: {
                    ...state.byId,
                    [action.data.id]: action.data
                }

            }
        }
        case constants.UPDATE_ARTICLE: {
            return {
                ...state,
                isUpdating: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.UPDATE_ARTICLE_SUCCESS: {
            return {
                ...state,
                isUpdating: false,
                byId: {
                    ...state.byId,
                    [action.data.id]: action.data
                }

            }
        }
        case constants.DELETE_ARTICLE: {
            return {
                ...state,
                isDeleting: true,
                hasError: false,
                errorMessage: null
            }
        }
        case constants.DELETE_ARTICLE_SUCCESS: {
            let newState = {...state}
            delete newState.byId[action.id]
            return newState
        }
        case constants.ARTICLE_SET_CURRENT: {
            return {
                ...state,
                current: action.key
            }
        }

    }
    return state
}

import {CATEGORIES} from "app/blog/constants/categories"
import constants from "app/config/constants"

const defaultState = {
    current: null,
    category: CATEGORIES[0]
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.BLOG_EDIT_SET_ACTIVE_ARTICLE: {
            return {
                ...state,
                current: action.id
            }
        }
        case constants.BLOG_EDIT_SET_CATEGORY: {
            return {
                ...state,
                category: action.key
            }
        }
    }
    return state
}

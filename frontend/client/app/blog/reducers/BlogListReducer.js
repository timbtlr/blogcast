import {CATEGORIES} from "app/blog/constants/categories"
import {addOrRemoveId} from "app/common/helpers/ReducerHelpers"
import constants from "app/config/constants"

const defaultState = {
    categories: CATEGORIES
}

module.exports = function(state = defaultState, action) {
    switch (action.type) {
        case constants.BLOG_LIST_TOGGLE_CATEGORY: {
            return {
                ...state,
                categories: addOrRemoveId(state.categories, action.key)
            }
        }
    }
    return state
}

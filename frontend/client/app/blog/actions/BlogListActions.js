module.exports = ($ngRedux, constants) => {
    return {
        toggleCategoryFilter: (key) => {
            $ngRedux.dispatch({
                type: constants.BLOG_LIST_TOGGLE_CATEGORY,
                key: key
            })
        }
    }
}
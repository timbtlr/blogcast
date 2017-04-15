module.exports = ($ngRedux, constants) => {
    return {
        setCurrentArticle: (key) => {
            $ngRedux.dispatch({
                type: constants.ARTICLE_SET_CURRENT,
                key: key
            })
        }
    }
}
module.exports.config = ($ngReduxProvider, ENV) => {
    /*
    Setup the redux store.
    */
    const reducers = {
        "articles": require("app/blog/reducers/ArticleReducer"),
        "blogList": require("app/blog/reducers/BlogListReducer"),
        "user": require("app/login/reducers/UserReducer"),
        "login": require("app/login/reducers/LoginReducer"),
        "player": require("app/audio/reducers/PlayerReducer"),
        "podcast": require("app/podcast/reducers/PodcastReducer"),
        "write": require("app/blog/reducers/WriteReducer")
    }
    let devTools = []
    const reduxDevtoolExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({})
    if (reduxDevtoolExtension) {
        devTools.push(reduxDevtoolExtension)
    }

    let middleware = [window.ReduxThunk.default]
    if (ENV.debug) {
        middleware.push(require("redux-immutable-state-invariant")())
    }

    $ngReduxProvider.createStoreWith(
        reducers,
        middleware,
        devTools
    )
}

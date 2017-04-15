module.exports = function($http, $ngRedux, $q, constants, ArticleResource) {
    return class ArticleAPI {
        list() {
            $ngRedux.dispatch({
                type: constants.LIST_ARTICLES
            })
            ArticleResource.query().$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.LIST_ARTICLES_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.LIST_ARTICLES_ERROR,
                        data: error.data
                    })
                })
        }

        get(articleId) {
            $ngRedux.dispatch({
                type: constants.GET_ARTICLE
            })
            ArticleResource.get(articleId).$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.GET_ARTICLE_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.GET_ARTICLE_ERROR,
                        data: error
                    })
                })
        }

        create(data) {
            $ngRedux.dispatch({
                type: constants.CREATE_ARTICLE
            })
            ArticleResource.create(data).$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.CREATE_ARTICLE_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.CREATE_ARTICLE_ERROR,
                        data: error
                    })
                })
        }

        update(id, data) {
            $ngRedux.dispatch({
                type: constants.UPDATE_ARTICLE
            })
            ArticleResource.update({id}, data).$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.UPDATE_ARTICLE_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.UPDATE_ARTICLE_ERROR,
                        data: error
                    })
                })
        }

        delete(id) {
            let deferred = $q.defer()
            $ngRedux.dispatch({
                type: constants.DELETE_ARTICLE
            })
            ArticleResource.delete({id}).$promise
                .then(() => {
                    deferred.resolve()
                    $ngRedux.dispatch({
                        type: constants.DELETE_ARTICLE_SUCCESS,
                        id: id
                    })
                })
                .catch((error) => {
                    deferred.reject()
                    $ngRedux.dispatch({
                        type: constants.DELETE_ARTICLE_ERROR,
                        data: error
                    })
                })
            return deferred.promise
        }
    }
}

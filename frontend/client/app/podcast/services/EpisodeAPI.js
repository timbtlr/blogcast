module.exports = function($http, $ngRedux, $q, constants, EpisodeResource) {
    return class EpisodeAPI {
        list() {
            $ngRedux.dispatch({
                type: constants.LIST_EPISODES
            })
            EpisodeResource.query().$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.LIST_EPISODES_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.LIST_EPISODES_ERROR,
                        data: error.data
                    })
                })
        }

        create(data) {
            $ngRedux.dispatch({
                type: constants.CREATE_EPISODE
            })
            EpisodeResource.create(data).$promise
                .then((data) => {
                    $ngRedux.dispatch({
                        type: constants.CREATE_EPISODE_SUCCESS,
                        data: data.data
                    })
                })
                .catch((error) => {
                    $ngRedux.dispatch({
                        type: constants.CREATE_EPISODE_ERROR,
                        data: error
                    })
                })
        }

        delete(id) {
            let deferred = $q.defer()
            $ngRedux.dispatch({
                type: constants.DELETE_EPISODE
            })
            EpisodeResource.delete({id}).$promise
                .then(() => {
                    deferred.resolve()
                    $ngRedux.dispatch({
                        type: constants.DELETE_EPISODE_SUCCESS,
                        id: id
                    })
                })
                .catch((error) => {
                    deferred.reject()
                    $ngRedux.dispatch({
                        type: constants.DELETE_EPISODE_ERROR,
                        data: error
                    })
                })
            return deferred.promise
        }
    }
}

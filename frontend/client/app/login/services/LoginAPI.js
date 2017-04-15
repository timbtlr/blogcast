module.exports = ($ngRedux, $q, ENV, localStorageService, constants, LoginResource, VerifyResource) => {
    let user = undefined
    return {
        user: () => {
            return user
        },
        loggedIn: () => {
            if (user) {
                return user.is_active
            }
            return false
        },
        adminUser: () => {
            if (user) {
                return user.is_superuser
            }
            return false
        },
        login: (username, password) => {
            $ngRedux.dispatch({
                type: constants.LOGIN
            })
            let deferred = $q.defer()
            LoginResource.auth(
                {},
                {
                    "username": username,
                    "password": password
                }
            ).$promise.then((data) => {
                if (data.data.token) {
                    localStorageService.set(ENV.localStorageName, data.data.token)
                    deferred.resolve(true)
                    user = data.data.user

                    $ngRedux.dispatch({
                        type: constants.LOGIN_SUCCESS,
                        user: data.data.user
                    })
                } else {
                    deferred.reject(false)
                    user = undefined
                    $ngRedux.dispatch({
                        type: constants.LOGIN_ERROR,
                        message: "No token was provided with the logged-in user."
                    })
                }
            }).catch(() => {
                deferred.reject(false)
                user = undefined
                $ngRedux.dispatch({
                    type: constants.LOGIN_ERROR,
                    message: "This username/password combination could not be logged in."
                })
            })

            return deferred.promise
        },
        logout: () => {
            localStorageService.remove(ENV.localStorageName)
            user = undefined
            $ngRedux.dispatch({
                type: constants.LOGOUT
            })
        },
        checkLogin: () => {
            $ngRedux.dispatch({
                type: constants.VERIFY
            })
            let token = localStorageService.get(ENV.localStorageName)
            let deferred = $q.defer()
            VerifyResource.auth(
                {},
                {
                    "token": token
                }
            ).$promise.then((data) => {
                deferred.resolve(true)
                user = data.data.user
                $ngRedux.dispatch({
                    type: constants.VERIFY_SUCCESS,
                    user: data.data.user
                })
            }).catch(() => {
                deferred.reject(false)
                user = undefined
                $ngRedux.dispatch({
                    type: constants.VERIFY_ERROR
                })
            })

            return deferred.promise
        }
    }
}
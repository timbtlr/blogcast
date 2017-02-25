module.exports = ($q, ENV, localStorageService, Login, Verify) => {
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
            let deferred = $q.defer()
            Login.auth(
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
                } else {
                    deferred.reject(false)
                    user = undefined
                }
            }).catch(() => {
                deferred.reject(false)
                user = undefined
            })

            return deferred.promise
        },
        logout: () => {
            localStorageService.remove(ENV.localStorageName)
            user = undefined
        },
        checkLogin: () => {
            let token = localStorageService.get(ENV.localStorageName)
            let deferred = $q.defer()
            Verify.auth(
                {},
                {
                    "token": token
                }
            ).$promise.then((data) => {
                deferred.resolve(true)
                user = data.data.user
            }).catch(() => {
                deferred.reject(false)
                user = undefined
            })

            return deferred.promise
        }
    }
}
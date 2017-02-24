module.exports = ($q, ENV, localStorageService, Login, Verify) => {
    let loggedIn = false
    return {
        loggedIn: () => {
            return loggedIn
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
                    loggedIn = true
                } else {
                    deferred.reject(false)
                    loggedIn = false
                }
            }).catch(() => {
                deferred.reject(false)
                loggedIn = false
            })

            return deferred.promise
        },
        logout: () => {
            localStorageService.remove(ENV.localStorageName)
            loggedIn = false
        },
        checkLogin: () => {
            let token = localStorageService.get(ENV.localStorageName)
            let deferred = $q.defer()
            Verify.auth(
                {},
                {
                    "token": token
                }
            ).$promise.then(() => {
                deferred.resolve(true)
                loggedIn = true
            }).catch(() => {
                deferred.reject(false)
                loggedIn = false
            })

            return deferred.promise
        }
    }
}
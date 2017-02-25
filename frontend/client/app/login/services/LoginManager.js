module.exports = ($q, ENV, localStorageService, Login, Verify) => {
    let loggedIn = false
    let adminUser = false
    return {
        loggedIn: () => {
            return loggedIn
        },
        adminUser: () => {
            return adminUser
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
                    adminUser = data.data.user.is_superuser
                } else {
                    deferred.reject(false)
                    loggedIn = false
                    adminUser = false
                }
            }).catch(() => {
                deferred.reject(false)
                loggedIn = false
                adminUser = false
            })

            return deferred.promise
        },
        logout: () => {
            localStorageService.remove(ENV.localStorageName)
            loggedIn = false
            adminUser = false
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
                adminUser = data.data.user.is_superuser
                loggedIn = true

            }).catch(() => {
                deferred.reject(false)
                adminUser = false
                loggedIn = false
            })

            return deferred.promise
        }
    }
}
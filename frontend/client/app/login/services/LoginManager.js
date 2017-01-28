module.exports = function(ENV, localStorageService) {
    let loggedIn = false
    let localStorageVarName = "adminPassword"

    return {
        login: function(password) {
            if (password === ENV.adminPassword) {
                localStorageService.set(localStorageVarName, CryptoJS.AES.encrypt(password, ENV.loginPassphrase).toString())
                loggedIn = true
                return true
            }
            return false
        },
        logout: function() {
            localStorageService.remove(localStorageVarName)
            loggedIn = false
        },
        checkLogin: function() {
            if (loggedIn) {
                return true
            } else {
                let encrypted = localStorageService.get(localStorageVarName)
                if (encrypted !== null) {
                    let existingAdminPassword = CryptoJS.AES.decrypt(encrypted, ENV.loginPassphrase).toString(CryptoJS.enc.Utf8)

                    if (existingAdminPassword === ENV.adminPassword) {
                        loggedIn = true
                        return true
                    }
                }
            }
            return false
        }
    }
}
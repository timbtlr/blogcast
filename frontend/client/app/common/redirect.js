module.exports = ($state, LoginManager) => {
    return {
        checkLoggedIn: function() {
            let loggedIn

            LoginManager.checkLogin().$promise.then(() => {
                loggedIn = true
            }).catch(() => {
                loggedIn = false
                $state.go("podcast")
            })
        }
    }
}
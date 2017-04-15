module.exports = ($state, LoginAPI) => {
    return {
        checkLoggedIn: function() {
            let loggedIn

            LoginAPI.checkLogin().$promise.then(() => {
                loggedIn = true
            }).catch(() => {
                loggedIn = false
                $state.go("podcast")
            })
        }
    }
}
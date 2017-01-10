module.exports = ($state, LoginManager) => {
    return {
        checkLoggedIn: function() {
            let loggedIn = LoginManager.checkLogin()

            if (!loggedIn) {
                $state.go("podcast")
            }
        }
    }
}
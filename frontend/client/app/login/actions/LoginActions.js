module.exports = ($ngRedux, $state, constants, LoginAPI) => {
    return {
        login: (username, password) => {
            LoginAPI.login(username, password).then(() => {
                toastr.info(`${username} has been logged in`)
                $state.go("app.podcast")
            })
        }
    }
}
module.exports = ($scope, $state, ENV, LoginManager) => {
    $scope.login = function (username, password) {
        LoginManager.login(username, password).then(() => {
            $state.go("podcast")
        }).catch(() => {
            $scope.errorState = "This username/password combination could not be logged in."
        })

    }
}
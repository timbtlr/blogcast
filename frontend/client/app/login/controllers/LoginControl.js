module.exports = ($scope, $state, ENV, LoginManager) => {
    $scope.login = function (password) {
        const result = LoginManager.login(password)
        if (result) {
            $state.go("podcast")
        } else {
            $scope.errorState = "Incorrect password"
        }
    }
}
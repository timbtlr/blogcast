module.export = ($scope, $state, ENV, LoginManager) => {
    $scope.login = function (password) {
        LoginManager.login(password)
        $state.go("podcast")
    }
}
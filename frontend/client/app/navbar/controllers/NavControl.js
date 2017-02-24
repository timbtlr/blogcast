module.exports = ($scope, $state, LoginManager) => {
    $scope.loggedIn = LoginManager.checkLogin()

    $scope.logout = function() {
        LoginManager.logout()
        $scope.loggedIn = false
        // Reload the current state to ensure login-only states are left
        $state.go($state.current.name, {}, { reload: true })
    }

    $scope.$watch(
        function() {
            return LoginManager.loggedIn()
        },
        function(newValue) {
            console.log(newValue)
            $scope.loggedIn = newValue
        }
    )

    $scope.stateIs = (typeArray) => {
        for (let type of typeArray) {
            if ($state.is(type)) {
                return true
            }
        }
        return false
    }
}
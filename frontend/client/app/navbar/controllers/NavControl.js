module.exports = ($scope, $state, LoginAPI) => {
    $scope.loggedIn = LoginAPI.checkLogin()

    $scope.logout = function() {
        LoginAPI.logout()
        $scope.loggedIn = false
        // Reload the current state to ensure login-only states are left
        $state.go($state.current.name, {}, { reload: true })
    }

    $scope.$watch(
        function() {
            return LoginAPI.loggedIn()
        },
        function(newValue) {
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
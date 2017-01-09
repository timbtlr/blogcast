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
            return LoginManager.checkLogin()
        },
        function(newValue) {
            $scope.loggedIn = newValue
        }
    )
}
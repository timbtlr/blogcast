angular.module('blogcast')
    .controller('NavCtrl', ['$scope', '$state', 'LoginManager', function ($scope, $state, LoginManager) {
        $scope.logged_in = LoginManager.checkLogin();

        $scope.logout = function() {
            LoginManager.logout();
            $scope.logged_in = false;
            // Reload the current state to ensure login-only states are left
            $state.go($state.current.name, {}, {reload:true});
        };

        $scope.$watch(
            function( $scope ) {
                return LoginManager.checkLogin();
            },
            function( newValue ) {
                $scope.logged_in = newValue;
            }
        );
    }]);
angular.module('blogcast')
    .controller('NavCtrl', ['$scope', '$state', 'LoginManager', function ($scope, $state, LoginManager) {
        $scope.logged_in = LoginManager.checkLogin();

        $scope.logout = function() {
            LoginManager.logout();
            $scope.logged_in = false;
        };

        $scope.$watch(
            function( $scope ) {
                return LoginManager.checkLogin();
            },
            function( newValue ) {
                console.log(newValue);
                $scope.logged_in = newValue;
            }
        );
    }]);
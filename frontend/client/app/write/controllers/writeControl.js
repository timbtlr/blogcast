angular.module('blogcast')
    .controller('WriteBlogCtrl', ['$scope', '$state', 'ENV', 'LoginManager', function ($scope, $state, ENV, LoginManager) {
        $scope.logged_in = LoginManager.checkLogin();

        if (!$scope.logged_in) {
            $state.go("podcast")
        }
    }]);
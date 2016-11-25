angular.module('blogcast')
    .controller('LoginCtrl', ['$scope', '$state', 'ENV', 'LoginManager', function ($scope, $state, ENV, LoginManager) {
        $scope.login = function (password) {
            LoginManager.login(password);
            $state.go('podcast', {}, {reload: true});
        };
    }]);
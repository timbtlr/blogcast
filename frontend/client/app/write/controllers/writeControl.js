angular.module('blogcast')
    .controller('WriteBlogCtrl', ['$scope', '$state', 'ENV', 'LoginManager', 'Post', function ($scope, $state, ENV, LoginManager, Post) {
        $scope.logged_in = LoginManager.checkLogin();
        $scope.showMessage = false;

        if (!$scope.logged_in) {
            $state.go("podcast")
        };

        $scope.submitPost = function () {
            // Post.create({
            //     "title": $scope.postTitle,
            //     "description": $scope.postDescription,
            //     "author": $scope.postAuthor,
            //     "text": $scope.blogText
            // })

            $scope.postTitle = null;
            $scope.postDescription = null;
            $scope.postAuthor = null;
            $scope.blogText = null;
            $scope.showSubmitMessage(true, "Post submitted")
    	};

        $scope.readyForUpload = function() {
            return $scope.postAuthor != undefined && $scope.postTitle != undefined && $scope.postDescription != undefined && $scope.blogText != "";
        };

        $scope.showSubmitMessage = function(success, message) {
        	$scope.error = !success;
        	$scope.submitMessage = message;
        	$scope.showMessage = true;
        };
    }]);
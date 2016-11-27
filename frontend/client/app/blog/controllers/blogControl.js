angular.module('blogcast')
    .controller('BlogCtrl', ['$scope', 'Post', function ($scope, Post) {
        Post.query().$promise.then(function(data) {
             $scope.postList = data.data;
            $scope.currentPost = $scope.postList[0];
        });

    	$scope.setPost = function (item) {
    		$scope.currentPost = item;
    	};
    }]);

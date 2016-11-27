angular.module('blogcast')
    .controller('BlogCtrl', ['$scope', function ($scope) {
        $scope.postList = [
            {
                "title": "Something",
                "description": "This is a blog post",
                "text": "# Hello this is a test\n**I'm not sure it is going to work though**"
            },
            {
                "title": "Another thing",
                "description": "Another post",
                "text": "# My butt went rogue\n*Can you believe it?*"
            }
        ];
        

    	$scope.currentPost = $scope.postList[0];

    	$scope.setPost = function (item) {
    		$scope.currentPost = item;
    	};
    }]);

module.exports = ($scope, Post) => {
    Post.query().$promise.then((data) => {
        $scope.postList = data.data
        $scope.currentPost = $scope.postList[0]
    })
	$scope.setPost = (item) => {
		$scope.currentPost = item
	}
}

module.exports = ($scope, ArticleAPI, LoginAPI) => {
    $scope.adminUser = false
    LoginAPI.checkLogin().then(() => {
        $scope.adminUser = LoginAPI.adminUser()
        $scope.filterPosts()
    })

    $scope.filters = ["Technology", "Gaming", "Variety"]
    $scope.rawData = []

    console.log("GETTING THEM")
    const api = new ArticleAPI()
    api.list()

    // .$promise.then((data) => {
    //     $scope.rawData = data.data
    //     $scope.filterPosts()
    //     $scope.currentPost = $scope.postList[0]
    // })
    $scope.setPost = (item) => {
        $scope.currentPost = item
    }

    $scope.toggleFilter = (value) => {
        if (_.contains($scope.filters, value)) {
            $scope.filters = _.filter($scope.filters, (x) => {
                return x !== value
            })
        } else {
            $scope.filters.push(value)
        }

        $scope.filterPosts()
    }

    $scope.filterPosts = () => {
        $scope.postList = _.filter($scope.rawData, (post) => {
            return (post.is_draft === false || $scope.adminUser) && _.contains($scope.filters, post.category)
        })
    }

    $scope.filterActive = (type) => {
        return _.contains($scope.filters, type)
    }
}

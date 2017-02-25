module.exports = ($scope, $state, article, LoginManager) => {
    $scope.adminUser = false
    LoginManager.checkLogin().then(() => {
        if (LoginManager.adminUser()) {
            article.$promise.then((data) => {
                const blogObj = data.data
                $scope.blogImage = blogObj.image
                $scope.article = `<center> <h1 style="font-weight: bold; font-family: 'Comfortaa', cursive;">` + blogObj.title + `</h1> </center>\n\n` + blogObj.text
            })
        } else {
            $state.go("blog")
        }
    }).catch(() => {
        $state.go("blog")
    })
}

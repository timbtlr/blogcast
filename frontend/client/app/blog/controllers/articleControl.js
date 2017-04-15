module.exports = ($scope, $state, article) => {
    $scope.adminUser = false
    article.$promise.then((data) => {
        const blogObj = data.data
        $scope.blogImage = blogObj.image
        $scope.article = `<center> <h1 style="font-weight: bold; font-family: 'Comfortaa', cursive;">` + blogObj.title + `</h1> </center>\n\n` + blogObj.text
    })
}

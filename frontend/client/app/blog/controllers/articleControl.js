module.exports = ($scope, article) => {
    article.$promise.then((data) => {
        $scope.article = data.data
    })
}

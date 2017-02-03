module.exports = ($scope, article) => {
    article.$promise.then((data) => {
		const blogText = data.data
        $scope.article = `<center> <h1 style="font-weight: bold; font-family: 'Comfortaa', cursive;">` + blogText.title + `</h1> </center>\n\n` + blogText.text
    })
}

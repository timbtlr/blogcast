module.exports = ($scope, $sce, $timeout) => {
    $scope.API = null
    $scope.currentlyPlaying = null

    $scope.setMedia = (item, autoplay) => {
        $scope.$evalAsync(() => {
            $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}]
            $scope.currentlyPlaying = item

            if ($scope.API  !== null) {
                $scope.API.stop()
                if (autoplay) {
                    $timeout($scope.API.play.bind($scope.API), 100)
                }
            }
        })
    }

    $scope.onPlayerReady = (API) => {
        $scope.API = API
    }

    $scope.config = {
        type: "audio",
        sources: [],
        theme: {
            url: "styles/videogular-themes-default/videogular.css"
        },
        preload: "none",
        autoHide: false,
        autoHideTime: 3000,
        autoPlay: true
    }
}
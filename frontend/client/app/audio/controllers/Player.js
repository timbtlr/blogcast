module.exports = ($scope, $sce, $timeout) => {
    $scope.API = null
    $scope.currentlyPlaying = null

    $scope.setMedia = function(item, autoplay){
        $scope.$apply(() => {
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

    $scope.initializeMedia = (item) => {
        $scope.$apply(() => {
            $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}]
            $scope.currentlyPlaying = item
        })
    }

    $scope.onPlayerReady = (API) => {
        $scope.API = API
    }

    $scope.config = {
        type: "audio",
        sources: [],
        theme: {
            url: "bower_cache/videogular-themes-default/videogular.css"
        },
        preload: "none",
        autoHide: false,
        autoHideTime: 3000,
        autoPlay: false
    }
}
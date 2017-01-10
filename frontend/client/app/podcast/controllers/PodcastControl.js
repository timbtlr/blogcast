module.exports = ($scope, $sce, $timeout, AudioService, Episode) => {
    Episode.query().$promise.then((data) => {
        $scope.playlist = data.data
        if (AudioService.getCurrentlyPlaying() === null) {
            $scope.setMedia(data.data[0], false)
        } else {
            let playingItem = _.find($scope.playlist, (item) => {
                return item.id === AudioService.getCurrentlyPlaying().id
            })
            playingItem.playing = true
            $scope.currentlyPlaying = playingItem
        }
    })

    $scope.setMedia = (item, autoPlay) => {
        if (AudioService.getCurrentlyPlaying() !== null) {
            $scope.currentlyPlaying.playing = false
        }

        let loadedElement = angular.element($scope.playerElement).scope()
    
        if (loadedElement !== undefined) {
            loadedElement.setMedia(item, autoPlay)
            $scope.currentlyPlaying = item
            item.playing = true
            AudioService.setCurrentlyPlaying(item)
        }
    }

    angular.element(document).ready(() => {
        $scope.playerElement = document.getElementById("audioApp")
    })
}

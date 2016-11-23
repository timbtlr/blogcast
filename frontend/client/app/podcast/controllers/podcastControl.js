angular.module('blogcast')
    .controller('PodcastCtrl', ['$scope', "$sce", "$timeout", "AudioService", "Episode", function ($scope, $sce, $timeout, AudioService, Episode) {
        Episode.query().$promise.then(function(data) {
             $scope.playlist = data.data;
             if (AudioService.getCurrentlyPlaying() == null) {
                $scope.setMedia(data.data[0], false);
            } else {
                playingItem = _.find($scope.playlist, function(item){
                    return item.id == AudioService.getCurrentlyPlaying().id
                });
                playingItem.playing = true;
                $scope.currentlyPlaying = playingItem;
            };
        });

        $scope.setMedia = function(item, autoPlay) {
            if (AudioService.getCurrentlyPlaying() != null) {
                $scope.currentlyPlaying.playing = false;
            };
            angular.element($scope.playerElement).scope().setMedia(item, autoPlay);
            $scope.currentlyPlaying = item;
            item.playing = true;
            AudioService.setCurrentlyPlaying(item);
        };

        angular.element(document).ready(function() {
            $scope.playerElement = document.getElementById("audioApp");
        });
    }]);

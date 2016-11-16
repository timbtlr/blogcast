angular.module('blogcast')
    .controller('PodcastCtrl', ['$scope', "$sce", "$timeout", "AudioService", "Episode", function ($scope, $sce, $timeout, AudioService, Episode) {
        Episode.query().$promise.then(function(data) {
             $scope.playlist = data.data;
             console.log(data)
             $scope.setMedia(data.data[0], false);
        });

        $scope.setMedia = function(item, autoPlay) {
            if ($scope.currentlyPlaying != null) {
                $scope.currentlyPlaying.playing = false;
            };
            angular.element($scope.playerElement).scope().setMedia(item, autoPlay);
            $scope.currentlyPlaying = item;
            item.playing = true;
            AudioService.setCurrentlyPlaying(item);
        };

        var playingItem = undefined;
        if (AudioService.getCurrentlyPlaying() != null) {
            playingItem = _.find($scope.playlist, function(item){
                return item.id == AudioService.getCurrentlyPlaying().id
            });
        };

        angular.element(document).ready(function() {
            $scope.playerElement = document.getElementById("audioApp");
        });
    }]);

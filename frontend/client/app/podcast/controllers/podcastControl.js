angular.module('blogcast')

    .controller('PodcastCtrl', ['$scope', "$sce", "$timeout", function ($scope, $sce, $timeout) {
        $scope.playlist = [
            {
                source: "https://s3.amazonaws.com/noscorepodcastaudio/Dark+Souls+3+DLC+OST+-+Sister+Friede.mp3",
                title: "Sister Friede Main Theme",
                description: "Optional boss OST from Dark Souls III DLC.",
                image: "http://vignette4.wikia.nocookie.net/finalfantasy/images/1/11/FFXIII_Logo_Art.jpg/revision/latest?cb=20120806172920"
            },
            {
                source: "https://s3.amazonaws.com/noscorepodcastaudio/Final+Battle+-+Final+Fantasy+IX+Music+Extended.mp3",
                title: "Final Fantasy IX Final Boss Theme",
                description: "Final boss fight extended edition.",
                image: null
            },
            {
                source: "https://s3.amazonaws.com/noscorepodcastaudio/Final+Fantasy+VIII+Ultimecia+Final+Boss+Theme+(The+Extreme).mp3",
                title: "Final Fantasy XIII Final Boss Theme",
                description: "Final boss fight extended edition.",
                image: null
            }
        ];
        $scope.currentlyPlaying = $scope.playlist[0];
        $scope.currentlyPlaying.playing = true;


        angular.element(document).ready(function() {
            $scope.playerElement = document.getElementById("audioApp");
        });

        $scope.setMedia = function(item) {
            if ($scope.currentlyPlaying != null) {
                $scope.currentlyPlaying.playing = false;
            };
            angular.element($scope.playerElement).scope().setMedia(item, true);
            $scope.currentlyPlaying = item;
            item.playing = true;
        };
    }]);

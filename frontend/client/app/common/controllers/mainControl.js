angular.module('blogcast')

    .controller('MainCtrl', ['$scope', "$sce", "$timeout", function ($scope, $sce, $timeout) {
        $scope.playlist = [
            {
                    source: "https://s3.amazonaws.com/noscorepodcastaudio/Dark+Souls+3+DLC+OST+-+Sister+Friede.mp3",
                    title: "Sister Friede Main Theme",
                    description: "Optional boss OST from Dark Souls III DLC.",
                    image: null
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

        $scope.API = null;

        $scope.onPlayerReady = function(API) {
            $scope.API = API;
            $scope.currentVideo = 0;
            $scope.config.sources = [{src: $sce.trustAsResourceUrl($scope.playlist[$scope.currentVideo].source), type: "audio/mpeg"}];
        };

        $scope.onCompleteVideo = function() {
                $scope.isCompleted = true;
                $scope.currentVideo ++;

                if ($scope.currentVideo >= $scope.playlist.length) {
                    $scope.currentVideo = 0;
                };

                $scope.setMedia($scope.playlist[$scope.currentVideo]);
            };

        $scope.setMedia = function(item) {
            $scope.currentVideo = $scope.playlist.indexOf(item)
            console.log($scope.currentVideo)
            $scope.API.stop();
            $scope.config.sources = [{src: $sce.trustAsResourceUrl(item.source), type: "audio/mpeg"}];
            $timeout($scope.API.play.bind($scope.API), 100);
        };

        $scope.config = {
            sources: [],
            theme: {
                url: "bower_cache/videogular-themes-default/videogular.css"
            },
            preload: "none",
            autoHide: false,
            autoHideTime: 3000,
            autoPlay: false
        };
    }]);

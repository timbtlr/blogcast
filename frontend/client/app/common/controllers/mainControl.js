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

        angular.element(document).ready(function() {
            $scope.playerElement = document.getElementById("audioApp");
            angular.element($scope.playerElement).scope().initializeMedia($scope.playlist[0]);
        });

        $scope.setMedia = function(item) {
            angular.element($scope.playerElement).scope().setMedia(item, true);
        };
    }]);

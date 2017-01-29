module.exports = ($scope, $state, ENV, Episode, Upload, EpisodeUploadService, LoginManager, RedirectService) => {
    RedirectService.checkLoggedIn()

    $scope.uploading = false

    Episode.query().$promise.then((data) => {
        $scope.playlist = data.data
    })

    $scope.selectFile = function (file) {
        $scope.file = file
        $scope.s3FilePath = "https://s3.amazonaws.com/" + ENV.awsBucketName + "/" + file.name
        $scope.uploading = false
    }

    $scope.uploadFile = function () {
        if ($scope.file) {
            $scope.uploading = true
            EpisodeUploadService.Upload($scope.file).then(() => {
                // Mark as success
                $scope.file.Success = true

                Episode.create({
                    "title": $scope.episodeTitle,
                    "description": $scope.episodeDescription,
                    "source": $scope.s3FilePath,
                    "image": $scope.episodeThumbnailImage
                })
            }, (error) => {
                // Mark the error
                $scope.Error = error
            }, (progress) => {
                // Write the progress as a percentage
                $scope.file.Progress = (progress.loaded / progress.total) * 100
            })
        }
    }

    $scope.readyForUpload = function() {
        return $scope.file && $scope.episodeTitle !== undefined && $scope.episodeDescription !== undefined && $scope.episodeThumbnailImage !== undefined
    }

    $scope.deleteEpisode = (item) => {
        Episode.delete(
            {
                id: item.id
            }
        )
        setTimeout(function(){
            $state.go("upload", {}, {"reload": true})
        }, 1000)
    }

}
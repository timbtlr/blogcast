angular.module('blogcast')
    .controller('EpisodeUploadCtrl', ['$scope', 'ENV', 'Episode', 'Upload', 'EpisodeUploadService', function ($scope, ENV, Episode, Upload, EpisodeUploadService) {
        $scope.uploading = false;
        $scope.logged_in = false;

        $scope.login = function (password) {
            console.log(password)
            if (password == ENV.adminPassword) {
                $scope.logged_in = true;
            };
        };

        $scope.selectFile = function (file) {
            $scope.file = file;
            $scope.s3FilePath = "https://s3.amazonaws.com/" + ENV.awsBucketName + "/" + file.name;
            $scope.uploading = false;
        };

        $scope.uploadFile = function () {
            if ($scope.file) {
                $scope.uploading = true;
                EpisodeUploadService.Upload($scope.file).then(function (result) {
                    // Mark as success
                    $scope.file.Success = true;

                    Episode.create({
                        "title": $scope.episodeTitle,
                        "description": $scope.episodeDescription,
                        "source": $scope.s3FilePath,
                        "image": $scope.episodeThumbnailImage
                    })
                }, function (error) {
                    // Mark the error
                    $scope.Error = error;
                }, function (progress) {
                    // Write the progress as a percentage
                    $scope.file.Progress = (progress.loaded / progress.total) * 100
                });
            };
        };

        $scope.readyForUpload = function() {
            return $scope.file && $scope.episodeTitle != undefined && $scope.episodeDescription != undefined && $scope.episodeThumbnailImage != undefined;
        };
    }]);
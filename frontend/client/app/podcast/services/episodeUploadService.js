angular.module('blogcast')
    .service('EpisodeUploadService', ['$q', 'ENV', function ($q, ENV) {
        AWS.config.region = 'us-east-1';
        AWS.config.update({
            accessKeyId: ENV.awsAccessKey,
            secretAccessKey: ENV.awsSecretKey
        });

        var bucket = new AWS.S3({
            params: {
                Bucket: ENV.awsBucketName,
                maxRetries: 10
            },
            httpOptions: {
                timeout: 360000
            }
        });

        this.Progress = 0;
        this.Upload = function (file) {
            var deferred = $q.defer();
            var params = {
                Bucket: ENV.awsBucketName,
                Key: file.name,
                ContentType: file.type,
                Body: file
            };
            var options = {
                // Part Size of 10mb
                partSize: 10 * 1024 * 1024,
                queueSize: 1,
                // Give the owner of the bucket full control
                ACL: 'bucket-owner-full-control'
            };
            var uploader = bucket.upload(params, options, function (err, data) {
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve();
            });
            uploader.on('httpUploadProgress', function (event) {
                deferred.notify(event);
            });

            return deferred.promise;
        };
    }]);
module.export = ($q, ENV) => {
    AWS.config.region = "us-east-1"
    AWS.config.update({
        accessKeyId: ENV.awsAccessKey,
        secretAccessKey: ENV.awsSecretKey
    })

    let bucket = new AWS.S3({
        params: {
            Bucket: ENV.awsBucketName,
            maxRetries: 10
        },
        httpOptions: {
            timeout: 360000
        }
    })

    this.Progress = 0
    this.Upload = (file) => {
        let deferred = $q.defer()
        let params = {
            Bucket: ENV.awsBucketName,
            Key: file.name,
            ContentType: file.type,
            Body: file
        }
        let options = {
            // Part Size of 10mb
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
            // Give the owner of the bucket full control
            ACL: "bucket-owner-full-control"
        }
        let uploader = bucket.upload(params, options, (err) => {
            if (err) {
                deferred.reject(err)
            }
            deferred.resolve()
        })
        uploader.on("httpUploadProgress", (event) => {
            deferred.notify(event)
        })

        return deferred.promise
    }
}
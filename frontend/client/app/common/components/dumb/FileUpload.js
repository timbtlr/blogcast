module.exports = {
    selector: "fileUpload",
    template: `
        <div style="margin-top: 10px; margin-bottom: 10px;">
            <label for="author">{{ $ctrl.label }}</label>
            <br/>

            <button type="file" ngf-select="$ctrl.select($file)" ngf-multiple="false" class="btn btn-primary btn-xs" >
                {{ $ctrl.buttonLabel }}
            </button>

            <div class="row" ng-show="$ctrl.uploading">
                <div class="col-xs-10">
                    <div class="col-xs-10">
                        <div>
                            File:
                            <div>
                                {{$ctrl.file.name}} {{$ctrl.file.$error}} {{$ctrl.file.$errorParam}}
                            </div>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {{$ctrl.file.Progress}}%;">
                                    {{$ctrl.file.Progress | number:0}}%
                                </div>
                            </div>
                            <div class="alert alert-info" role="alert" ng-show="$ctrl.file.Progress == 100 && !$ctrl.file.Success">Processing, please wait...</div>
                            <div class="alert alert-success" role="alert" ng-show="$ctrl.file.Success">Upload Complete!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    bindings: {
        label: "<",
        buttonLabel: "<",
        onSelect: "&"
    },
    controller: function(EpisodeUploadService, ENV) {
        this.file = null
        this.uploading = false

        this.select = (file) => {
            this.file = file
            this.uploading = true

            if (this.file) {
                this.uploading = true
                EpisodeUploadService.Upload(this.file).then(
                    () => {
                        this.file.Success = true
                        this.uploading = false
                        this.onSelect({file: "https://s3.amazonaws.com/" + ENV.awsBucketName + "/" + this.file.name})
                    },
                    (error) => {
                        this.Error = error
                    },
                    (progress) => {
                        this.file.Progress = (progress.loaded / progress.total) * 100
                    })
            }
        }
    }
}




module.exports = {
    selector: "deleteModal",
    template: `
        <div id="deletePostModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 style="text-align: center;" class="modal-title">
                            Are you sure you want to delete the post:
                        </h4>
                        <h4 style="text-align: center; font-weight: bold;">
                            {{ $ctrl.title }}
                        </h4>

                    </div>

                    <div class="modal-body">
                        <div class="form-group">
                            <label for="author">Type 'DELETE' below to confirm deletion.</label>
                            <input type="text" class="form-control" id="author" ng-model="deleteConfirm">
                        </div>
                    </div>

                    <hr />

                    <div class="modal-footer">
                        <button type="button" ng-disabled="deleteConfirm != 'DELETE'" class="btn btn-md btn-danger" data-dismiss="modal" ng-click="$ctrl.click()">
                            Delete Post
                        </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>    
    `,
    bindings: {
        id: "<",
        title: "<",
        onClick: "&"
    },
    controller: function () {
        this.click = () => {
            this.onClick({id: this.id})
        }
    }
}




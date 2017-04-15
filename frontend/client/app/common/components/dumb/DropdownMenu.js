module.exports = {
    selector: "dropdownMenu",
    template: `
        <div class="dropdown" style="margin: 10px 0 10px 0">
            <div>
                <label>Choose an Article to Edit</label>
            </div>

            <button class="btn btn-xs btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> 
                {{ $ctrl.active.title }}
                <span class="caret"></span>
            </button>

            <ul class="dropdown-menu">
                <li ng-repeat="item in $ctrl.options" ng-click="$ctrl.click(item)">
                    <a href="#">
                        {{ item.title }}
                        <span ng-hide="!item.is_draft" style="color: red">
                            <em> | DRAFT</em>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    `,
    bindings: {
        options: "<",
        active: "<",
        onClick: "&"
    },
    controller: function() {
        this.click = (item) => {
            this.onClick({item})
        }
    }
}

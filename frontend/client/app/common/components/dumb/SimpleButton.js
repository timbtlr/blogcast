module.exports = {
    selector: "simpleButton",
    template: `
        <button type="button" ng-if="!$ctrl.hide" ng-disabled="$ctrl.disable" class="{{ $ctrl.getClass() }}" ng-click="$ctrl.click()">
            {{ $ctrl.label }}
        </button>
    `,
    bindings: {
        label: "<",
        btnClass: "<",
        disable: "<",
        hide: "<",
        onClick: "&"
    },
    controller: function() {
        this.getClass = () => {
            return `btn btn-xs ${this.btnClass}`
        }

        this.click = () => {
            if (this.onClick) {
                this.onClick()
            }
        }
    }
}

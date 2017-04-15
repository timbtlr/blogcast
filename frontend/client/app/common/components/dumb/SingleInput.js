module.exports = {
    selector: "singleInput",
    template: `
        <label>{{ $ctrl.label }}</label>
        <input type="text" class="form-control" ng-model="$ctrl.ngModel">
    `,
    bindings: {
        label: "<",
        ngModel: "="
    }
}

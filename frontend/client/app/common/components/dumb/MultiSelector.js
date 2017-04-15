module.exports = {
    selector: "multiSelector",
    template: `
        <div class="site-heading" style="width: 100%; text-align:center; margin: 10px">
            <div class="btn-group" style="padding-right: 10px">
                <button 
                    ng-repeat="option in $ctrl.options track by $index" 
                    type="button" 
                    class="btn btn-primary" 
                    ng-style="option.selected ? {'color': 'white', 'background-color': '#007aa7'} : {'background-color': 'white', 'color': 'black'}" 
                    ng-click="$ctrl.click(option.key)">
                    {{ option.key }}
                </button>
            </div>
        </div>
    `,
    bindings: {
        options: "<",
        selected: "<",
        onClick: "&"
    },
    controller: function() {
        this.click = (key) => {
            this.onClick({key})
        }
    }
}

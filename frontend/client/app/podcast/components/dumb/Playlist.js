module.exports = {
    selector: "playlist",
    template: `
        <div id="plwrap">
            <ul class="plList">
                <li ng-repeat="item in $ctrl.items track by $index" 
                    ng-style="item.selected ? {'background-color': '#eeeeee', 'color': '#007aa7'} : {'background-color': '#fafafa'}" 
                    style="border-bottom: solid 1px #F1F1F1" 
                    ng-click="$ctrl.select(item)">
                        <div class="plItem">
                            <div class="plNum">{{ $index + 1 }}.</div>
                            <div class="plTitle">{{ item.title }}</div>
                            <div class="plLength">{{ item.uploaded_time }}</div>
                        </div>
                </li>
            </ul>
        </div>
    `,
    bindings: {
        items: "<",
        onSelect: "&"
    },
    controller: function() {
        this.select = (item) => {
            if (this.onSelect) {
                this.onSelect({item})
            }
        }
    }
}

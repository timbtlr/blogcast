module.exports = {
    selector: "blogHeader",
    template: `
        <div style="display: block; width: 600px; margin: auto">
            <img class="blogItemImage" ng-src="{{$ctrl.image}}" style="height: 300px; width: 600px"/>
        </div>
    `,
    bindings: {
        image: "@"
    }
}

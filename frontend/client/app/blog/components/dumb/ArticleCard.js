module.exports = {
    selector: "articleCard",
    template: `
        <a ng-href="article/{{$ctrl.item.id}}">
            <li style="border-bottom: solid 1px #F1F1F1"  ng-style="{border: $ctrl.isAdmin && $ctrl.item.is_draft ? '4px orange solid' : 'none' }">
                <div class="row">
                    <div class="col-xs-12" style="margin-left: 0; margin-right: 0">
                        <div class="col-xs-6">
                        <img class="blogItemImage" ng-src="{{$ctrl.item.image}}" />
                    </div>
                    <div class="col-xs-6 blogItem">
                    <div class="blogTitle">{{ $ctrl.item.title }}</div>
                    <div class="blogDescription">{{$ctrl.item.description}}</div>
                    <div class="blogAuthor">Submitted By: {{ $ctrl.item.author }}</div>
                </div>
                </div>
            </li>
        </a>
    `,
    bindings: {
        item: "<",
        isAdmin: "<"
    }
}

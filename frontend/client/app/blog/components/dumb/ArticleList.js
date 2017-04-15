module.exports = {
    selector: "articleList",
    template: `
        <ul class="blogList" style="padding-top: 55px;">
            <article-card ng-repeat="article in $ctrl.items track by article.id" item="article" is-admin="$ctrl.isAdmin"></article-card>
        </ul>
    `,
    bindings: {
        items: "<",
        isAdmin: "<"
    }
}

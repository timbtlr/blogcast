import * as ArticleSelectors from "app/blog/selectors/ArticleSelectors"

module.exports = {
    selector: "article",
    template: `
        <blog-header image="{{ $ctrl.article.image }}"></blog-header>
        <div class="article" marked="$ctrl.formattedArticle"></div>
    `,
    controller: function($ngRedux, BlogListActions) {
        this.actions = BlogListActions
        this.mapState = (state) => {
            return {
                article: ArticleSelectors.getCurrentArticle(state),
                formattedArticle: ArticleSelectors.getCurrentFormattedArticle(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}




import * as ArticleSelectors from "app/blog/selectors/ArticleSelectors"
import * as BlogListSelectors from "app/blog/selectors/BlogListSelectors"
import * as UserSelectors from "app/login/selectors/UserSelectors"

module.exports = {
    selector: "blogList",
    template: `
      <div id="mainwrap">
        <page-header image="images/images/BlogTitle.png"></page-header>
        <div id="plwrap">
            <multi-selector options="$ctrl.selectorOptions" on-click="$ctrl.actions.toggleCategoryFilter(key)"></multi-selector>
            <article-list items="$ctrl.articleList" is-admin="$ctrl.isAdmin"></article-list>
        </div>
      </div>
    `,
    controller: function($ngRedux, BlogListActions) {
        this.actions = BlogListActions
        this.mapState = (state) => {
            return {
                articleList: ArticleSelectors.filteredArticleList(state),
                selectorOptions: BlogListSelectors.selectedCategoryMap(state),
                isAdmin: UserSelectors.isAdmin(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}




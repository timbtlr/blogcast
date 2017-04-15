import * as UserSelectors from "app/login/selectors/UserSelectors"
import * as WriteSelectors from "app/blog/selectors/WriteSelectors"
import lodash from "lodash"

module.exports = {
    selector: "editBlog",
    template: `
        <div ng-show="$ctrl.isLoggedIn">
            <form novalidate>
                <dropdown-menu options="$ctrl.articleList" active="$ctrl.activeArticle" on-click="$ctrl.setActiveArticle(item)"></dropdown-menu>
                <single-input label="'Title'" ng-model="$ctrl.title"></single-input>
                <single-input label="'Description'" ng-model="$ctrl.description"></single-input>
                <single-input label="'Author'" ng-model="$ctrl.author" ></single-input>
                <multi-selector options="$ctrl.categoryOptions" on-click="$ctrl.actions.setCategory(key)"></multi-selector>
                <file-upload label="'Upload Article Header Image'" button-label="'Open Image'" on-select="$ctrl.selectHeaderImage(file)"></file-upload>
                <blog-header ng-if="$ctrl.header" image="{{ $ctrl.header }}"></blog-header>
                <hr/>
                <wysiwyg-edit content="$ctrl.text" api="api"></wysiwyg-edit>
                <simple-button label="'Publish'" btn-class="'btn-success'" hide="!$ctrl.isAdmin" disable="!$ctrl.canSave()"></simple-button>
                <simple-button label="'Save Draft'" btn-class="'btn-warning'" hide="false" disable="!$ctrl.canSave()" on-click="$ctrl.saveDraft()"></simple-button>
                <simple-button label="'Delete'" btn-class="'btn-danger'" hide="!$ctrl.isAdmin" disable="!$ctrl.canSave()" data-toggle="modal" data-target="#deletePostModal"></simple-button>
            </form>

            <delete-modal title="$ctrl.title" id="$ctrl.activeArticle.id" on-click="$ctrl.actions.deletePost(id)"></delete-modal>
            <div ng-include="'templates/blog/templates/uploadImageModal.html'"></div>
        </div>
    `,
    controller: function($ngRedux, WriteBlogActions) {
        this.actions = WriteBlogActions

        this.title = ""
        this.description = ""
        this.author = ""
        this.header = null
        this.text = ""

        this.isEmpty = (obj) => {
            return lodash.isUndefined(obj) ||
                   lodash.isNull(obj) ||
                   lodash.isEmpty(obj)
        }

        this.canSave = () => {
            const inputs = [this.title, this.description, this.author, this.header, this.text]
            return inputs.every(obj => !this.isEmpty(obj))
        }

        this.selectHeaderImage = (file) => {
            this.header = file
        }

        this.setActiveArticle = (item) => {
            if (lodash.isNull(item)) {
                this.title = ""
                this.description = ""
                this.author = ""
                this.text = ""
                this.header = null
            } else {
                this.actions.setActiveArticle(item.id, item.title)
                this.title = item.title
                this.description = item.description
                this.author = item.author
                this.text = item.text
                this.header = item.image
            }
        }

        this.savePost = (isDraft=false) => {
            const state = $ngRedux.getState()
            const activeArticle = WriteSelectors.getActiveArticle(state)
            const category = WriteSelectors.category(state)
            if (!activeArticle.id) {
                this.actions.saveNewPost(this.title, this.description, this.author, this.text, category, this.header, isDraft)
            } else {
                this.actions.updateExistingPost(activeArticle.id, this.title, this.description, this.author, this.text, category, this.header, isDraft)
            }
        }

        this.saveDraft = () => {
            this.savePost(true)
        }

        this.mapState = (state) => {
            return {
                articleList: WriteSelectors.getArticleListToWrite(state),
                isLoggedIn: UserSelectors.isLoggedIn(state),
                isAdmin: UserSelectors.isAdmin(state),
                activeArticle: WriteSelectors.getActiveArticle(state),
                categoryOptions: WriteSelectors.selectedCategoryMap(state)
            }
        }
        let unsubscribe = $ngRedux.connect(this.mapState)(this)
        this.$onDestroy = function() {
            unsubscribe()
        }
    }
}




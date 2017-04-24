import Article from "./components/smart/Article"
import ArticleCard from "./components/dumb/ArticleCard"
import ArticleList from "./components/dumb/ArticleList"
import BlogHeader from "./components/dumb/BlogHeader"
import BlogList from "./components/smart/BlogList"
import DeleteModal from "./components/dumb/DeleteModal"
import EditBlog from "./components/smart/EditBlog"

module.exports = angular
    .module("blog", ["ui.router"])
    .service("ArticleResource", require("./services/ArticleResource"))
    .service("ArticleAPI", require("./services/ArticleAPI"))
    .service("ArticleActions", require("./actions/ArticleActions"))
    .service("BlogListActions", require("./actions/BlogListActions"))
    .service("WriteBlogActions", require("./actions/WriteBlogActions"))
    .component(Article.selector, Article)
    .component(ArticleList.selector, ArticleList)
    .component(ArticleCard.selector, ArticleCard)
    .component(BlogHeader.selector, BlogHeader)
    .component(BlogList.selector, BlogList)
    .component(DeleteModal.selector, DeleteModal)
    .component(EditBlog.selector, EditBlog)
    .config(require("./urls"))
    .name
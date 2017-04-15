module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider
        .state("blog", {
            url: "/blog",
            title: "Articles",
            templateUrl: "templates/blog/components/BlogArticles.html",
            resolve: {
                articles: ($stateParams, ArticleAPI) => {
                    const api = new ArticleAPI()
                    api.list()
                }
            }
        })
        .state("article", {
            url: "/article/:id",
            title: "Article",
            templateUrl: "templates/blog/components/BlogArticle.html",
            resolve: {
                article: ($stateParams, ArticleAPI) => {
                    let id = $stateParams.id
                    const api = new ArticleAPI()
                    api.get({id: id})
                }
            },
            controller: ($stateParams, ArticleActions) => {
                let id = $stateParams.id
                ArticleActions.setCurrentArticle(id)
            }
        })
        .state("write", {
            url: "/write",
            title: "Edit Articles",
            templateUrl: "templates/blog/components/BlogWrite.html",
            resolve: {
                verify: ($stateParams, $state, LoginAPI) => {
                    LoginAPI.checkLogin().catch(() => $state.go("blog"))
                },
                articles: ($stateParams, ArticleAPI) => {
                    const api = new ArticleAPI()
                    api.list()
                }
            }
        })

}
import * as BlogListSelectors from "app/blog/selectors/BlogListSelectors"
import * as UserSelectors from "app/login/selectors/UserSelectors"
import lodash from "lodash"

const articlesById = (state) => state.articles.byId

const currentArticleId = (state) => state.articles.current

export const getArticle = (state, id) => {
    return articlesById(state)[id]
}

export const articleList = (state) => {
    return Object.values(articlesById(state))
}

export const filteredArticleList = (state) => {
    const isAdmin = UserSelectors.isAdmin(state)
    const selectedCategories = BlogListSelectors.categories(state)
    return Object.values(articlesById(state)).filter(article => {
        return lodash.includes(selectedCategories, article.category) && (!article.is_draft || isAdmin)
    })
}

export const getCurrentArticle = (state) => {
    const currentId = currentArticleId(state)
    return articlesById(state)[currentId]
}

export const getCurrentFormattedArticle = (state) => {
    const currentId = currentArticleId(state)
    const article = getArticle(state, currentId)
    if (article) {
        return `<center> <h1 style="font-weight: bold; font-family: 'Comfortaa', cursive;">` + article.title + `</h1> </center>\n\n` + article.text
    }
    return null
}
import * as ArticleSelectors from "app/blog/selectors/ArticleSelectors"
import {CATEGORIES} from "app/blog/constants/categories"

const write = (state) => state.write

const newArticle = {
    title: "New Article",
    id: null,
    image: null
}

export const currentBlogId = (state) => write(state).current

export const category = (state) => write(state).category

export const getArticleListToWrite = (state) => {
    const articles = ArticleSelectors.filteredArticleList(state)
    return [
        newArticle,
        ...articles
    ]
}

export const getActiveArticle = (state) => {
    const currentId = currentBlogId(state)
    if (currentId) {
        return ArticleSelectors.getArticle(state, currentId)
    } else {
        return newArticle
    }
}


export const selectedCategoryMap = (state) => {
    return CATEGORIES.map((key) => {
        return {
            key,
            selected: category(state) === key
        }
    })
}
import {CATEGORIES} from "app/blog/constants/categories"
import lodash from "lodash"

export const categories = (state) => state.blogList.categories

export const selectedCategoryMap = (state) => {
    return CATEGORIES.map((key) => {
        return {
            key,
            selected: lodash.includes(categories(state), key)
        }
    })
}
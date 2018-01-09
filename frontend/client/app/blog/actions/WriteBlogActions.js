module.exports = ($ngRedux, constants, ArticleAPI) => {
    return {
        clearActiveArticle: () => {
            $ngRedux.dispatch({
                type: constants.BLOG_EDIT_SET_ACTIVE_ARTICLE,
                id: null
            })
        },
        setActiveArticle: (id, title) => {
            $ngRedux.dispatch({
                type: constants.BLOG_EDIT_SET_ACTIVE_ARTICLE,
                id: id
            })
            toastr.info(`Now Editing: ${title}`)
        },
        setCategory: (key) => {
            $ngRedux.dispatch({
                type: constants.BLOG_EDIT_SET_CATEGORY,
                key: key
            })
        },
        saveNewPost: (title, desc, author, text, category, image, isDraft) => {
            const api = new ArticleAPI()
            api.create({
                "title": title,
                "description": desc,
                "author": author,
                "text": text,
                "category": category,
                "is_draft": isDraft,
                "image": image
            })
        },
        updateExistingPost: (id, title, desc, author, text, category, image, isDraft) => {
            const api = new ArticleAPI()
            api.update(
                id,
                {
                    "id": id,
                    "title": title,
                    "description": desc,
                    "author": author,
                    "text": text,
                    "category": category,
                    "is_draft": isDraft,
                    "image": image
                }
            )
        },
        deletePost: (id) => {
            const api = new ArticleAPI()
            api.delete(id)
                .then(() => {
                    $ngRedux.dispatch({
                        type: constants.BLOG_EDIT_SET_ACTIVE_ARTICLE,
                        id: null
                    })
                    toastr.info(`Successfully deleted: ${id}`)
                })
            
        }
    }
}
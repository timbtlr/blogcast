module.exports = ($scope, $state, ENV, LoginManager, Post, BlogImage) => {
    $scope.view = "editor"
    $scope.editing = false
    $scope.currentEditItem = undefined
    $scope.showMessage = false

    $scope.loggedIn = false
    $scope.adminUser = false

    LoginManager.checkLogin().then(() => {
        $scope.loggedIn = true
        $scope.adminUser = LoginManager.adminUser()
    }).catch(() => {
        $state.go("login")
    })

    let setDefaultForm = () => {
        $scope.postTitle = ""
        $scope.postDescription = ""
        $scope.postAuthor = ""
        $scope.blogText = ""
    }

    let shouldLeave = () => {
        let leave = true
        if (($scope.currentEditItem !== undefined && $scope.blogText !== $scope.currentEditItem.text) || ($scope.currentEditItem === undefined && $scope.blogText !== "")) {
            leave = confirm("The current post is not saved. Are you sure you want to change posts?")
        }

        return leave
    }
    let showSubmitMessage = (success, message) => {
        $scope.error = !success
        $scope.submitMessage = message
        $scope.showMessage = true
    }

    $scope.changeView = (type) => {
        $scope.view = type
    }

    $scope.readyToSave = () => {
        return $scope.postAuthor !== undefined && $scope.postTitle !== undefined && $scope.postDescription !== undefined && $scope.blogText !== ""
    }

    $scope.writeNewPost = () => {
        if (shouldLeave()) {
            $scope.currentEditItem = undefined
            $scope.editing = false
            $scope.dropdownText = "Creating New Post"
            $scope.postCategory = "Technology"
            setDefaultForm()
        }
    }

    $scope.queryForPosts = () => {
        Post.query().$promise.then((data) => {
            $scope.postList = data.data
        })
    }

    $scope.queryForImages = () => {
        BlogImage.query().$promise.then((data) => {
            $scope.imageList = data.data
        })
    }

    $scope.editPost = (item) => {
        if (shouldLeave()) {
            $scope.postTitle = item.title
            $scope.postDescription = item.description
            $scope.postAuthor = item.author
            $scope.blogText = item.text
            $scope.currentEditItem = item
            $scope.postCategory = item.category
            $scope.editing = true
            $scope.dropdownText = "Editing:  '" + item.title + "'"
        }
    }

    $scope.submitDraft = () => {
        $scope.draft = true
        $scope.savePost()
    }

    $scope.submitPost = () => {
        $scope.draft = false
        $scope.savePost()
    }

    $scope.savePost = () => {
        if ($scope.editing) {
            Post.update(
                {
                    id: $scope.currentEditItem.id
                },
                {
                    "title": $scope.postTitle,
                    "description": $scope.postDescription,
                    "author": $scope.postAuthor,
                    "text": $scope.blogText,
                    "category": $scope.postCategory,
                    "is_draft": $scope.draft
                }
            )

        } else {
            Post.create({
                "title": $scope.postTitle,
                "description": $scope.postDescription,
                "author": $scope.postAuthor,
                "text": $scope.blogText,
                "category": $scope.postCategory,
                "is_draft": $scope.draft
            })

            $scope.editing = true
        }

        $scope.queryForPosts()
        showSubmitMessage(true, "Post submitted")
    }

    $scope.deletePost = () => {
        showSubmitMessage(true, "Post deleted")

        Post.delete(
            {
                id: $scope.currentEditItem.id
            }
        )
        setDefaultForm()
        $scope.currentEditItem = undefined
        $scope.editing = false
        $scope.queryForPosts()
        $scope.writeNewPost()
    }

    $scope.changeCategory = (type) => {
        $scope.postCategory = type
    }

    $scope.uploading = false
    $scope.queryForPosts()
    setDefaultForm()
    $scope.writeNewPost()
}
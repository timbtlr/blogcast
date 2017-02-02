module.exports = ($scope, $state, ENV, LoginManager, Post) => {
    $scope.view = "editor"
    $scope.editing = false
    $scope.currentEditItem = null
    $scope.loggedIn = LoginManager.checkLogin()
    $scope.showMessage = false

    if (!$scope.loggedIn) {
        $state.go("podcast")
    }

    let shouldLeave = () => {
        let leave = true
        if (($scope.currentEditItem !== null && $scope.blogText !== $scope.currentEditItem.text) || ($scope.currentEditItem === null && $scope.blogText !== undefined)) {
            leave = confirm("The current post is not saved. Are you sure you want to change posts?")
        }

        return leave
    }

    let setDefaultForm = () => {
        $scope.postTitle = null
        $scope.postDescription = null
        $scope.postAuthor = null
        $scope.blogText = null
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
            $scope.currentEditItem = null
            $scope.editing = false
            $scope.submitLabel = "Submit Post"
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

    $scope.editPost = (item) => {
        if (shouldLeave()) {
            $scope.postTitle = item.title
            $scope.postDescription = item.description
            $scope.postAuthor = item.author
            $scope.blogText = item.text
            $scope.currentEditItem = item
            $scope.postCategory = item.category
            $scope.editing = true
            $scope.dropdownText = "Editing " + item.title
            $scope.submitLabel = "Edit Post"
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
        $scope.currentEditItem = null
        $scope.editing = false
        $scope.submitLabel = "Submit Post"
    }

    $scope.changeCategory = (type) => {
        $scope.postCategory = type
    }

    $scope.queryForPosts()
    $scope.writeNewPost()
}
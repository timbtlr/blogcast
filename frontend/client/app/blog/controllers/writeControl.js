module.exports = ($scope, $state, ENV, LoginManager, Post, BlogImage, EpisodeUploadService) => {
    $scope.view = "editor"
    $scope.editing = false
    $scope.currentEditItem = undefined
    $scope.showMessage = false
    $scope.blogImage = undefined

    $scope.loggedIn = false
    $scope.adminUser = false
    $scope.user = undefined

    LoginManager.checkLogin().then(() => {
        $scope.loggedIn = LoginManager.loggedIn()
        $scope.adminUser = LoginManager.adminUser()
        $scope.user = LoginManager.user()
    }).catch(() => {
        $state.go("login")
    })

    $scope.userName = () => {
        if ($scope.user !== undefined) {
            return $scope.user.first_name + " " + $scope.user.last_name
        }
        return ""
    }

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
            $scope.blogImage = item.image
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
                    "is_draft": $scope.draft,
                    "image": $scope.blogImage
                }
            )

        } else {
            Post.create({
                "title": $scope.postTitle,
                "description": $scope.postDescription,
                "author": $scope.postAuthor,
                "text": $scope.blogText,
                "category": $scope.postCategory,
                "is_draft": $scope.draft,
                "image": $scope.blogImage
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
        $scope.blogImage = undefined
        $scope.editing = false
        $scope.queryForPosts()
        $scope.writeNewPost()
    }

    $scope.changeCategory = (type) => {
        $scope.postCategory = type
    }

    $scope.readyForUpload = function() {
        return $scope.file
    }

    $scope.selectFile = function (file) {
        $scope.file = file
        $scope.uploading = false
        $scope.uploadFile()
    }

    $scope.uploadFile = function () {
        if ($scope.file) {
            $scope.uploading = true
            EpisodeUploadService.Upload($scope.file).then(() => {
                // Mark as success
                $scope.file.Success = true
                $scope.uploading = false
                $scope.blogImage = "https://s3.amazonaws.com/" + ENV.awsBucketName + "/" + $scope.file.name
            }, (error) => {
                // Mark the error
                $scope.Error = error
            }, (progress) => {
                // Write the progress as a percentage
                $scope.file.Progress = (progress.loaded / progress.total) * 100
            })
        }
    }

    $scope.selectBodyFile = function (file) {
        $scope.file = file
        $scope.uploading = false
        $scope.uploadBodyFile()
    }

    $scope.uploadBodyFile = function () {
        if ($scope.file) {
            $scope.uploading = true
            EpisodeUploadService.Upload($scope.file).then(() => {
                // Mark as success
                $scope.file.Success = true
                $scope.uploading = false
                $scope.blogText += "<img src='https://s3.amazonaws.com/" + ENV.awsBucketName + "/" + $scope.file.name + "' style='width: 200px'/>"
            }, (error) => {
                // Mark the error
                $scope.Error = error
            }, (progress) => {
                // Write the progress as a percentage
                $scope.file.Progress = (progress.loaded / progress.total) * 100
            })
        }
    }

    $scope.uploading = false
    $scope.queryForPosts()
    setDefaultForm()
    $scope.writeNewPost()

    $scope.api = {
        scope: $scope,
        editorConfig: {
            sanitize: false,
            toolbar: [
                { name: "basicStyling", items: ["bold", "italic", "underline", "strikethrough", "subscript", "superscript", "-", "leftAlign", "centerAlign", "rightAlign", "blockJustify", "-"] },
                { name: "paragraph", items: ["orderedList", "unorderedList", "outdent", "indent", "-"] },
                { name: "doers", items: ["removeFormatting", "undo", "redo", "-"] },
                { name: "colors", items: ["fontColor", "backgroundColor", "-"] },
                { name: "links", items: ["hr", "symbols", "link", "unlink", "-"] },
                { name: "tools", items: ["print", "-"] },
                { name: "styling", items: ["font", "size", "format"] }
            ]
        }
    }
}
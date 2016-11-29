angular.module('blogcast')
    .controller('WriteBlogCtrl', ['$scope', '$state', 'ENV', 'LoginManager', 'Post', function ($scope, $state, ENV, LoginManager, Post) {
    	$scope.editing = false;
    	$scope.currentEditItem = null;
        $scope.logged_in = LoginManager.checkLogin();
        $scope.showMessage = false;
        $scope.submitLabel = "Submit Post";

        if (!$scope.logged_in) {
            $state.go("podcast")
        };

    	var shouldLeave = function() {
    		var leave = true
    		if (($scope.currentEditItem != null && $scope.blogText != $scope.currentEditItem.text) || ($scope.currentEditItem == null && $scope.blogText != undefined)) {
            	leave = confirm("The current post is not saved. Are you sure you want to change posts?");
    		};

    		return leave;
    	};

    	var setDefaultForm = function () {
    		$scope.postTitle = null;
            $scope.postDescription = null;
            $scope.postAuthor = null;
            $scope.blogText = null;
    	};

        var showSubmitMessage = function(success, message) {
        	$scope.error = !success;
        	$scope.submitMessage = message;
        	$scope.showMessage = true;
        };

        $scope.submitPost = function () {
        	if ($scope.editing) {
	            Post.update(
	            	{
	            		id: $scope.currentEditItem.id
	            	},
	            	{
		                "title": $scope.postTitle,
		                "description": $scope.postDescription,
		                "author": $scope.postAuthor,
		                "text": $scope.blogText
		            }
		        );

        	} else {
	            Post.create({
	                "title": $scope.postTitle,
	                "description": $scope.postDescription,
	                "author": $scope.postAuthor,
	                "text": $scope.blogText
	            });

            	setDefaultForm();
        	}
        	
        	setTimeout(function(){
			    $state.go("write", {}, {"reload": true})
			}, 1000);

            showSubmitMessage(true, "Post submitted");
    	};

        $scope.readyToSave = function() {
            return $scope.postAuthor != undefined && $scope.postTitle != undefined && $scope.postDescription != undefined && $scope.blogText != "";
        };

    	$scope.writeNewPost = function () {
            if (shouldLeave()) {
	            $scope.currentEditItem = null;
	            $scope.editing = false;
	            $scope.submitLabel = "Submit Post";
                setDefaultForm();
            };
    	};

        // For editing posts
        Post.query().$promise.then(function(data) {
            $scope.postList = data.data;
        });

    	$scope.editPost = function (item) {
            if (shouldLeave()) {
                $scope.postTitle = item.title;
	            $scope.postDescription = item.description;
	            $scope.postAuthor = item.author;
	            $scope.blogText = item.text;
	            $scope.currentEditItem = item;
	            $scope.editing = true;
	            $scope.submitLabel = "Edit Post";
            };
    	};

    	$scope.deletePost = function () {
            Post.delete(
	        	{
	        		id: $scope.currentEditItem.id
	        	}
	        );
            setDefaultForm()
            $scope.currentEditItem = null;
            $scope.editing = false;
            $scope.submitLabel = "Submit Post";
            setTimeout(function(){
			    $state.go("write", {}, {"reload": true})
			}, 1000);
    	};
    }]);
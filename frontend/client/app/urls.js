module.exports = ($stateProvider) => {
    'use strict'

    $stateProvider.state('podcast',
        {
            url: '/',
            templateUrl: 'templates/podcast/templates/podcast.html',
            controller: 'PodcastCtrl'
        }
    )

    $stateProvider.state('blog',
        {
            url: '/blog',
            templateUrl: 'app/blog/templates/blog.html',
            controller: 'BlogCtrl'
        }
    )

    $stateProvider.state('write',
        {
            url: '/write',
            templateUrl: 'app/write/templates/writeBlog.html',
            controller: 'WriteBlogCtrl'
        }
    )

    $stateProvider.state('login',
        {
            url: '/login',
            templateUrl: 'app/login/templates/login.html',
            controller: 'LoginCtrl'
        }
    )

    $stateProvider.state('upload',
        {
            url: '/upload',
            templateUrl: 'app/upload/templates/uploadEpisode.html',
            controller: 'EpisodeUploadCtrl'
        }
    )
}
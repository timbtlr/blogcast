angular.module('blogcast')
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('podcast',
            {
                url: '/',
                templateUrl: 'app/podcast/templates/podcast.html',
                controller: 'PodcastCtrl'
            }
        );

        $stateProvider.state('blog',
            {
                url: '/blog',
                templateUrl: 'app/blog/templates/blog.html'
            }
        );

        $stateProvider.state('admin',
            {
                url: '/admin',
                templateUrl: 'app/admin/templates/uploadEpisode.html',
                controller: 'EpisodeUploadCtrl'
            }
        );
    }]);
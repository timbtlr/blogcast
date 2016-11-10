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
                url: '/about',
                templateUrl: 'app/blog/templates/blog.html'
            }
        );
    }]);
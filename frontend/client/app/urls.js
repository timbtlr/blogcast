angular.module('blogcast')

    // URL Routing
    .config(['$stateProvider', function ($stateProvider) {
        'use strict';

        $stateProvider.state('main',
            {
                url: '/',
                templateUrl: 'app/common/templates/main.html',
                controller: 'MainCtrl'
            }
        );

        $stateProvider.state('about',
            {
                url: '/about',
                templateUrl: 'app/about/about.html'
            }
        );
    }]);
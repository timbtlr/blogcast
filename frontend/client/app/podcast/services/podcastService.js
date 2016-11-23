angular.module('PodcastService', ['ngResource'])
    .factory('Episode', function($resource, ENV) {
        return $resource(
            ENV.blogcastApiUrl.concat('episodes/:id'),
            {},
            {
                'query': {
                    method: 'GET',
                    isArray: false,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': ENV.blogcastApiKey
                    }
                }
            },
            {
                stripTrailingSlashes: false
            }
        );
    });
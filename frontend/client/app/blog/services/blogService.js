angular.module('BlogService', ['ngResource'])
    .factory('Post', function($resource, ENV) {
        return $resource(
            ENV.blogcastApiUrl.concat('blogs/:id'),
            {},
            {
                'query': {
                    method: 'GET',
                    isArray: false,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': ENV.blogcastApiKey
                    }
                },
                'create': {
                    method: 'POST',
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
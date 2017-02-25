module.exports = ($resource, ENV, localStorageService) => {
    return $resource(
        ENV.blogcastApiUrl.concat("episodes/:id/"),
        {},
        {
            "query": {
                method: "GET",
                isArray: false,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": ENV.blogcastApiKey
                }
            },
            "create": {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "JWT " + localStorageService.get(ENV.localStorageName)
                }
            },
            "delete": {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "JWT " + localStorageService.get(ENV.localStorageName)
                }
            }
        },
        {
            stripTrailingSlashes: false
        }
    )
}
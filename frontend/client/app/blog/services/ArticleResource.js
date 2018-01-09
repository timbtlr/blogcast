module.exports = ($resource, ENV, localStorageService) => {
    const getResource = () => {
        return $resource(
            ENV.blogcastApiUrl.concat("blogs/:id/"),
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
                "get": {
                    method: "GET",
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
                "update": {
                    method: "PUT",
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

    return getResource()
}
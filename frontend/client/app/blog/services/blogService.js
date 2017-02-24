module.exports = ($resource, ENV, localStorageService) => {
    let headerDict = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorageService.get(ENV.localStorageName)
    }

    return $resource(
        ENV.blogcastApiUrl.concat("blogs/:id/"),
        {},
        {
            "query": {
                method: "GET",
                isArray: false,
                headers: headerDict
            },
            "get": {
                method: "GET",
                headers: headerDict
            },
            "create": {
                method: "POST",
                headers: headerDict
            },
            "update": {
                method: "PUT",
                headers: headerDict
            },
            "delete": {
                method: "DELETE",
                headers: headerDict
            }
        },
        {
            stripTrailingSlashes: false
        }
    )
}
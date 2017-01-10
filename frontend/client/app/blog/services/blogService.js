module.exports = ($resource, ENV) => {
    let headerDict = {
        "Content-Type": "application/json",
        "Authorization": ENV.blogcastApiKey
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
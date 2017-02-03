module.exports = ($resource, ENV) => {
    let headerDict = {
        "Content-Type": "application/json",
        "Authorization": ENV.blogcastApiKey
    }

    return $resource(
        ENV.blogcastApiUrl.concat("blog-images/:id/"),
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
            }
        },
        {
            stripTrailingSlashes: false
        }
    )
}
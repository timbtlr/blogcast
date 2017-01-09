module.exports = ($resource, ENV) => {
    console.log(ENV)
    return $resource(
        ENV.blogcastApiUrl.concat("episodes/:id"),
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
                    "Authorization": ENV.blogcastApiKey
                }
            }
        },
        {
            stripTrailingSlashes: false
        }
    )
}
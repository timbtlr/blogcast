module.exports = ($resource, ENV, localStorageService) => {
    let headerDict = {
        "Content-Type": "application/json"
    }

    return $resource(
        ENV.blogcastApiUrl.concat("login/"),
        {},
        {
            "auth": {
                method: "POST",
                headers: headerDict
            }
        },
        {
            stripTrailingSlashes: false
        }
    )
}
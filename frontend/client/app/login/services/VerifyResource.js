module.exports = ($resource, ENV, localStorageService) => {
    let headerDict = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + localStorageService.get(ENV.localStorageName)
    }

    return $resource(
        ENV.blogcastApiUrl.concat("verify/"),
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
module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider
        .state("app.login", {
            url: "/login",
            title: "Admin Login",
            templateUrl: "templates/login/components/Login.html"
        })
}
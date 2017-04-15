module.exports = ($stateProvider) => {
    "use strict"

    $stateProvider
        .state("login", {
            url: "/login",
            title: "Admin Login",
            templateUrl: "templates/login/components/Login.html"
        })
}
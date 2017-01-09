module.exports = angular
    .module("login", [])
    .factory("LoginManager", require("./services/LoginManager"))
    .controller("LoginController", require("./controllers/LoginControl"))
    .name
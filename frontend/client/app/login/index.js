module.exports = angular
    .module("login", [])
    .factory("LoginManager", require("./services/LoginManager"))
    .controller("LoginCtrl", require("./controllers/LoginControl"))
    .service("Login", require("./services/Login"))
    .service("Verify", require("./services/Verify"))
    .name
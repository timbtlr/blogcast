module.exports = angular
    .module("login", [])
    .factory("LoginManager", require("./services/LoginManager"))
    .controller("LoginCtrl", require("./controllers/LoginControl"))
    .name
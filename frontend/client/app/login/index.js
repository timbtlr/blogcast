import LoginForm from "./components/dumb/LoginForm"
import MainLogin from "./components/smart/MainLogin"

module.exports = angular
    .module("login", ["ui.router"])
    .factory("LoginAPI", require("./services/LoginAPI"))
    .service("LoginResource", require("./services/LoginResource"))
    .service("VerifyResource", require("./services/VerifyResource"))

    .service("LoginActions", require("./actions/LoginActions"))
    .component(LoginForm.selector, LoginForm)
    .component(MainLogin.selector, MainLogin)
    .config(require("./urls"))
    .name
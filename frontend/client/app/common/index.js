module.exports = angular
    .module("common", [])
    .service("RedirectService", require("./redirect"))
    .constant("ENV", require("./envConfig"))
    .name
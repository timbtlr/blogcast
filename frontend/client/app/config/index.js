module.exports = angular
    .module("config", ["ngRedux"])
    .config(require("./redux").config)
    .run(require("./redux").run)
    .constant("constants", require("./constants"))
    .name
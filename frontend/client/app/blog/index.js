module.exports = angular
    .module("blog", [])
    .controller("BlogController", require("./controllers/blogControl"))
    .controller("WriteController", require("./controllers/writeControl"))
    .service("Post", require("./services/blogService"))
    .name
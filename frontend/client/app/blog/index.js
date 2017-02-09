module.exports = angular
    .module("blog", [])
    .controller("BlogController", require("./controllers/blogControl"))
    .controller("ArticleController", require("./controllers/articleControl"))
    .controller("WriteController", require("./controllers/writeControl"))
    .service("Post", require("./services/blogService"))
    .service("BlogImage", require("./services/blogImage"))
    .name
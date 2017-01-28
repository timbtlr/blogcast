"use strict"

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development"

let express = require("express")
let config = require("./config")

// Setup server
let app = express()
let http = require("http")

// Express configuration
require("./config/express")(app)
// Route configutation
require("./routes")(app)

// Start server
http.createServer(app).listen(config.port, function () {
  console.log("Express server listening on %d, in %s mode", config.port, app.get("env"))
})

// Expose app
exports = module.exports = app
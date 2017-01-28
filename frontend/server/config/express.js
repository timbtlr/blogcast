"use strict"

let express = require("express")
let morgan = require("morgan")
let compression = require("compression")
let errorHandler = require("errorhandler")
let path = require("path")
let config = require("./index")

module.exports = function(app) {
	app.use(compression())
	app.use(express.static(path.join(config.root, "public")))
	app.set("appPath", path.join(config.root, "public")) // define the path of our app inside express to use across the server if needed
	app.use(morgan("dev"))
	app.use(errorHandler()) // error handler
}
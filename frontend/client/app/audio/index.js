/*
    "audioPlayer" application.  Controls the audio player docked at the bottom of the page.
*/
let audioInstalledApps = [
    "ui.bootstrap",
    "ui.router",
    "ngSanitize",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls"
]

let audioPlayerApp = angular
	.module("audioPlayer", audioInstalledApps)
	.controller("audioCtrl", require("./controllers/Player"))
	.name

module.exports = {
	audioPlayerApp: audioPlayerApp
}
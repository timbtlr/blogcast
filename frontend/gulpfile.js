"use strict"

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require("browser-sync"),
    bowerFiles = require("gulp-bower-files"),
    gulpif = require("gulp-if"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    plumber = require("gulp-plumber"),
    preprocess = require("gulp-preprocess"),
    inject = require("gulp-inject"),
    spa = require("browser-sync-spa"),
    nodemon = require('gulp-nodemon'),
    watchify = require("watchify"),
    browserify = require("browserify"),
    gutil = require("gulp-util"),
    duration = require("gulp-duration"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    chalk = require("chalk"),
    eslint = require("gulp-eslint"),
    angularFilesort = require('gulp-angular-filesort'),
    del = require("del"),
    series = require('stream-series');

let config = {
    output: "/code/public/",
    debug: true
}

let globs = {
    source: "/code/client/app/navbar/**/*.js",
    template: "/code/client/app/**/*.html",
    style: "/code/client/app/**/*.css",
}

gulp.task("eslint", function() {
    return gulp.src(globs.source)
        .pipe(eslint({useEslintrc: true}))
        .pipe(eslint.format())
        .pipe(eslint.formatEach("compact", function(message){
            browserSync.notify(message)
        }))
})

gulp.task("bower", function() {
    bowerFiles({debugging: config.debug})
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/bower/"))
})


gulp.task("templates", function() {
    gulp.src(globs.template)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/templates/"))
        .pipe(browserSync.stream())
})


gulp.task("styles", function() {
    gulp.src(globs.style)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/"))
        .pipe(browserSync.stream())
})

gulp.task("sources", function() {
    gulp.src(globs.source)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/source/"))
        .pipe(browserSync.stream())
})


// Transforms index.html and injects any css/js or env vars.
gulp.task("index", function() {
    let target = gulp.src("/code/client/index.html")

    var vendorStream = gulp.src([
        config.output + "bower/angular/*.js",
    ]).pipe(angularFilesort());
 
    var appStream = gulp.src([
        config.output + "bower/**/*.js",
        config.output + "styles/**/*.css",
        config.output + "source/**/*.js",
        config.output + "*.js"
    ]);

    target
        .pipe(plumber())
        .pipe(preprocess({context: {DEBUG: config.debug}}))
        .pipe(inject(series(vendorStream, appStream), {"ignorePath": ["/public/"]}))
        .pipe(gulp.dest(config.output))
        .pipe(browserSync.stream())
})

// Serves the local development files + reloads on changes.
gulp.task("serve", function() {
    browserSync.use(spa({
        selector: "[ng-app]"
    }))

    browserSync.init({
        port: 3000,
        server: {
            baseDir: config.output
        },
        open: false,
    })
})

function compile(watch) {
    watchify.args.debug = config.debug
    watchify.args.extensions = [".js"]
    let bundler = browserify("/code/client/app/app.js", watchify.args)
    if (watch) {
        bundler
            .plugin(watchify, {
                poll: 200,
                ignoreWatch: ["**/node_modules/**", "**/bower_cache/**"]
            })

    }
    // Crazy hack to play nicely with Mac vs Linux file systems.
    // Ensures any require("./path") are case sensitive (they are NOT normally
    // on Macs).
    bundler.plugin(require("dep-case-verify"))
    bundler.transform("babelify", {presets: ["es2015"]})
    bundler.on("log", gutil.log)
    bundler.on("update", function() {
        bundle(bundler) // Re-run bundle on source updates
    })
    return bundle(bundler)
}

// Completes the final file outputs
function bundle(bundler) {
    const bundleTimer = duration("Browserify")

    return bundler
        .bundle()
        .on("error", errorLogger) // Map error reporting
        .pipe(source("app.js")) // Set source name
        .pipe(buffer()) // Convert to gulp pipeline
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output)) // Set the output folder
        .pipe(bundleTimer) // Output time timing of the file creation
        .pipe(browserSync.stream())
}

function errorLogger(err) {
    if (err.fileName) {
        // Regular error
        gutil.log(chalk.red(err.name)
            + ": " + chalk.yellow(err.fileName)
            + ": " + "Line " + chalk.magenta(err.lineNumber)
            + " & " + "Column " + chalk.magenta(err.columnNumber || err.column)
            + ": " + chalk.blue(err.description))
        browserSync.notify(err.name
            + ": " + err.fileName
            + ": " + "Line " + err.lineNumber
            + " & " + "Column " + err.columnNumber || err.column
            + ": " + err.description
        )
    } else {
        // Browserify error..
        gutil.log(chalk.red(err.name) + ": " + chalk.yellow(err.message))
        browserSync.notify(err.name + ": " + err.message)
    }
}

// Watch local development files, trigger tasks if they change.
gulp.task("watch", [], function() {
    gulp.watch(globs.template, ["templates"])
    gulp.watch(globs.style, ["styles"])
    gulp.watch(globs.source, ["eslint"])
    gulp.watch("bower.json", ["bower"])
    gulp.watch(["/code/client/index.html", "/code/public/*.js"], ["index"])
})

gulp.task("watch-browserify", function() {
    return compile(true)
})

// Main commands
gulp.task("build", ["bower", "sources", "templates", "styles", "index"])
gulp.task("default", ["build", "serve", "watch", "watch-browserify", "eslint"])
gulp.task("clean", function() {
    return del([config.output + "**/*"])
})
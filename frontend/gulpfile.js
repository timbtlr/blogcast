"use strict"

let gulp = require("gulp")
let browserSync = require("browser-sync")
let bowerFiles = require("gulp-bower-files")
let gulpif = require("gulp-if")
let sourcemaps = require("gulp-sourcemaps")
let plumber = require("gulp-plumber")
let preprocess = require("gulp-preprocess")
let inject = require("gulp-inject")
let spa = require("browser-sync-spa")
let watchify = require("watchify")
let browserify = require("browserify")
let gutil = require("gulp-util")
let duration = require("gulp-duration")
let source = require("vinyl-source-stream")
let buffer = require("vinyl-buffer")
let chalk = require("chalk")
let eslint = require("gulp-eslint")
let angularFilesort = require("gulp-angular-filesort")
let del = require("del")
let series = require("stream-series")
let ngConstant = require("gulp-ng-constant")
let rename = require("gulp-rename")

let config = {
    output: "/code/public/",
    debug: true
}

let globs = {
    env: "/code/client/app/common/envConfig.js",
    source: "/code/client/app/**/*.js",
    template: "/code/client/app/**/*.html",
    style: "/code/client/**/*.css",
    bowerStyle: "/code/client/bower_cache/**/*.css",
    ttf: "/code/client/bower_cache/**/*.ttf",
    woff: "/code/client/bower_cache/**/*.woff",
    image: "/code/client/**/*.png"
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

    gulp.src("/code/client/bower_cache/crypto-js/*.js")
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/bower/crypto-js"))
        .pipe(browserSync.stream())

})


gulp.task("templates", function() {
    gulp.src(globs.template)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/templates/"))
        .pipe(browserSync.stream())
})

gulp.task("images", function() {
    gulp.src(globs.image)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/images/"))
        .pipe(browserSync.stream())
})

gulp.task("styles", function() {
    gulp.src(globs.style)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/"))
        .pipe(browserSync.stream())

    gulp.src(globs.bowerStyle)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/"))
        .pipe(browserSync.stream())

    gulp.src(globs.ttf)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/"))
        .pipe(browserSync.stream())

    gulp.src(globs.woff)
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/"))
        .pipe(browserSync.stream())

    // Force images to be used for the WYSIWYG text editor.
    gulp.src("/code/client/bower_cache/ngWYSIWYG/dist/images/*")
        .pipe(gulpif(config.debug, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(config.debug, sourcemaps.write()))
        .pipe(gulp.dest(config.output + "/styles/bower_cache/ngWYSIWYG/dist/images/"))
        .pipe(browserSync.stream())
})

gulp.task("constants", function () {
    return ngConstant({
        name: "envConfig.js",
        constants: {
            ENV: {
                name: "prod",
                adminPassword: process.env.ADMIN_PASSWORD,
                blogcastApiUrl: process.env.BLOGCAST_URL,
                blogcastApiKey: process.env.BLOGCAST_KEY,
                awsAccessKey: process.env.AWS_ACCESS_KEY,
                awsSecretKey: process.env.AWS_SECRET_KEY,
                awsBucketName: process.env.AWS_BUCKET_NAME,
                loginPassphrase: process.env.LOGIN_PASSPHRASE
            }
        },
        stream: true,
        templatePath: "constants.tpl",
        wrap: ""
    })
    .pipe(rename("envConfig.js"))
    .pipe(gulp.dest("client/app/common/"))
})


gulp.task("index", function() {
    let target = gulp.src("/code/client/index.html")

    let vendorStream = gulp.src([
        config.output + "bower/angular/*.js",
        config.output + "bower/jquery/dist/*.js"

    ]).pipe(angularFilesort())

    let appStream = gulp.src([
        config.output + "bower/**/*.js",
        config.output + "styles/**/*.css",
        config.output + "styles/**/*.ttf",
        config.output + "styles/**/*.woff",
        config.output + "*.js"
    ])

    target
        .pipe(plumber())
        .pipe(preprocess({context: {DEBUG: config.debug}}))
        .pipe(inject(series(vendorStream, appStream), {"ignorePath": ["/public/"]}))
        .pipe(gulp.dest(config.output))
        .pipe(browserSync.stream())
})


gulp.task("serve", function() {
    browserSync.use(spa({
        selector: "[ng-app]"
    }))

    browserSync.init({
        port: 3000,
        server: {
            baseDir: config.output
        },
        open: false
    })
})

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

function compile(watch) {
    watchify.args.debug = config.debug
    watchify.args.extensions = [".js"]
    let bundler = browserify("/code/client/app/app.js")
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

gulp.task("browserify", function() {
    return compile(false)
})

// Main commands
gulp.task("build", ["bower", "templates", "styles", "images", "index"])
gulp.task("default", ["build", "serve", "watch", "watch-browserify", "eslint"])
gulp.task("clean", function() {
    return del([config.output + "**/*"])
})
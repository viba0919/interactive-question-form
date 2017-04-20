/*
 ******************************************************
 *  Variables
 ******************************************************
 */

var production = true,

    root = './',

    dirPublic         = root + 'public/',
    dirPublicCss      = dirPublic + 'css/',
    dirPublicJs       = dirPublic + 'js/',
    dirSourceViews    = dirPublic + 'views/',

    dirSource            = root + 'resources/',
    dirSourceCss         = dirSource + 'css/',
    dirSourceSass        = dirSource + 'sass/',
    dirSourceJs          = dirSource + 'js/',
    dirSourcePug         = dirSource + 'pug/',
    dirSourceVendor      = dirSource + 'vendor/',

    fileNames = {
        css: {
            main: 'app.css',
            sass: 'sass.css'
        },
        js: {
            main: 'app.js'
        }
    },

    config = {
        css: {
            concat: [
                dirSourceVendor + 'normalize-css/normalize.css',
                // ---> Add path to new plugin .css file here

                dirSourceCss + fileNames.css.sass
            ]
        },
        sass: {
            compile: [
                dirSourceSass + '*.scss'
            ],
            lint: [
                dirSourceSass + '**/*.scss'
            ],
            watch: [
                dirSourceSass + '**/*.scss'
            ]
        },
        pug: {
            compile: {
                files: dirSource + 'pug/*.pug',
                views: dirSource + 'pug/views/*.pug'
            },
            watch: [
                dirSourcePug + '**/*.pug'
            ]
        },
        js: {
            concat: [
                // Vendors
                dirSourceVendor + 'angular/angular.min.js',
                // ---> Add path to new plugin .js file here

                // Utilities
                dirSourceJs + '**/*.js'
            ],
            lint: [
                dirSourceJs + '**/*.js',
                '!node_modules/**'
            ],
            watch: [
                dirSourceJs + '**/*.js'
            ]
        }
    },

    onError = function(err) {
        notify.onError({
            title: "Gulp onError()",
            message: "Error: <%= error.message %>"
        })(err);

        this.emit('end');
    },

    options = {
        autoprefixer: {
            browsers: [
                'last 2 versions', '> 5%'
            ]
        },
        concatCss: {
            rebaseUrls: false
        },
        cssBeautify: {
            autosemicolon: true,
            indent: '    ',
            openbrace: 'end-of-line'
        },
        plumber: {
            errorHandler: onError
        },
        prettify: {
            'js': {
                'indent_size': 4,
                'end_with_newline': true
            }
        },
        pug: {
            pretty: true
        }
    };


/*
 ******************************************************
 *  Gulp packages
 ******************************************************
 */
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS    = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    concatCss    = require('gulp-concat-css'),
    cssBeautify  = require('gulp-cssbeautify'),
    eslint       = require('gulp-eslint'),
    gulpIf       = require('gulp-if'),
    prettify     = require('gulp-jsbeautifier'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sassLint     = require('gulp-sass-lint'),
    uglify       = require('gulp-uglify'),
    runSequence  = require('run-sequence'),
    pug          = require('gulp-pug');



/*
 ******************************************************
 *  Generates CSS file
 ******************************************************
 */
gulp.task('concat-css', function () {
    return gulp.src(config.css.concat)
        .pipe(concatCss(fileNames.css.main, options.concatCss))
        .pipe(gulpIf(production, minifyCSS(), cssBeautify(options.cssBeautify)))
        .pipe(gulp.dest(dirPublicCss));
});

gulp.task('compile-sass', function () {
    return gulp.src(config.sass.compile)
        .pipe(plumber(options.plumber))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(options.autoprefixer))
        .pipe(gulp.dest(dirSourceCss));
});

gulp.task('lint-sass', function () {
    return gulp.src(config.sass.lint)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});



/*
 ******************************************************
 *  Generates Javascript file
 ******************************************************
 */
gulp.task('concat-js', function() {
    return gulp.src(config.js.concat)
        .pipe(plumber(options.plumber))
        .pipe(concat(fileNames.js.main))
        .pipe(gulpIf(production, uglify(), prettify(options.prettify)))
        .pipe(gulp.dest(dirPublicJs));
});

gulp.task('lint-js', function () {
    return gulp.src(config.js.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});



/*
 ******************************************************
 *  Pug
 ******************************************************
 */
gulp.task('compile-pug-files', function() {
    gulp.src(config.pug.compile.files)
        .pipe(plumber(options.plumber))
        .pipe(pug(options.pug))
        .pipe(gulp.dest(dirPublic))
});

gulp.task('compile-pug-views', function() {
    gulp.src(config.pug.compile.views)
        .pipe(plumber(options.plumber))
        .pipe(pug(options.pug))
        .pipe(gulp.dest(dirSourceViews))
});

gulp.task('compile-pug', function() {
    return runSequence('compile-pug-files', 'compile-pug-views');
});



/*
 ******************************************************
 *  General
 ******************************************************
 */
gulp.task('lint', function() {
    return runSequence('lint-sass', 'lint-js');
});


gulp.task('build-dev', function() {
    return runSequence(
        ['compile-sass', 'concat-js', 'compile-pug'],
        'concat-css'
    );
});


gulp.task('default', function() {
    return runSequence('build-dev');
});



/*
 ******************************************************
 *  Watchers
 ******************************************************
 */
gulp.task('watch', ['build-dev'], function () {
    gulp.watch(config.sass.watch, function() {
        runSequence('compile-sass', 'concat-css');
    });

    gulp.watch(config.js.watch, function() {
        runSequence('concat-js');
    });

    gulp.watch(config.pug.watch, function() {
        runSequence('compile-pug');
    });
});

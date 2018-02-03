'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    gcmq = require('gulp-group-css-media-queries'),
    cssnano = require('gulp-cssnano'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    gulpif = require('gulp-if'),
    newer = require('gulp-newer'),
    browserSync = require('browser-sync'),
    del = require('del'),
    zip = require('gulp-zip'),
    minify = false;

var paths = {
    build: 'build',
    html: {
        base: 'src/templates',
        src: 'src/templates/*.pug',
        watch: 'src/templates/**/*.pug'
    },
    css: {
        base: 'src',
        src: 'src/css/main.styl',
        watch: 'src/css/**/*.styl'
    },
    js: {
        base: 'src',
        src: 'src/js/!(_)*.js',
        watch: 'src/js/**/*.js'
    },
    files: {
        base: 'src',
        src: ['src/img/**/*.*', 'src/storage/**/*.*', 'src/fonts/**/*.*']
    },
    forServer: {
        base: 'src/_for_server',
        src: ['src/_for_server/**/*.*', 'src/_for_server/**/.*']
    },
    sources: {
        base: './',
        src: ['src/**/*', 'bower.json', 'gulpfile.js', 'package.json'],
        pathZip: 'zip'
    }
};

function html() {
    return gulp.src(paths.html.src, {base: paths.html.base})
        .pipe(plumber())
        .pipe(pug({pretty: !minify}))
        .pipe(gulp.dest(paths.build));
}

function css() {
    return gulp.src(paths.css.src, {base: paths.css.base})
        .pipe(plumber())
        .pipe(stylus({use: [nib()]}))
        .pipe(gcmq())
        .pipe(gulpif(minify, cssnano({minifyFontValues: {removeQuotes: false}})))
        .pipe(gulp.dest(paths.build));
}

function js() {
    return gulp.src(paths.js.src, {base: paths.js.base})
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulpif(minify, uglify()))
        .pipe(gulp.dest(paths.build));
}

function files() {
    return gulp.src(paths.files.src, {base: paths.files.base})
        .pipe(newer(paths.build))
        .pipe(gulp.dest(paths.build));
}

function forServer() {
    return gulp.src(paths.forServer.src, {base: paths.forServer.base})
        .pipe(newer(paths.build))
        .pipe(gulp.dest(paths.build));
}

function watch() {
    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.css.watch, css);
    gulp.watch(paths.js.watch, js);
    gulp.watch(paths.files.src, files);
    gulp.watch(paths.forServer.src, forServer);
}

function webServer() {
    return browserSync.init([paths.build + '/**/*'], {
        server: {
            baseDir: paths.build
        }
    });
}

function minified(cb) {
    minify = false;
    return cb();
}

function clean() {
    return del([paths.build]);
}

function dateTimeFormat() {
    var date = new Date;
    date.setHours(date.getHours() + 3);
    return date.toISOString().slice(0, 19).replace(/:/g, "-").replace(/T/g, "_");
}

function createBackupSrc() {
    return gulp.src(paths.sources.src, {base: paths.sources.base})
        .pipe(zip('src-' + dateTimeFormat() + '.zip'))
        .pipe(gulp.dest(paths.sources.pathZip));
}

function createBackupBuild() {
    return gulp.src(paths.build + '/**/*')
        .pipe(zip('build-' + dateTimeFormat() + '.zip'))
        .pipe(gulp.dest(paths.sources.pathZip));
}

var buildStart = gulp.parallel(html, css, js, files, forServer);

gulp.task('default', gulp.series(buildStart, gulp.parallel(webServer, watch)));
gulp.task('production', gulp.series(minified, buildStart, createBackupBuild));
gulp.task('backup', createBackupSrc);
gulp.task('clean', clean);


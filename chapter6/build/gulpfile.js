var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');
var copy = require('gulp-contrib-copy');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevServer = require('webpack-dev-server');

var SRC = './**/*.js';
var DEST = 'build/';

gulp.task('babel', function () {
    return gulp.src(SRC).pipe(babel({
        compact: false
    })).pipe(gulp.dest(DEST));
});

gulp.task('webpack', ['clean', 'babel'], function(callback) {
  var myConfig = Object.create(webpackConfig);
  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    callback();
  });
});

gulp.task('clean', function () {
    return del.sync([DEST]);
});

gulp.task('watch', function () {
    var notify = function(event) {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };
    livereload.listen();
    gulp.watch(SRC, ['babel']).on('change', notify);
});


gulp.task('server', ['webpack'], function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    // Start a webpack-dev-server
    new webpackDevServer(webpack(myConfig), {
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            colors: true
        },
        hot: true
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

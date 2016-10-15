'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const open = require('open');
const clean = require('gulp-clean');
// const path = require('path');
const connect = require('gulp-connect');
const config = require('./cfg/config');

var complier = webpack(webpackConfig);

var devConfig = {
    contentBase: './src/',
    publicPath: '/',
    port: config.port,
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    inline: true,
    watch: true,
    stats: {
        cached: false,
        colors: true
    },
    https: !!config.https
};

// 开发环境, 启动webpack-dev-server
gulp.task('dev', () => {
    var server = new devServer(complier, devConfig);
    server.listen(config.port, config.host, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('------dev server start-------');
        // open('http://localhost:9000/webpack-dev-server/');
        var proxy = config.https ? 'https://' : 'http://';
        open(proxy + config.host + ':' + config.port);
    });
});

// 清除dist目录
gulp.task('clean', () => {
    gulp.src(config.dist).pipe(clean());
});

// 模拟发布
gulp.task('test', () => {
    connect.server({
        root: config.src,
        port: config.port,
        host: config.host,
        livereload: true
    });

    webpack(

        // webpack config
        webpackConfig,

        function (err, stats) {
            if (err) {
                throw new gutil.PluginError('webpack', err);
            }
        }
    );

    var proxy = config.https ? 'https://' : 'http://';
    open(proxy + config.host + ':' + config.port);
});

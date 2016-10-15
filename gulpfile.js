'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const open = require('open');

var complier = webpack(webpackConfig);

var devConfig = {
    contentBase: './src/',
    publicPath: '/',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    inline: true,
    watch: true,
    stats: {
        cached: false,
        colors: true
    },
    https: false

};

gulp.task('dev', () => {
    var server = new devServer(complier, devConfig);
    server.listen(9000, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('------dev server start-------');
        open('http://localhost:9000/webpack-dev-server/');
        // open('http://localhost:9000');
    });
});


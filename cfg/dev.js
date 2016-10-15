/**
 * @file dev.js
 * @author hefeng
 *
 * 开发环境的webpack配置
 */
'use strict';

const config = require('./config');
const Base = require('./base');
// const util = require('./util');
// const config = util.config;

var base = new Base(config);

var devConfig = Object.assign({}, base.webpackConfig, {
    devtool: 'eval-source-map'
});

// devConfig.entry.index = [devConfig.entry.index, "webpack-dev-server/client?http://localhost:9000", "webpack/hot/only-dev-server"];

module.exports = devConfig;

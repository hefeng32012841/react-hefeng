/**
 * @file dev.js
 * @author hefeng
 *
 * 开发环境的webpack配置
 */
'use strict';

var baseConfig = require('./base');

var devConfig = {
    devtool: 'eval-source-map'
};

Object.assign(baseConfig, devConfig);

// baseConfig.entry.index = [baseConfig.entry.index, "webpack-dev-server/client?http://localhost:9000", "webpack/hot/only-dev-server"];

module.exports = baseConfig;

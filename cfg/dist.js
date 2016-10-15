/**
 * @file dist.js
 * @author hefeng
 *
 * 生产环境的webpack配置
 */
'use strict';

const base = require('./base');
// const util = require('./util');
// const config = util.config;
base.config = false;
var distConfig = Object.assign({}, base.webpackConfig, {
    devtool: false
});

module.exports = distConfig;

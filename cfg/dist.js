/**
 * @file dist.js
 * @author hefeng
 *
 * 生产环境的webpack配置
 */
'use strict';

const config = require('./config');
const Base = require('./base');
// const util = require('./util');
// const config = util.config;

config.debug = false;

var base = new Base(config);

var distConfig = Object.assign({}, base.webpackConfig, {
    devtool: false
});

module.exports = distConfig;

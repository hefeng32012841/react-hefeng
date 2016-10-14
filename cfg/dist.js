/**
 * @file dist.js
 * @author hefeng
 *
 * 生产环境的webpack配置
 */
'use strict';

var baseConfig = require('./base');

var distConfig = {
    devtool: false
};

Object.assign(baseConfig, distConfig);

module.exports = baseConfig;

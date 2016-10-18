/**
 * @file dist.js
 * @author hefeng
 *
 * 生产环境的webpack配置
 */
'use strict';

// import config from './config';
// import Base from './base';
const config = require('./config');
const Base = require('./base');
// const util = require('./util');

config.debug = false;

const base = new Base(config);

const distConfig = Object.assign({}, base.webpackConfig, {
    devtool: false
});

module.exports = distConfig;

// export default distConfig;

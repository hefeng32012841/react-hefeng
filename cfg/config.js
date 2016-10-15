/**
 * @file config.js
 * @author hefeng
 *
 * dev和dist配置文件的配置文件
 */

'use strict';

var path = require('path');

var config = {
    debug: true,

    port: 9000,

    host: 'localhost',

    https: true,

    dist: path.join(__dirname, '/../dist'),
    src: path.join(__dirname, '/../src')
};

module.exports = config;

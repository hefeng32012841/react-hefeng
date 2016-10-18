/**
 * @file config.js
 * @author hefeng
 *
 * dev和dist配置文件的配置文件
 */

'use strict';

// import path from 'path';
const path = require('path');

const config = {
    debug: true,

    port: 9000,

    host: 'localhost',

    https: true,

    dist: path.join(__dirname, '/../dist'),
    src: path.join(__dirname, '/../src')
};

module.exports = config;

// export default config;

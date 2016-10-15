'use strict';

const args = require('minimist')(process.argv.slice(2));
const path = require('path');

var env = '';
if (args.env === 'dist') {
    env = 'dist';
}
else {
    env = 'dev';
}

let webpackConfig = require(path.join(__dirname, 'cfg/' + env));

console.log(webpackConfig);

module.exports = webpackConfig;

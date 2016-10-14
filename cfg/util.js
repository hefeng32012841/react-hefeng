/**
 * @file util.js
 * @author hefeng
 * 
 * 设置webpack.config文件的util文件
 */
'use strict';

const glob = require('glob');
const path = require('path');
const HtmlWebpackPlgin = require('html-webpack-plugin');

var util = {
    config: {
        dist: path.join(__dirname, '/../dist'),
        src: path.join(__dirname, '/../src')
    },

    /**
     * 用于获取webpack.config的入口文件
     *
     */
    getEntries: function () {
        var me = this;
        var pages = glob.sync(me.config.src + '**/*.js');
        var jsEntries = {};
        pages.forEach((filename) => {
            var fileNameChunks = filename.split('/');
            var len = fileNameChunks.length;
            var name = fileNameChunks[len - 1];
            name = name.substring(0, name.indexOf('.'));
            jsEntries[name] = filename;
        });

        return jsEntries;
    },

    /**
     * 生成html-wepack-plugin的插件对象集合，用于生成新的html
     *
     */
    getHtmlPlugin: function () {
        var me = this;
        var pages = glob.sync(me.config.src + '**/*.html');
        var htmlPlugins = [];
        pages.forEach((filename) => {
            var fileNameChunks = filename.split('/');
            var len = fileNameChunks.length;
            var name = fileNameChunks[len - 1];
            name = name.substring(0, name.indexOf('.'));
            var conf = {
                filename: name,
                template: filename,
                chunks: [name],
                inject: 'body'
            };
            htmlPlugins.push(new HtmlWebpackPlgin(conf));
        });

        return htmlPlugins;
    }
};

module.exports = util;

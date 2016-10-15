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
var webpack = require('webpack');

var config = {
    dist: path.join(__dirname, '/../dist'),
    src: path.join(__dirname, '/../src')
};

var util = {
    config: config,

    /**
     * 获取统一的文件名和加后缀的文件的对象
     *
     * @param {string} filename, 文件的路径
     * @return {Object}, name, 文件的去除后缀的名字, path 文件名加后缀
     */
    file: function(filename) {
        if (!filename) {
            return;
        }
        var fileNameChunks = filename.split('/');
        var len = fileNameChunks.length;
        var name = fileNameChunks[len - 1];
        name = name.substring(0, name.indexOf('.'));

        return {
            name: name,
            path: name + '.html'
        };
    },

    /**
     * 用于获取js的入口文件
     *
     * return {Object}, 所有的js文件的键值对，文件名:路径
     */
    getFiles: function () {
        var me = this;
        var pages = glob.sync(me.config.src + '**/*.js');
        var jsFiles = {};
        pages.forEach((filename) => {

            var page = me.file(filename);
            jsFiles[page.name] = filename;
        });

        return jsFiles;
    },

    /**
     * 生成html-wepack-plugin的插件对象集合，用于生成新的html
     *
     */
    getPager: function () {
        var me = this;
        var jsFiles = me.getFiles();
        var pages = glob.sync(me.config.src + '**/*.html');
        var htmlPlugins = [];
        var jsEntries = {};
        var allChunks = [];
        pages.forEach((filename) => {

            var page = me.file(filename);
            if (page.name in jsFiles) {
                let conf = {
                    filename: page.path,
                    template: filename,
                    chunks: ['common', page.name],
                    inject: 'body'
                };
                htmlPlugins.push(new HtmlWebpackPlgin(conf));
                jsEntries[page.name] = jsFiles[page.name];
                allChunks.push(page.name);
            }
        });

        return {
            htmlPlugins: htmlPlugins,
            jsEntries: jsEntries,
            allChunks: allChunks
        }
    },

    /**
     * 获取js的公共部分
     *
     * @param {Array} allChunks, 需要提取的js文件名，对应entry中的key值
     * @return {Array}, 提取实例，放入数组方便管理
     */
    getCommonChunks: function (allChunks) {
        if (!allChunks || !allChunks.length) {
            return;
        }

        var common = [
            new webpack.optimize.CommonsChunkPlugin({

                // 生成的公共部分的js文件名
                name: 'common',

                // 需要提取的js文件名的集合
                chunks: allChunks
            })
        ];

        return common;
    }
};

module.exports = util;

/**
 * @file util.js
 * @author hefeng
 * 
 * 设置webpack.config文件的util文件
 */
'use strict';

// import glob from 'glob';
// import HtmlWebpackPlgin from 'html-webpack-plugin';
// import webpack from 'webpack';
// import config from './config';
const glob = require('glob');
const HtmlWebpackPlgin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./config');

const util = {

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
        let fileNameChunks = filename.split('/');
        let len = fileNameChunks.length;
        let name = fileNameChunks[len - 1];
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
        const me = this;
        const pages = glob.sync(config.src + '**/*.js');
        const jsFiles = {};
        pages.forEach((filename) => {

            let page = me.file(filename);
            jsFiles[page.name] = filename;
        });

        return jsFiles;
    },

    /**
     * 生成html-wepack-plugin的插件对象集合，用于生成新的html
     *
     */
    getPager: function () {
        const me = this;
        const jsFiles = me.getFiles();
        const pages = glob.sync(config.src + '**/*.html');
        const htmlPlugins = [];
        const jsEntries = {};
        const allChunks = [];
        pages.forEach((filename) => {

            let page = me.file(filename);
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

        const common = [
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

// export default util;

/**
 * @file base.js
 * @author hefeng
 *
 * webpack.config的基础设置
 */
'use strict';

const webpack = require('webpack');
const ExtractCssPlugin = require('extract-text-webpack-plugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const HtmlWebpackPlugn = require('html-webpack-plugin');

const util = require('./util');
const pagers = util.getPager();

var webpackConfig = {
    entry: pagers.jsEntries,
    module: {
        preLoaders: [],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractCssPlugin.extract('style-loader', 'css-loader!autoprefixer-loader', {
                    publicPath: '../'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractCssPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader', {
                    publicPath: '../'
                })
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        root: ['/node_modules'],
        extensions: ['', '.js', '.jsx', '.html']
    },
    plugins: [

        // 生成css文件，非内联
        // new ExtractCssPlugin(base.debug ? '[name].min.css' : 'css/[name].min.css', {
        //     allChunks: true
        // }),

        // 打印构建打包时的出错信息
        new BellOnBundlerErrorPlugin(),

        // 提取所有打包后的js入口文件的公共部分,传入Object
        // new webpack.optimize.CommonsChunkPlugin(),

        // 代码热替换
        new webpack.HotModuleReplacementPlugin(),

        // 报错但不退出webpack进程
        new webpack.NoErrorsPlugin(),

        // 把一些提供到全局,比如jquery等，传入Object
        // new webpack.ProvidePlugin()

        // 在生产环境使用，代码压缩, 因为webpack -p可以压缩所以不用加载该插件
        // new webpack.optimize.UglifyJsPlugin()

        // 是查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
        new webpack.optimize.DedupePlugin(),

        // 是为组件和模块分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小。
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};

function Base(config) {
    webpackConfig = Object.assign({}, webpackConfig, {
        output: {
            path: config.dist,
            filename: config.debug ? '[name].min.js' : 'js/[name].min.js',
            publicPath: './',
            chunkFilename: config.debug ? 'chunk.js' : 'js/chunk.js'
        },
    });
    var commonChunks = util.getCommonChunks(pagers.allChunks);
    webpackConfig.plugins = webpackConfig.plugins.concat(pagers.htmlPlugins, commonChunks);
    webpackConfig.plugins.push(
        new ExtractCssPlugin(config.debug ? '[name].min.css' : 'css/[name].min.css', {
            allChunks: true
        })
    );

    webpackConfig.resolve.root.push(config.src);

    this.webpackConfig = webpackConfig;
}

module.exports = Base;

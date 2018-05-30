'use strict';

// https://hackernoon.com/webpack-3-quickstarter-configure-webpack-from-scratch-30a6c394038a

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const config = require('./config.js');

// const hotMiddlewareScript = require('webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true');

// hotMiddlewareScript.subscribe(event => {
//   if (event.action === 'reload') {
//     window.location.reload();
//   }
// });

const webpackConfig = {

    context: config.paths.src,
    devtool: (process.env.NODE_ENV === 'development' ? '#cheap-module-source-map' : undefined),
    stats: false,
    

    entry: {
        app: './app.js',
        vendors: './vendor.js',
        hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    },
    output: {
        pathinfo: true,
        publicPath: config.proxyUrl + config.publicPath,
        path: config.paths.dist,
        filename: './scripts/[name].bundle.js',
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                include: config.paths.assets,
                use: 'eslint-loader',
            },
            {
                test: /\.js$/,
                include: config.paths.assets,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['env'],
                    },
                },
            },
            {
                test: /\.scss$/,
                include: config.paths.assets,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                          loader: 'css-loader',
                          options: {
                            sourceMap: true,
                          },
                        },
                        {
                          loader: 'sass-loader',
                          options: {
                            sourceMap: true,
                            },
                        },
                      ],
                  fallback: 'style-loader',
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract([
                    'css-loader', 'style-loader', 
                ]),
            },
            { 
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: './media/',
                      publicPath: './media/',
                    },
                  },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            
        ],

    },

    plugins: [
        new CleanWebpackPlugin([config.paths.dist], {
          root: config.paths.root,
          verbose: false,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ExtractTextPlugin({
            filename: './styles/[name]-style.css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new BrowserSyncPlugin({
        //     host: 'localhost',
        //     open: true,
        //     proxyUrl: config.proxyUrl,
        //     watch: config.watch,
        //     delay: 500,
        // }),
    ],

};

module.exports = webpackConfig;
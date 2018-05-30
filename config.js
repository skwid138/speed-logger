'use strict';

const path = require('path');

const rootPath = process.cwd();
const srcPath = path.join(rootPath, "src");
const assetPath = path.join(rootPath, "src/assets");
const distPath = path.join(rootPath, "/dist/");

const apath = 'src/assets/';
const spath = 'src/';

const config = {
    paths: {
        root: rootPath,
        src: srcPath,
        assets: assetPath,
        dist: distPath,
    },
    proxyUrl: 'http://localhost:3000',
    publicPath: 'dist',
    watch: [
        apath + 'js/*.js',
        apath + 'media/*',
        apath + 'scss/*.scss',
        apath + 'views/*.html',
        spath + '*.js',
        spath+ '*.html',
    ],
}

console.log(config.watch);

module.exports = config;
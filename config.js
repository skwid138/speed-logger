'use strict';

const path = require('path');

const rootPath = process.cwd();

console.log(process.cwd());
console.log(path.resolve(__dirname, "src"));

const config = {
    paths: {
        root: rootPath,
        src: path.join(rootPath, "src"),
        assets: path.join(rootPath, "src/assets"),
        dist: path.join(rootPath, "dist"),
    },
}

module.exports = config;
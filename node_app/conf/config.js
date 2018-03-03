'use strict';

let path = require('path');

let pathConfig = {
    'viewPath': path.resolve(__dirname, '../views'),
    'modelPath': path.resolve(__dirname, '../models'),
    'controllerPath': path.resolve(__dirname, '../controllers'),
    'libPath': path.resolve(__dirname, '../lib'),
    'confPath': __dirname,
};

exports.path = pathConfig;
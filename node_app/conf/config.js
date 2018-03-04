'use strict';

const path = require('path');

const pathConfig = {
    'viewPath': path.resolve(__dirname, '../views'),
    'modelPath': path.resolve(__dirname, '../models'),
    'controllerPath': path.resolve(__dirname, '../controllers'),
    'libPath': path.resolve(__dirname, '../lib'),
    'confPath': __dirname,
};

const session = {
    'duration':'cookieName'
};


exports.session = session;
exports.path = pathConfig;
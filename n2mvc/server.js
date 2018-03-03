'use strict';

let http = require("http");
let querystring = require("querystring");

exports.runServer = function (port) {
    port = port || 8080;
    http.createServer( (req, res)=> {
        let _postData = '';
        req.on('data', function (chunk) {
            _postData += chunk;
        }).on('end', function () {
            req.post = querystring.parse(_postData);
            console.log(_postData);
        });
    }).listen(port);
    console.log('Server running at http://127.0.0.1:' + port + '/');
};


let route = require('./route');
var handlerRequest = function (req, res) {
    var actionInfo = route.getActionInfo(req.url, req.method);
};
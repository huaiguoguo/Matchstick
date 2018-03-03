'use strict';

let url = require("url"),
    fs = require('fs'),
    path = require('path'),
    conf = require('../conf/config'),
    BaseController = require(path.join(conf.path.libPath, 'BaseController'));

exports.hanlder = (req, res) => {
    let url_path = url.parse(req.url, true);
    let pathname = url_path.pathname;
    let path_arr = pathname.split("/");
    let newRoute = [];
    for (let index in path_arr) {
        if (path_arr[index] === undefined || path_arr[index] == null || path_arr[index] === '') {
            continue;
        }
        newRoute.push(path_arr[index]);
    }

    let controllerPath = conf.path.controllerPath;
    let controllerFile = path.join(controllerPath, newRoute[0]);
    let controller;
    if (fs.existsSync(controllerFile + '.js')) {
        controller = require(controllerFile);
    }
    if (typeof controller[newRoute[1]] === 'function') {
        let query = url_path.query;
        //此处如果 用户输入很多的 /asdf/asdfa/asdf/asdf/asdf/asdfa/fsad
        //先把前两个分离出来, 后台的作为参数, 分离为数组, 然后循环加入query
        if (newRoute[2]) {
            query[newRoute[2]] = newRoute[3];
        }
        controller[newRoute[1]].call(new BaseController(req, res), query);
    } else {
        res.writeHead(404, {"content-type": "text/html", "charset": "UTF-8"});
        res.write(newRoute[1] + "未定义");
        res.end();
    }
};


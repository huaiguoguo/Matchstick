'use strict';

let fs = require('fs'),
    path = require('path'),
    conf = require('../conf/config'),
    url = require('url'), m_cache;

function BaseController(request, response) {
    this.request = request;
    this.response = response;
}

//添加缓存
BaseController.prototype.addCache = function (key, value) {
    m_cache[key] = value;
};
//添加缓存
BaseController.prototype.getCache = function (key) {
    return m_cache[key];
};
//返回html
BaseController.prototype.html = function (viewName) {
    //coding
    console.log(viewName);
};
//根据模板生成的，可以使用其他模板来实现
BaseController.prototype.template = function (viewName, obj) {
    //coding
};

//返回json
BaseController.prototype.json = function (obj) {
    //coding
};

BaseController.prototype.render = function (viewFile, data={}) {

    let $this = this;
    let viewPath = conf.path.viewPath;
    // this.response.setHeader("Set-Cookie", ["sid=a121;path=/;domain=test.com;expires=86400" ]);
    fs.readFile(path.join(viewPath, viewFile), 'utf-8', function (err, file) {
        if (err) {
            console.log(err);
        }
        let parseFile = $this.parseHtml(file);
        $this.response.writeHead(200, {"Content-Type": "text/html"});
        $this.response.write(parseFile);
        $this.response.end();
    })
};


BaseController.prototype.parseHtml = function (file) {
    let model = require('../models/model');
    let data = model.fetch();
    //获取html 文件并将其中的 {{xx}} 和 data 数据进行匹配。
    let pattern = /({{)[a-z]+(}})/g;
    let ary = file.match(pattern);

    if (ary === null){
        return file;
    }

    for (let i = ary.length - 1; i >= 0; i--) {
        ary[i] = ary[i].replace('{{', '').replace('}}', '');
    }

    // 将 html 文件内的变量替换
    for (let j = ary.length - 1; j >= 0; j--) {
        // console.log(ary[j]);
        file = file.replace('{{' + ary[j] + '}}', data[ary[j]])
    }
    return file;
};


module.exports = BaseController;
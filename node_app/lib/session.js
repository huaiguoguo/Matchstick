'use strict';

module.paths.push('C:\\Users\\huochai\\AppData\\Roaming\\npm\\node_modules');

const crypto = require("crypto");
const util = require("util");
const path = require("path");
const fs = require("fs");
const conf = require("../conf/config");

// const sessions = require("client-sessions");

/**
 * 其实session的实现就是 在用户打开网页的一瞬间, 生成一个id, 写入用户浏览器cookie, cookie的key是后台环境自定义的
 * value值就是后台程序生成的那个唯一id,
 * 然后每次访问网站, 浏览器都会把这个id 带入request,
 * 然后服务端会把取cookie, 会以后台预定义的cookie_id读取带过来的那个value(也就是生成的那个唯一id),
 * php的cookie_id 在php.ini文件里面有一个叫 session.name = PHPSESSID  当你打开网站的时候 会发现cookie的key是 PHPSESSID
 * 用户和这个网站的一切相关会话 存入这个键下面
 * 类似于{id:{'user':{'name':'张三', 'sex':'1'}}
 *
 */

function session() {
    this.cacheFile = path.join(__dirname, "../cache/cache.txt");
}


session.prototype.set = function (key, value) {
    let $this = this;
    fs.open($this.cacheFile,"w+", '0777', function (err, fd) {
        if (err){
            console.log(err);
        }
        let data = {};
        data[key] = value;

        let data_str = JSON.stringify(data);
        fs.writeFile($this.cacheFile, data_str, {'encoding':'utf8', 'mode':'0777', 'flag':'w+'} ,function(err) {
            if (err) {
                console.error(err);
            }
            fs.readFile($this.cacheFile, function (err, data) {
                if (err) {
                    return console.error(err);
                }
                console.log("异步读取文件数据: " + data.toString());
            });
        });
    });
};

session.prototype.get = function (key) {
    return key;
};

session.prototype.delete = function () {

};

session.prototype.clearAll = function () {

};

module.exports = session;
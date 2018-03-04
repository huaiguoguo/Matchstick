'use strict';

let fs = require('fs'),
    path = require('path'),
    conf = require('../conf/config'),
    mongodb = require('mongodb'),
    url = require('url'), m_cache;

// mongoose 链接
let mongoose = require('mongoose');

function BaseController(request, response) {
    this.req = request;
    this.res = response;
    this.MongoClient = mongodb.MongoClient;
    this.db_url = "mongodb://localhost:27017/blog";

    let db       = mongoose.createConnection(this.db_url);

    // 链接错误
    db.on('error', function(error) {
        console.log(error);
    });

    // Schema 结构
    let mongooseSchema = new mongoose.Schema({
        username : {type : String, default : '匿名用户'},
        title    : {type : String},
        content  : {type : String},
        time     : {type : Date, default: Date.now},
        age      : {type : Number}
    });



    // 添加 mongoose 实例方法
    mongooseSchema.methods.findbyusername = function(username, callback) {
        return this.model('mongoose').find({username: username}, callback);
    };

// 添加 mongoose 静态方法，静态方法在Model层就能使用
    mongooseSchema.statics.findbytitle = function(title, callback) {
        return this.model('mongoose').find({title: title}, callback);
    };

// model
    let mongooseModel = db.model('mongoose', mongooseSchema);
// 增加记录 基于 entity 操作
    let doc = {username : 'emtity_demo_username', title : 'emtity_demo_title', content : 'emtity_demo_content'};
    let mongooseEntity = new mongooseModel(doc);
    mongooseEntity.save(function(error) {
        if(error) {
            console.log(error);
        } else {
            console.log('saved OK!');
        }
        // 关闭数据库链接
        db.close();
    });


    // this.createDataBase();
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
        $this.res.writeHead(200, {"Content-Type": "text/html"});
        $this.res.write(parseFile);
        $this.res.end();
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

BaseController.prototype.db = null;

BaseController.prototype.createDataBase = function () {
    let $this = this;
    $this.MongoClient.connect(this.db_url, {}, function(err, dataBase) {
        if (err){
            throw err;
        }
        // let db = dataBase.db("blog");
        console.log($this.db);
        console.log("++++++++++++++++++");
        $this.db = dataBase.db("blog");
        console.log($this);
        console.log("++++++++++++++++++");
        console.log("数据库已创建");
    });
    console.log($this.db);
};


module.exports = BaseController;

// let BaseController = require("./BaseController");




function BaseController(req, res) {
    this.req = req;
    this.res = res;
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



// function test(){
//     BaseController.call(this, "req","res");
//     // this.render("viewName");
// }
//
// test.html("haha");
// BaseController.call(new test());

// module.exports = test;

//
// function Anmial(eyesColor,foot){
//     this.eyesColor = eyesColor;
//     this.foot = foot;
// }
//
// Anmial.prototype.eat =  ()=>{
//     console.log("会吃");
// };
//
// function Dog(name,color){
//     this.name = name;
//     this.color = color;
// }
//
// Dog.apply(new Anmial('tt', 'a'));
//
// console.log(Dog.eyesColor);
// Dog.eat();
// console.log(Dog.name);

let Pet = require("./BaseController");
let test = require("./route");

test.test.call(new Pet("abc"));


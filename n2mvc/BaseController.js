// let myPrivate = '艳照，藏着';
// exports.myPublish = '冠西的相机';
// this.myPublish2 = 'this也可以哦';
// console.log('moduleExample.js loaded \n');

'use strict';

function BaseController(words){
    this.words = words;
    // this.speak = function(){
    //     console.log(this.words);
    // }
}

BaseController.prototype.speak = function () {
    // Pet.call(this,"wang");
    console.log("can speak");
    console.log(this.words)
};



module.exports = BaseController;
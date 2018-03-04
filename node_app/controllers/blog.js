'use strict';



exports.index = function (data) {

    let $this = this;
    // let insertData = {name:"自建博客", url:"www.masoner.cn"};
    console.log($this.db);
    console.log("=========================");
    // $this.db.collection("site").insertOne(insertData, function (err, res) {
    //     if (err){
    //         throw err;
    //     }
    //     console.log("文档插入成功");
    //     $this.db.close();
    // });
    this.render('blog/index.html');
};
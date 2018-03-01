let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");

http.createServer(function (req, res){
    //解析请求
    let pathname = url.parse(req.url).pathname
    if(pathname === '/index') {
        //只处理请求 index 这一种情况
        fs.readFile(path.join(__dirname, './index.html'), 'utf-8', function (err, file){
            if(err) console.log(err);
            //假数据
            let data = {
                "title": "MVC project",
                "author": "ltaoo",
                "content": "a project content"
            };
            //获取html 文件并将其中的 {{xx}} 和 data 数据进行匹配。
            let pattern = /({{)[a-z]+(}})/g;
            let ary = file.match(pattern);

            for (let i = ary.length - 1; i >= 0; i--) {
                ary[i] = ary[i].replace('{{', '');
                ary[i] = ary[i].replace('}}', '');
            }
            //console.log(ary)
            // 将 html 文件内的变量替换
            for (let j = ary.length - 1; j >= 0; j--) {
                console.log(ary[j]);
                file = file.replace('{{' + ary[j] + '}}', data[ary[j]])
            }

            // 渲染页面
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(file);
            res.end();
        })
    }
}).listen(3000);
        
console.log("server is listening at port 3000");
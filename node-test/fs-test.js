var fs = require('fs');
var path = require("path");

var dir = path.resolve(process.cwd());

function readFiles(dirName){
    var callee = arguments.callee;
    var result = [];
    var files = fs.readdirSync(dirName);
    for(var i=0;i<files.length;i++){
        var name = path.resolve(dirName,files[i]);
        if(fs.statSync(name).isDirectory()) {//文件夹
            var innerFiles =  callee(name);
            result = result.concat(innerFiles)
        }else{//文件
            result.push(name);
        }
    }
    return result;
}
 console.log(readFiles(process.cwd()));
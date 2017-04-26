var path = require('path');
var fs = require('fs');
const cwd = path.resolve(process.cwd(),"app");
function nameFilter(name,regx){
    var subString = name.substring(cwd.length+1,name.length);
    if(regx.test(name) && subString.indexOf(path.sep) === subString.lastIndexOf(path.sep)){
        return true;
    }else {
        return false;
    }
}
function readFiles(dirName,htmlRegx,jsRegx){

    var callee = arguments.callee;
    var result = {
        htmlFiles:[],
        jsFiles:[],
    }
    var files = fs.readdirSync(dirName);
    for(var i=0;i<files.length;i++){
        var name = path.resolve(dirName,files[i]);
        if(fs.statSync(name).isDirectory()) {//文件夹
            var innerFiles =  callee(name,htmlRegx,jsRegx);
            result.htmlFiles = result.htmlFiles.concat(innerFiles.htmlFiles);
            result.jsFiles = result.jsFiles.concat(innerFiles.jsFiles);
        }else{//文件
            if(nameFilter(name,htmlRegx)){
                result.htmlFiles.push(name);
            }else if(nameFilter(name,jsRegx)){
                result.jsFiles.push(name);
            }
        }
    }
    return result;
}

var Entrys = readFiles(cwd,/\.html$/,/\.js$/);

module.exports = Entrys;
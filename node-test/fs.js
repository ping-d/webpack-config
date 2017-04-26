const fs = require("fs");
fs.watch("./hello.js",{encoding:"utf-8"},(eventType,filename)=>{
    console.log(filename);
})
const path = require('path');
console.log(path.dirname("./hello.js"))
process.on('exit',(code)=>{
    console.log(code)
})

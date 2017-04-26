const EventEimtter = require("events");
class MyEmitter extends EventEimtter{}
const myEmitter = new MyEmitter();
myEmitter.on("aa",()=>{
    console.log("emit aa");
})
myEmitter.emit("aa");
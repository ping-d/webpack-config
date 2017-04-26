import './index.scss'
import Promise from 'promise-polyfill';
if (!window.Promise) {
    window.Promise = Promise;
}
import $ from 'jquery';
function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML ='hello world welcome';


    return element;
}

document.body.appendChild(component());
function loadMore(){
    require.ensure([],function(require){
        var SayHello = require("../component/say-hello/say-hello");
        new SayHello($("div").eq(0));

    },null,"aa");
   /* var SayHello = require("../component/say-hello/say-hello");
    new SayHello($("div").eq(0));*/

}

setTimeout(function(){
    loadMore();




},1000)
import SayHelloHtml from  './say-hello.html'
import './say-hello.css'
import $ from 'jquery'
class SayHello{
    constructor($parent){

        $parent.append($(SayHelloHtml));

    }
    bindEvents(){

    }

}
module.exports = SayHello
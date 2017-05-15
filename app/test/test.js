window.$ = $;
var a = require("../../layout/alifont/alifont")
var Table = require("../components/table/table.js");
var Util = require("../../common-component/util/util.js");
var navLeft = require('../../layout/nav-left/nav-left');
var Header = require('../../layout/header/header');
var Footer = require('../../layout/footer/footer');
require('./test.css');
$(function(){
    render();
    initHeader();
    initFooter();

    var canvas = document.getElementById('canvas');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        alert(123);
    } else {
        // canvas-unsupported code here
    }


})

function render(){
    var tHeader = [

        {title: '序号', INDEX: true, headerCss: 'width-60'}
        , {title: '板块', name: 'plate', handler: function(str){
            return "<button>hello</button>";
        }}
        , {title: '公司名称', name:  'companyName', handler: function(str){

            return str;
        }}


    ];

    Table($('.table'), 'supTable',{


        tHeader: tHeader,
        data: [{
            id:1,
            plate:"ahha",
            companyName:'fds'
        }]
    }, function(){
        $('#table1 .sup-yellow').parents('tr').addClass('color-fff5ae');
        $('#table1 .sup-red').parents('tr').addClass('color-ffcece');

    });



}

function initHeader(){
    Header("服务申请","Service application","goudan")
}
function initFooter(){
    console.log(0);
    new Footer();
}
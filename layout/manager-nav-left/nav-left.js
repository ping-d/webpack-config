require('./nav-left.css');
var html = require('./nav-left.html');
var util = require('../../common-component/util/util');
var MenuManager = require("./MenuManager");
var api = require("../../api/api");
var navList = [
    {id:1212121222,name:"流程申请列表",link:"/built/manager-request/manager-request.html",icon:"icon-tongji"},
    {id:222222222,name:"测试机配置",link:"/built/manager-config-machine/manager-config-machine.html",icon:"icon-shuju",

    }

]


function getMenu(cbk){

   util.renderTpl($("#navLeftWrapper"),html,{data:navList});
    cbk();
}





$(function(){
    getMenu(function(){
        bindMenuEvents();
    });
    var navLeft = $("#navLeftWrapper");
    var s = '<style>div#content{padding-left:'+navLeft.css("width")+'}div#content.left0{padding-left:0}</style>'
    $("head").append($(s));
})


/**
 * 菜单点击事件
 * */
function bindMenuEvents(){
    var parents = $(".nav-left ul li:not(.child)");
    new MenuManager(parents);

}

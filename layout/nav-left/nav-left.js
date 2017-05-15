require('./nav-left.css');
var html = require('./nav-left.html');
var util = require('../../common-component/util/util');
var MenuManager = require("./MenuManager");
var api = require("../../api/api");
var navList = [
    {id:1212121222,name:"个人工作台",link:"/built/personal-space/personal-space.html",icon:"icon-gongzuotai"},
    {id:222222222,name:"服务市场",link:"",icon:"icon-quanqiushichang",rightIcon:true,
        children:[ //为了方便显示和隐藏二级菜单，每个child需要加上父元素id。（）
            {
                name:"服务申请",link:"/built/add-service/add-service.html",parent:222222222,
            }
        ]
    },
    {id:333333333,name:"项目中心",link:"",icon:"icon-xiangmu",rightIcon:true,
        children:[
            {
                name:"项目管理",link:"/built/project-center/project-center.html",parent:333333333,
            }
        ]
    }

]


function getMenu(cbk){
    $.ajax({
        url:api.getAllView,
        data:{},
        dataType:"json",
        success:function(data){
            var index = navList.length;
            if(data.success){
                var result = data.result;
                var link = "#";
                for(var i=0;i< result.length;i++){

                    var children = result[i].menuItem || [];
                    for(var j=0;j<children.length;j++){
                        children[j].link = children[j].url;
                        children[j].parent = result[i].id
                    }

                    navList.push(
                        {id:result[i].id,name:result[i].name,icon:result[i].icon,rightIcon:!!children.length,
                            children:children
                        }
                    )

                    index ++;
                }

            }
            console.log(navList);
            util.renderTpl($("#navLeftWrapper"),html,{data:navList});
            cbk();
        },
        error:function(){
            util.renderTpl($("#navLeftWrapper"),html,{data:navList});
            cbk();
        }
    })
    //@TODO
   /* util.renderTpl($("#navLeftWrapper"),html,{data:navList});
    cbk();*/
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

require('./header.css');
var teml = require('./header.html');
var util = require('../../common-component/util/util');
var api = require("../../api/api");

module.exports = function(title,titleEn) {
    var userName = util.getCookie("userName");
    util.renderTpl($("#header"),teml,{data:{title:title,titleEn:titleEn,userName:userName}});
    var navLeft = $("#navLeftWrapper");
    var s = '<style>div#header{padding-left:'+navLeft.css("width")+'}div#header.close{padding-left:0}</style>'
    $("head").append($(s));


    $(".header .icon").on("click",function(e){
        if($(e.currentTarget).hasClass("close")){
            showMenu();
            $(e.currentTarget).removeClass("close");
        } else {
            hideMenu();
            $(e.currentTarget).addClass("close");
        }
    })

    function showMenu() {
        $("#navLeftWrapper").removeClass("close");
        $("#content").removeClass("left0");
        $("#header").removeClass("close")
    }

    function hideMenu() {
        $("#navLeftWrapper").addClass("close");
        $("#content").addClass("left0");
        $("#header").addClass("close")
    }
    //修改密码
    $("#J-changed-password").on("click", function () {
        $.ajax({
            url: api.logout,
            type: 'get',
            success: function (data) {
                window.location.href = "/built/login/login.html";
            },
            error: function () {
                window.location.href = "/built/login/login.html";
            },
            complete: function () {
                window.location.href = "/built/login/login.html";
            }
        })
    })
    //退出登录
    $("#J-logout").on("click", function () {

        $.ajax({
            url: api.logout,
            type: 'get',
            success: function (data) {

                if(data.success){
                    util.delCookie("userName",document.domain);
                    window.location.href = "/built/login/login.html";
                }else{
                    util.alertMessage(data.error);
                }

            },
            error: function () {
                util.alertMessage(data.error);
            }

        });
    })

};
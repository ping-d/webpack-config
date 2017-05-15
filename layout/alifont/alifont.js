/**
 * Created with JetBrains WebStorm.
 * User: liyong.wang
 * Date: 17/3/6
 * Time: 下午12:43
 * Desc: 处理共用的ali图标库文件  方便后期修改
 */
require("../../app/css/common/reset.css");
require("../../app/css/common/style.css");
var Util = require("../../common-component/util/util.js");


var aliCdnLink = '//at.alicdn.com/t/font_vvdp9n2f7uot7qfr.css';
$(document.head).prepend($('<link rel="stylesheet" type="text/css" href="'+aliCdnLink+'">'));

module.exports = function(){
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 17/3/8
     * Time: 上午9:57
     * Desc: 用户未登录统一拦截模块.
     */
    $.ajaxSetup({
        cache:false,
        beforeSend:function(req){
            var token  = Util.getCookie( 'token' ) ;
            if( token != "" ){
                if(arguments[1].url.split("?").length > 1){
                    arguments[1].url += "&token=" + token ;
                }else{
                    arguments[1].url += "?token=" + token ;
                }
            }
        },
        complete: function (xhr,status) {
            var status = xhr.status;
            if(status == 401 ){//用户未登录  则弹出登录弹窗
                Util.delCookie("token",document.domain);
                if(window.location.pathname.startsWith("/built/manager-")){
                    window.location.href = '/built/manager-login/manager-login.html'
                }else{
                    window.location.href= '/built/login/login.html'
                }

            }
        },
        error:function(XMLHttpRequest, textStatus, errorMsg){
            console.log(errorMsg);

        }
    })
}();
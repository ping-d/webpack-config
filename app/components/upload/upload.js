var Util = require("../../../common-component/util/util.js");

require("../../../Plugin/jquery-form/jquery.form.js");
require("./upload.css");

var UploadTpl = require("./upload.html");
var Dialog = require("../dialog/dialog.js");
var template = require('../../../common-component/util/template.js');

/**
 *
 * options = {
 * url: //请求链接
 *	 success:function(){}//点击上传，成功后的回调
 * }
 *
 * Created with JetBrains WebStorm.
 * Desc: 上传控件
 */
module.exports = function(options) {
    var baseOption = {
        name: 'file'
    };
    var options = $.extend(baseOption,options);
    var render = template.compile(UploadTpl),
        html   = render({name: options.name,scriptName:options.scriptName,projectId:options.projectId});
    var dialog = new Dialog({
        content: html,
        title:"文件上传",
        button: false
    });
    $('.repeat-file').bind('change', function(){
        var scriptName = $("#uploadName").val();
        if(!scriptName){
            var el =  $(".error-msg");
            el.text("请输入脚本名称！");
            el.show();
            return;
        }else{
            $(".error-msg").hide();
        }
        $('#uploadForm').ajaxSubmit({
            type: "post",
            url: options.url,
            success: function (data) {
                var successStr = {ok: true, result: data};
                if(successStr.ok){//如果上传成功
                    if(options.success){
                        if(Object.prototype.toString.call(data) == '[object String]'){
                            successStr.result = $('<div>').html(data).text();
                        }
                        options.success(successStr, dialog);
                    }
                }else{
                    Util.alertMessage(successStr.error);
                }
                dialog.remove();
                return false;
            }
        });
    });
}
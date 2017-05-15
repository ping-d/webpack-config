var Util = require("../../../common-component/util/util.js");

require("../../../layout/alifont/alifont.js");//共用图标库处理
require("./dialog.css");

var dialogTemp = require("./dialog.html");

/**
 *
 * options = {
 * 	 type:warning,error,info //弹窗类型 默认info
 * 	 title:提示标题，//默认 warning 警告  error 错误   info 提示
 * 	 width:400,//默认400
 * 	 height:300,//默认不设置，即根据内容高度来
 * 	 content:'xxx成功' | <div class="abc">'你好'</div>  //提示内容  可以是文字或者是html
 *	 button:['确认','取消'] //按钮  最多2个  可以是一个 默认  确认  取消  button为false时表示无按钮
 *	 initModal:function(modalObj){},//初始化时间段回调  可用于设置自定义样式,事件等等  modalObj可以find弹窗中元素
 *	 cancel:function(){}//点击取消后回调
 *	 confirm:function(){}//点击确定后回调
 * }
 *
 * Created with JetBrains WebStorm.
 * User: liyong.wang
 * Date: 17/3/8
 * Time: 上午11:13
 * Desc: 弹窗组件
 */
module.exports = function(options) {
	var baseOption = {
		type:options.type ? options.type : 'info',
		title:options.title,
		width:options.width || 300,
		height:options.height || false,
		content:options.content || '暂无提示信息！',
		button: options.button && options.button.length ? options.button : false || ['确认','取消'],
		initModal:function(modalObj){},
		cancel:function(){},
		confirm:function(){}
	}
	var options = $.extend(baseOption,options);

	var $dialog = $(dialogTemp).clone();
	var $btnGroup = $('<div class="button-group clearFix"></div>');
	if(options.type == 'warning'){
		options.title = options.title ? options.title : '警告'
		$dialog.find(".modal-title").append('<i class="iconfont icon-jinggao"></i>' + options.title);
	}else if(options.type == 'error'){
		options.title = options.title ? options.title : '错误'
		$dialog.find(".modal-title").append('<i class="iconfont icon-tanhaoup"></i>' + options.title);
	}else{
		options.title = options.title ? options.title : '提示'
		$dialog.find(".modal-title").append('<i class="iconfont icon-16pxtishi"></i>' + options.title);
	}

	$dialog.find(".modal-content").append(options.content);
	if(options.button){
		if(options.button.length == 1){
			$btnGroup.append('<div class="group-right clearFix"><button class="confirm" type="button">'+options.button[0]+'</button></div>');
		}else{
			$btnGroup.append('<div class="group-right clearFix"><button class="confirm" type="button">'+options.button[0]+'</button><button type="button" class="cancel">'+options.button[1]+'</button></div>');
		}
		$dialog.find(".modal-wrap").append($btnGroup);
	}
	$("body").append($dialog.addClass('init'));
	if($dialog.hasClass('init')){
		if(options.initModal){
			options.initModal($dialog);
		}
	}

	//计算居中位置
	$dialog.find(".modal-wrap").css({width:options.width});
	if(options.height){
		$dialog.find(".modal-wrap").css({height:options.height});
	}
	$dialog.find(".modal-wrap").css({marginLeft:-$dialog.find(".modal-wrap").outerWidth()/2,marginTop:-$dialog.find(".modal-wrap").outerHeight()/2});


	if(options.confirm){
		$dialog.find(".confirm").on("click",function(){
			options.confirm($dialog);
		});
	}
	if(options.cancel){
		$dialog.find(".cancel").on("click",function(){
			$dialog.fadeOut(function() {
				$(this).remove();
				options.cancel();
			});
		});
	}
	$dialog.find('.icon-dialog-close').on('click', function() {//点击关闭按钮 关闭当前弹窗
		$dialog.fadeOut(function() {
			$(this).remove();
			options.cancel();
		});
	});


	$dialog.fadeIn();
	return $dialog;
}
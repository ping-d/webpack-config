var $template = require('./template.js');
var Api = require('../../api/api.js');

Date.prototype.format = function(formatStr){
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}


module.exports = {
    renderTpl: function($el,tpl,data){
        $template.config("escape", false);
        var render = $template.compile(tpl);
        var html = render(data);

        $el.append(html);
    },
    dateFormat:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd hh:mm:ss') : "";
    },
    dateFormatWithChinese:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日 hh:mm:ss') : "";
    },
    dateFormatByMonth:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
    },
    dateFormatByMonthWithChinese:function(dateStr){
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日') : "";
    },
    dayFormat: function(dataStr, type){
        if(!dataStr){
            return '';
        }
        if(!type){
            type = '-';
        }
        var dateSs = new Date(dataStr);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        month> 9 ? null : (month = '0' + month);
        day > 9 ? null : (day = '0' + day);
        return year + type + month + type + day;
    },
    priceFormat:function(price){
        return price >= 0 && price!=="" ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    /**
     * 根据传入参数计算当前价格保留位数 四舍五入
     * @param price  价格
     * @param n 保留位数
     * @returns {number}
     */
    moneyPrice:function(price,n){
        var dd = 1; //计算倍数
        var tempNum;
        for(var i = 0;i < n; i++){
            dd *= 10;
        }
        tempNum = price * dd;
        tempNum = Math.round(tempNum);
        tempNum = (tempNum / dd).toFixed(n);
        return tempNum;
    },
    priceFormatRevers:function(price){
        var originPrice = Math.round(price * 100);
        return originPrice;
    },
    priceFormatByNull:function(price){
        return price > 0 ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    unique:function(arr) {
        var tmpArr = [], hash = {};//hash为hash表
        for(var i=0;i<arr.length;i++){
            if(!hash[arr[i].attrValue.id]){//如果hash表中没有当前项
                hash[arr[i].attrValue.id] = true;//存入hash表
                tmpArr.push(arr[i]);//存入临时数组
            }
        }
        return tmpArr;
    },
    alertMessage:function(desc, callback) {
        var time = 800;
        if(callback){
            if(!isNaN(callback)){
                time = callback;
            }
        }
        var html1 = $('<div class="hint-popup" style="padding:0 20px;z-index:1200;border-radius:5px;text-align: center;line-height: 40px;background-color:rgba(0,0,0,.7);position: fixed;top:30%;">'
            + '<span style="display:inline-block;min-width:160px;margin-top:-1px;font-size: 14px;color:#fff;vertical-align: middle;">' + desc + '</span></div>');
        $('body').append(html1);
        var width = $(html1).outerWidth();
        $(html1).css("left", ($(window).innerWidth() - width) / 2);
        setTimeout(function() {
            html1.fadeOut(time, function() {
                $(this).remove();
                if (callback) {
                    if(typeof callback === 'function'){
                        callback();
                    }

                }
            });
        }, 1000);
    },
    clone:function(obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    htmlDecode:function(str){
        return $('<div>').html(str).text();
    },
    htmlEncode:function(html){
        return $('<div>').text(html).html();
    },
    /**
     * 获取地址栏参数
     * @param name
     * @returns {null}
     */
    queryParam: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    /**
     * 将对象转化为url上面的param格式
     * @param data
     */
    formatParams: function(data){
        var ss='';
        var dot = '';
        debugger;
        $.map(data, function(value, key){
            if(value){
                ss += dot + key + '=' + value;
                dot = '&';
            }
        });
        return ss;
    },
    formatFormData: function(formData){
        var arr1 = formData.split('&');
        var data = {};
        for(var i = 0; i < arr1.length; i ++){
            var arrTmp = arr1[i].split('=');
            if(arrTmp[1] || arrTmp[1]===0){
                if(data[arrTmp[0]]){
                    data[arrTmp[0]] = ','+decodeURI(arrTmp[1]);
                }else{
                    data[arrTmp[0]] = decodeURI(arrTmp[1]);
                }
            }
        }
        return data;
    },
    /**
     * 获取cookie
     * @param name
     * @returns {null}
     */
    getCookie: function(objName){
        var arrStr = document.cookie.split("; ");
        var objVal = "";
        for( var i = 0,l = arrStr.length; i < l ; i++ ){
            var temArr = arrStr[i].split("=" );
            if( temArr[0] === objName ){
                objVal = unescape( temArr[1] )
            }
        }
        return objVal;
    },
    /**
     * 删除cookie
     * @param name
     */
    delCookie: function(objName, objDomain) {
        return document.cookie = objName + "=;path=/;domain=" + objDomain + ";expires=" + (new Date(0)).toGMTString();
    },
    getsec: function(str){
        alert(str);
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    },
    /**
     * 设置cookie
     * @param name
     * @param value
     * @param time
     */
    setCookie:function( objName, objValue, objDays, objDomain ){
        // use escape to avoid @#$%^%
        var str = objName + "=" + escape(objValue);
        str += ";path=/;domain=" + objDomain ;
        if( objDays > 0 ){
            var date = new Date();
            var ms = objDays * ( 3600 * 24 * 1000 );
            date.setTime( date.getTime() + ms );
            str += ";expires=" + date.toGMTString();
        }
        return document.cookie = str ;
    },
    /**截取裁剪图
     * @param $img
     * @param boxOptions
     * @param cutOptions
     * @returns {string}
     */
    cutImg: function($img,boxOptions,cutOptions){
        var $parent = $img.parent(),
            $newImg = $img.clone(),
            scale = boxOptions.width/cutOptions.w,
            $span = $("<span style='position:relative;display:inline-block;width:"+boxOptions.width+"px;height:"+boxOptions.height+"px;overflow:hidden;'>");

        $img.remove();
        $newImg.css({
            position: 'absolute',
            'max-width': cutOptions.imgWidth * scale,
            width: cutOptions.imgWidth * scale,
            height: cutOptions.imgHeight * scale,
            left: -cutOptions.x * scale,
            top: -cutOptions.y * scale,
            opacity: 1
        });
        $span.append($newImg);
        $parent.append($span);
    }


}
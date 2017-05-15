

module.exports = {
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 17/4/5
     * Time: 上午11:19
     * Desc: 验证表单函数  后期持续扩展
     */
    validateForm:function(inputObj){
        var expObj = $(inputObj).data("regexp");
        var valideRs = false;
        if(expObj){
            try{
                expObj = JSON.parse(expObj);
            }catch (e){
                expObj = eval("("+expObj+")");
            }
        }
        if(!expObj){
            return false;
        }
        var _thisExp = expObj.key;
        var _thisMsg = expObj.value;
        if(_thisExp.indexOf("^")!=-1 && _thisExp.indexOf("$")!=-1){//如果是正则验证
            valideRs = this.validateType.notNull(inputObj,expObj) && this.validateType.regExp(inputObj,expObj);
        }else{
            switch (_thisExp){
                case 'NOT NULL' : valideRs = this.validateType.regExp(inputObj,expObj); break;//正则
                case 'SELECTED' : valideRs = this.validateType.selected(inputObj,expObj);break;//下拉选择
                case 'CHECKED'  : valideRs = this.validateType.checked(inputObj,expObj);break;//复选
                default : return false; break;
            }
        }
        return valideRs;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 17/4/5
     * Time: 下午2:16
     * Desc: 验证类型  可以根据验证方式多样化添加
     */
    validateType:{
        //非空验证
        notNull:function(baseObj,expObj){
            var _thisExp = expObj.key;
            var _thisMsg = expObj.value;
            var msgSpan = $('<span class="error"></span>');
            var _thisParent = $(baseObj).parent("p");
            if($(baseObj).val() == ""){
                _thisParent.find(".error").remove();
                _thisParent.append(msgSpan.html(_thisMsg));
                return false;
            }
            return true;
        },
        //正则验证
        regExp:function(baseObj,expObj){
            var _thisExp = expObj.key;
            var _thisMsg = expObj.value;
            var regExp = new RegExp(_thisExp);
            var msgSpan = $('<span class="error"></span>');
            var _thisParent = $(baseObj).parent("p");
            if(!regExp.test($(baseObj).val())){
                _thisParent.find(".error").remove();
                _thisParent.append(msgSpan.html(_thisMsg));
                return false;
            }else{
                _thisParent.find(".error").remove();
            }
            return true;
        },
        selected:function(baseObj,expObj){
           var _thisExp = expObj.key;
           var _thisMsg = expObj.value;
           var msgSpan = $('<span class="error"></span>');
           var _thisParent = $(baseObj).parent("p");
           if($(baseObj).val() == "" || $(baseObj).val() == "-1"){
               _thisParent.find(".error").remove();
               _thisParent.append(msgSpan.html(_thisMsg));
               return false;
           }else{
               _thisParent.find(".error").remove();
           }
            return true;
        },
        checked:function(baseObj,expObj){//至少勾选一个，可以扩展类型
            var _thisExp = expObj.key;
            var _thisMsg = expObj.value;
            var msgSpan = $('<span class="error"></span>');
            var _thisParent = $(baseObj).parents("p");
            var checkList = _thisParent.find("input[type='checkbox']"),checkCount = 0;
            for(var i = 0; i< checkList.length; i++){
                if($(checkList[i]).is(":checked")){
                    checkCount++;
                }
            }
            if(checkCount == 0){//没被选择
                _thisParent.find(".error").remove();
                _thisParent.append(msgSpan.html(_thisMsg));
                return false;
            }else{
                _thisParent.find(".error").remove();
            }
            return true;
        }
    }


}
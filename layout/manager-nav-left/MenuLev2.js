/**
 * Created with JetBrains WebStorm.
 * User: Dong Ping
 * Date: 2017/4/28
 * Time: 11:03
 * Desc: 二级菜单类
 */


function MenuLev2($el,parent){
    var me = this;
    me.parent = parent;
    this.$el = $el;
    if(window.location.pathname == this.$el.parent().attr("href")){
        this.changeStatus(true);
        this.parent.hasChildActiveFlag = true;
    }
}
MenuLev2.prototype.changeStatus = function (isActive) {
    if(isActive){
        this.$el.addClass("active");
    }else {
        this.$el.removeClass("active");
    }
}

module.exports = MenuLev2;
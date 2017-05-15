/**
 * Created with JetBrains WebStorm.
 * User: Dong Ping
 * Date: 2017/4/28
 * Time: 11:02
 * Desc: 一级菜单类
 */

var MenuLev2 = require ('./MenuLev2') //子菜单

function MenuLev1($el,handleClick,manager){
    var me = this;
    this.manager = manager;
    this.childMenuArr = [];//子菜单数组
    this.$el = $el;
    this.handleClick = handleClick;
    this.$el.on("click",function(e){me.onClick()})
    var parentId = this.$el.attr("data-id");//一级菜单的id
    var children = $(".nav-left ul li.child[data-parent="+parentId+"]");//找到子菜单
    this.hasChildActiveFlag = false;//是否有子菜单被选中，如果有子菜单被选中，展开这个菜单的所有子菜单，用于页面初始化的时候显示菜单
    for(var i=0;i<children.length;i++){
        this.childMenuArr.push(new MenuLev2(children.eq(i),this));
    }
    if(this.hasChildActiveFlag){
        this.addActive();
        manager.currentActiveMenu = this;
    }
    if(window.location.pathname == this.$el.parent().attr("href")){
        this.addActive();

    }
}
MenuLev1.prototype._hideAllChild = function(){
    for(var i=0;i<this.childMenuArr.length;i++){
        this.childMenuArr[i].$el.hide();
    }
}
MenuLev1.prototype._showAllChild = function(){
    for(var i=0;i<this.childMenuArr.length;i++){
        this.childMenuArr[i].$el.show();
    }
}
MenuLev1.prototype.onClick = function(){
    this.handleClick(this);
}
MenuLev1.prototype.isActive = function(){
    if(this.$el.hasClass("active")){
        return true;
    }else{
        return false;
    }
}
MenuLev1.prototype.changeShowStatus = function(){
    if(this.$el.hasClass("show")){//子菜单展开状态
        this._hideAllChild();
        this.$el.removeClass("show");
    }else{//子菜单收起状态
        this._showAllChild();
        this.$el.addClass("show");
    }
}
MenuLev1.prototype.removeActive = function(){
    this.$el.removeClass("active");
    this.$el.removeClass("show");
    this._hideAllChild();
}
MenuLev1.prototype.addActive = function(){
    this.$el.addClass("active");
    this.$el.addClass("show");
    this._showAllChild();
}




module.exports = MenuLev1;
/**
 * Created with JetBrains WebStorm.
 * User: Dong Ping
 * Date: 2017/4/28
 * Time: 11:36
 * Desc: 管理所有菜单
 */
var  MenuLev1  = require('./MenuLev1');

function MenuManager(menuLev1Arr){
    this.menus = [];
    this.currentActiveMenu = null;
    for(var i=0,item;i<menuLev1Arr.length;i++){
        item=menuLev1Arr.eq(i);
        this.menus.push(new MenuLev1(item,this.handleMenuClick.bind(this),this));
    }
}
MenuManager.prototype.handleMenuClick = function(menu){
    if(!this.currentActiveMenu){
        this.currentActiveMenu = menu;
        menu.addActive();
    }else{
        if(this.currentActiveMenu === menu){
            menu.changeShowStatus();
        }else{
            this.currentActiveMenu.removeActive();
            menu.addActive();
            this.currentActiveMenu = menu;
        }
    }
}


module.exports = MenuManager
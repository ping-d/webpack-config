
require("./css/right_tips.css");

var Util = require("../../../common-component/util/util.js");

var API = require("../../../api/api.js");
var tpl1 = require("./tmpl/tmpl1.html");
var tpl2 = require("./tmpl/tmpl2.html");
var tpl3 = require("./tmpl/tmpl3.html");
module.exports = function($el, data){
    var encode = function(id, hid){
        return '/built/art-detail/art_detail.html?hId='+ hid +'&articleId=' + id;
    };
    var hotClick = function(index){
        try{
            $.ajax({
                url: API.queryPopularArticles,
                type: 'get',
                data: {orderType: index, pageSize: 9, pageNo: 1},
                success: function(data){
                    if(data.error){
                        Util.alertMessage(data.errorMessage);
                        return false;
                    }
                    if(data.ok && data.result){
                        $el.fadeOut('slow', function() {
                            $el.empty();
                            Util.renderTpl($el,tpl2, {encode: encode,
                                data: data.result, hotIndex: index});
                            for(var i = 0; i < $el.find('.right-tips-button').length; i ++){
                                $($el.find('.right-tips-button')[i]).bind('click', hotClick.bind(this, i + 1));
                            }
                            $el.fadeIn();
                        });
                    }
                }
            });
        }catch(e){
            console.log(e);
        }
    };
    var heroClick = function(index){
        try{
            $.ajax({
                url: API.getHomeHeroList,
                type: 'get',
                data: {pageSize: 9, pageNo: 1, type: index},
                success: function(data){
                    if(data.error){
                        Util.alertMessage(data.errorMessage);
                        return false;
                    }
                    if(data.ok && data.result){
                        $el.fadeOut('slow', function() {
                            $el.empty();
                            Util.renderTpl($el,tpl1, {encode: encode,
                                data: data.result,
                                heroIndex: index,
                                url: '/built/myPersonalPage/myPersonalPage.html?navUrl=myIndex&userId=',
                            floatNum: function(num){
                                return Util.floatNum(num);
                            }});
                            for(var i = 0; i < $el.find('.right-tips-button').length; i ++){
                                $($el.find('.right-tips-button')[i]).bind('click', heroClick.bind(this, i + 1));
                            }
                            $el.fadeIn();
                        });
                    }
                }
            });
        }catch(e){
            console.log(e);
        }
    };
    var interClick = function(){
        try{
            $.ajax({
                url: API.article,
                type: 'get',
                data: {pageSize: 9, pageNo: 1, artCatId: 102, state: 0, orderType: 'readNum'},
                success: function(data){
                    if(data.error){
                        Util.alertMessage(data.errorMessage);
                        return false;
                    }
                    if(data.ok && data.result && data.result.pageInfo && data.result.pageInfo.list){
                        var list = data.result.pageInfo.list;
                        $el.fadeOut('slow', function() {
                            $el.empty();
                            Util.renderTpl($el,tpl3, {encode: encode,
                                data: list});
                            for(var i = 0; i < $el.find('.right-tips-button').length; i ++){
                                $($el.find('.right-tips-button')[i]).bind('click', hotClick.bind(this, i + 1));
                            }
                            $el.fadeIn();
                        });
                    }
                }
            });
        }catch(e){
            console.log(e);
        }
    };
    switch(data.type){
        case 1:
            heroClick(1);
            break;
        case 2:
            console.log(1)
            hotClick(1);
            break;
        case 3:
            interClick();
            break;
        default:
            break;
    }
};
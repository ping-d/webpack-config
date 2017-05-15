require("./table.css");

var Util = require("../../../common-component/util/util.js");

var TableTpl = require("./table.html");


module.exports = function($el, id,  data, cbk){
    data.tableId = id;
    data.formatObj = function(func, tb, index){
        var dataTmp = func;
        dataTmp.tableIndex = index;
        dataTmp.obj = tb;
        return JSON.stringify(dataTmp);
    };
    $el.empty();
    Util.renderTpl($el, TableTpl, data);
    $('#' + id + ' tbody tr:odd').addClass('ts-table-odd');
    $el.addClass('ts-table-ctt-parent');
    if(cbk){
        cbk();
    }
    $('.ts-table-ops ul').hover(function(e){
        var $target = $(e.target);
        if(!$target.is('ul')){
            $target = $target.parents('ul');
        }
        var offset = $target.offset();
        var top = offset.top - $('body').scrollTop();
        var css1 = '<div id="ood1"><style>.ts-css1{position: fixed !important;top: '
            + top + 'px !important; left: ' + offset.left + 'px !important;}</style></div>';
        $target.append(css1).addClass('ts-css1');
    }, function(e){
        var $target = $(e.target);
        if(!$target.is('ul')){
            $target = $target.parents('ul');
        }
        $target.removeClass('ts-css1');
        $('#ood1').remove();
        //$target.css({position: 'fixed', top: offset.top + 'px', left: offset.left + 'px'});
    });
    $('#'+id+' .ts-table-operate').bind('click', function(e){
        var $target = $(e.target);
        if(!$target.is('.ts-table-operate')){
            $target = $target.parents('.ts-table-operate');
        }
        data.opFunction($target.data('objs'));
    });
    $('#'+id+' .ts-table-htt').bind('click', function(e){
        var $target = $(e.target);
        if(!$target.is('.ts-table-htt')){
            $target = $target.parents('.ts-table-htt');
        }
        data.opFunction($target.data('objs'));
    });
};
/**
 * Created by dongping on 2017/4/28.
 */
require('./footer.css');
var tmpl = require('./footer.html');
var util = require('../../common-component/util/util');
module.exports = function(){
    util.renderTpl($("#footer"),tmpl);
}
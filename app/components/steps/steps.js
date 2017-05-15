var util = require("../../../common-component/util/util")
var stepsHtml = require("./steps.html");
require('./steps.css');

var Steps = function(selecter,index){
    util.renderTpl(selecter,stepsHtml,{data:index});
}
module.exports = Steps;
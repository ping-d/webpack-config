
var Gan = new Array("庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己");
var Zhi = new Array("申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未");

getGanZhi = function(year){
    if(!year || isNaN(parseInt(year))){
        return '';
    }
    return Gan[year%10] + Zhi[year%12] + '年';
};

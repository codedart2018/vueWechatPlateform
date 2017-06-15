/**
 * Created by truncate on 2017/6/15.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 * 日期过滤插件
 */

class FormatDate {

}

FormatDate.install = function (Vue, options) {
    
    Vue.prototype.$formatDate = function(value, format){
        if(!value) return
        //防止PHP后台输出为10位的时间戳
        if(value.length == 10) {
            value = value * 1000
        }
        var format = format ? format : "yyyy-MM-dd h:m:s";
        var time = new Date(parseInt(value));
        var date = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            "q+": Math.floor((time.getMonth() + 3) / 3),
            "S+": time.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format
    }
}

export default FormatDate

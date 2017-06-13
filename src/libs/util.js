let Util = {
    logSwitch: true
};
//修改标题
Util.title = function (title) {
    title = title ? title : '首页';
    window.document.title = title;
};

//打印日志
Util.log = function (title) {
    if (!Util.logSwitch) return;
    console.log("------------------logStart------------------")
    console.log(title)
    console.log("------------------logEnd------------------")
}

export default Util;

let Util = {

};
Util.title = function (title) {
    title = title ? title : '首页';
    window.document.title = title;
};

export default Util;

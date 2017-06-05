<style src="../../assets/style/wechat/menu.less" lang="less" scoped></style>
<template>
    <div>
        <div class="menu_setting_box js_menuBox dn" style="display: flex;">
            <!--手机模块-->
            <div class="menu_setting_area">
                <div class="menu_preview_area">
                    <div class="mobile_menu_preview">
                        <div class="mobile_hd tc">
                            {{ publicName }}
                        </div>
                        <div class="mobile_bd">
                            <ul class="pre_menu_list grid_line ui-sortable ui-sortable-disabled no_menu" style="z-index:3;" id="menuList">
                                <li v-for="(btn,index) in menu.button" :key="btn.id" class="jsMenu pre_menu_item grid_item jslevel1 size1of3 ui-sortable ui-sortable-disabled">
                                    <a href="javascript:void(0);" @click="menu_selected(btn.name,index)" :class="[{pre_menu_link: index===activeMenuIndex && activeMenuType()==1}]" draggable="false">
                                        <i class="icon_menu_dot js_icon_menu_dot dn"></i>
                                        <i class="icon20_common sort_gray"></i>
                                        <span>{{ btn.name }}</span>
                                    </a>
                                    <div class="sub_pre_menu_box" v-if="index===activeMenuIndex">
                                        <ul class="sub_pre_menu_list">
                                            <li v-for="(sub,index) in btn.sub_button" :key="sub.id" :class="[{current: index===activeMenuItemIndex && activeMenuType()==2}]">
                                                <a href="javascript:void(0);"  @click="menu_item_selected(sub.name,index)" draggable="false">
                                                    <span class="sub_pre_menu_inner">
                                                        <i class="icon20_common sort_gray"></i>
                                                        <span>{{ sub.name }}</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li v-if="isSet(menu.button[activeMenuIndex].sub_button)&&btn.sub_button.length>=0&&btn.sub_button.length < 5">
                                                <a href="javascript:void(0);"  title="最多添加5个子菜单" @click="menu_item_add()" draggable="false">
                                                    <span class="sub_pre_menu_inner">
                                                        <i class="icon14_menu_add"></i>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                        <i class="arrow arrow_out"></i>
                                        <i class="arrow arrow_in"></i>
                                    </div>
                                </li>
                                <li class="pre_menu_item grid_item no_extra size1of1">
                                    <a href="javascript:void(0);" v-if="isSet(menu.button)?(menu.button.length>=0&&menu.button.length<3):false" @click="menu_add()" :class="[{pre_menu_link: activeMenuIndex===''}]" title="最多添加3个一级菜单" draggable="false">
                                        <i class="icon14_menu_add"></i>
                                        <span>添加菜单</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!--手机模块END-->
            <!--编辑表单区域-->
            <div class="right-box">
                <div class="editor-inner" v-show="activeMenuIndex > 0 || activeMenuIndex === 0 || activeMenuItemIndex > 0 || activeMenuIndex === 0 ">
                    <div class="menu-title-bar">
                        <h4 class="title">菜单名称</h4>
                        <div class="delete">
                            <a href="javascript:void(0);" @click="menu_del()" v-if="showDelBtnType===1">删除菜单</a>
                            <a href="javascript:void(0);" @click="menu_item_del()" v-if="showDelBtnType===2">删除子菜单</a>
                        </div>
                    </div>
                    <div class="menu-form-box">
                        <div style="display: block;" class="msg-sender-tips">已为“菜单名称”添加了5个子菜单，无法设置其他内容。</div>
                    </div>
                    <div class="form-group">
                        <div class="form-item">
                            <label class="form-item-label" style="width: 80px;">菜单名称</label>
                            <div class="ivu-form-item-content" style="margin-left: 80px;">
                                <div class="ivu-input-wrapper ivu-input-type">
                                    <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                                    <input type="text" placeholder="请填写菜单名称" class="ivu-input" style="width: 250px" v-if="activeMenuType() == 1 && isSet(menu.button[activeMenuIndex])" v-model="menu.button[activeMenuIndex].name">
                                    <input type="text" placeholder="请填写菜单名称" class="ivu-input" style="width: 250px" v-if="activeMenuType() == 2 && isSet(menu.button[activeMenuIndex].sub_button[activeMenuItemIndex])" v-model="menu.button[activeMenuIndex].sub_button[activeMenuItemIndex].name">
                                    <p>{{stringNumberTips}}</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-item-label" style="width: 80px;">菜单内容</label>
                            <div class="ivu-form-item-content" style="margin-left: 80px;">
                                <div class="ivu-radio-group">
                                    <Radio-group v-model="showMenuContentType" @on-change="radio_label_selected">
                                        <Radio label="1">发送消息</Radio>
                                        <Radio label="2">跳转网页</Radio>
                                        <Radio label="3">跳转小程序</Radio>
                                    </Radio-group>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="msg-content-container">
                        <!--发送消息-->
                        <div class="msg-content" v-show="showMenuContentType==1">
                            <div class="content">
                                <div class="nav-box" style="height: 40px; border-bottom: 1px solid #e7e7eb">
                                    <div style="width: 420px;">
                                        <ul class="tabs" style="line-height: 38px; height: 38px; text-align: center; font-size: 14px;">
                                            <li class="item" :class="[{selected:showMenuContentMsgType===1}]" @click="msgContentTabNav(1)">
                                                <i class="tabs-icon news"></i>
                                                图文消息
                                            </li>
                                            <li class="item" :class="[{selected:showMenuContentMsgType===2}]" @click="msgContentTabNav(2)">
                                                <i class="tabs-icon image"></i>
                                                图片
                                            </li>
                                            <li class="item" :class="[{selected:showMenuContentMsgType===3}]" @click="msgContentTabNav(3)">
                                                <i class="tabs-icon audio"></i>
                                                语音
                                            </li>
                                            <li class="item" :class="[{selected:showMenuContentMsgType===4}]" @click="msgContentTabNav(4)">
                                                <i class="tabs-icon video"></i>
                                                视频
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!--tabs div-->
                                <div class="tab-panel">
                                    <!--图文-->
                                    <div class="inner" v-show="showMenuContentMsgType===1">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item position-r">
                                                <div class="cover">
                                                    <div class="item">
                                                        <Icon type="compose" class="icon"></Icon>
                                                        <div class="font">自建图文</div>
                                                    </div>
                                                    <div class="item">
                                                        <Icon type="android-share-alt" class="icon"></Icon>
                                                        <div class="font">分享图文</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--图片-->
                                    <div class="inner" v-show="showMenuContentMsgType===2">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="image" class="icon"></Icon>
                                                <div class="font">上传图片</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--语音-->
                                    <div class="inner" v-show="showMenuContentMsgType===3">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="android-microphone" class="icon"></Icon>
                                                <div class="font">新建语音</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--视频-->
                                    <div class="inner" v-show="showMenuContentMsgType===4">
                                        <div class="content-box">
                                            <div class="item">
                                                <Icon type="android-add" class="icon"></Icon>
                                                <div class="font">从素材库中选择</div>
                                            </div>
                                            <div class="item">
                                                <Icon type="ios-videocam" class="icon"></Icon>
                                                <div class="font">新建视频</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--跳转网页-->
                        <div class="msg-content" v-show="showMenuContentType==2">
                            <div class="form-item" style="padding: 15px;">
                                <label class="form-item-label" style="width: 80px;">页面地址</label>
                                <div class="ivu-form-item-content" style="margin-left: 80px;">
                                    <div class="ivu-input-wrapper ivu-input-type">
                                        <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                                        <input type="text" placeholder="请填写链接地址" class="ivu-input" style="width: 250px">
                                        <p>从公众号图文消息中选择</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--跳转小程序 其它-->
                        <div class="msg-content bind-app" v-show="showMenuContentType==3">
                            <p class="desc">自定义菜单可跳转已绑定的小程序，本公众号尚未绑定小程序。</p>
                            <a href="https://mp.weixin.qq.com/cgi-bin/wxopen?action=list&amp;token=515462925&amp;lang=zh_CN" class="btn btn_default">前往绑定</a>
                        </div>
                    </div>
                </div>


                <div class="editor-inner-notice" v-show="menu.button.length == 0 || activeMenuIndex===''">
                    请点击左侧菜单进行编辑操作
                </div>

            </div>
        </div>
        <Row type="flex" justify="center" align="middle" style="margin-top: 20px;">
            <Button type="info" style="margin-right: 20px;">保存</Button>
            <Button type="success" style="margin-right: 20px;">保存并同步</Button>
            <Button type="warning">清空菜单</Button>
        </Row>

    </div>
</template>

<style>
    .menu_setting_area {
        /*margin: 14px 30px 0;*/
        margin: 0
    }
    .menu_preview_area {
        float: left;
        margin-right: 12px;
        position: relative;
    }
    .mobile_menu_preview {
        position: relative;
        width: 317px;
        height: 580px;
        background: transparent url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_head_default2968da.png) no-repeat 0 0;
        background-position: 0 0;
        border: 1px solid #e7e7eb;
    }
    .mobile_menu_preview .mobile_hd {
        color: #fff;
        text-align: center;
        padding-top: 30px;
        font-size: 15px;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        margin: 0 30px;
    }
    .menu_preview_area .pre_menu_list {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px solid #e7e7eb;
        background: transparent url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_foot_default2968da.png) no-repeat 0 0;
        background-position: 0 0;
        background-repeat: no-repeat;
        padding-left: 43px;
    }
    .menu_preview_area .pre_menu_item {
        line-height: 50px;
    }
    .pre_menu_item {
        position: relative;
        float: left;
        line-height: 38px;
        text-align: center;
    }
    .size1of3 {
        width: 33.33%;
    }
    .grid_item {
        float: left;
    }
    .pre_menu_item a {
        display: block;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        color: #616161;
        text-decoration: none;
    }
    .pre_menu_item .icon_menu_dot {
        background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 -36px no-repeat;
        width: 7px;
        height: 7px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 2px;
        margin-top: -2px;
    }
    .dn {
        display: none;
    }
    .menu_preview_area .pre_menu_list .sort_gray {
        margin-top: -4px;
    }
    .menu_preview_area .pre_menu_list .sort_gray {
        display: none;
    }
    .icon20_common.sort_gray {
        background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/base/base_z3560fc.png) 0 -4779px no-repeat;
    }
    .icon20_common {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        line-height: 100px;
        overflow: hidden;
    }
    .grid_line .no_extra.grid_item {
        float: none;
        width: auto;
        overflow: hidden;
    }
    .menu_preview_area .pre_menu_item {
        line-height: 50px;
    }
    .pre_menu_item {
        position: relative;
        float: left;
        line-height: 38px;
        text-align: center;
    }
    .size1of1 {
        width: 100%;
    }
    .grid_item {
        float: left;
    }
    .menu_preview_area .pre_menu_list.no_menu .pre_menu_item .pre_menu_link {
        border: 1px solid #44b549;
        line-height: 48px;
        background-color: #fff;
        color: #44b549;
    }
    .menu_preview_area .pre_menu_list.no_menu .icon14_menu_add {
        background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 -18px no-repeat;
    }
    .menu_preview_area .icon14_menu_add {
        background: url(https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/style/page/menu/index_z354723.png) 0 0 no-repeat;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        margin-top: -2px;
    }



    /*添加菜单样式*/
    .menu_preview_area .sub_pre_menu_box {
        bottom: 60px;
        background-color: #fafafa;
        border-top-width: 0;
    }
    .sub_pre_menu_box {
        position: absolute;
        bottom: 50px;
        left: 0;
        width: 100%;
        border: 1px solid #d0d0d0;
        background-color: #fff;
    }
    .menu_preview_area .sub_pre_menu_list li:first-child {
        border-top: 1px solid #d0d0d0;
    }
    .menu_preview_area .sub_pre_menu_list li {
        line-height: 44px;
        border: 1px solid transparent;
        margin: 0 -1px -1px;
    }
    .sub_pre_menu_list li a {
        padding: 0 .5em;
    }
    .pre_menu_item a {
        display: block;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        color: #616161;
        text-decoration: none;
    }
    .menu_preview_area .sub_pre_menu_list li:first-child .sub_pre_menu_inner {
        border-top-width: 0;
    }
    .menu_preview_area .sub_pre_menu_inner {
        display: block;
        border-top: 1px solid #e7e7eb;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        cursor: pointer;
    }
    .sub_pre_menu_box .arrow_out {
        bottom: -6px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: dashed;
        border-color: transparent;
        border-bottom-width: 0;
        border-top-color: #d0d0d0;
        border-top-style: solid;
    }
    .sub_pre_menu_box .arrow {
        position: absolute;
        left: 50%;
        margin-left: -6px;
    }
    .sub_pre_menu_box .arrow_in {
        bottom: -5px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: dashed;
        border-color: transparent;
        border-bottom-width: 0;
        border-top-color: #fafafa;
        border-top-style: solid;
    }
    .menu_preview_area .sub_pre_menu_list li.current {
        background-color: #fff;
        border: 1px solid #44b549;
        position: relative;
        z-index: 1;
        line-height: 45px;
    }


</style>

<script>

    export default{
        data(){
            return{
                platform: 0,
                publicName: '永川优生活',
                menu:{
                    "button":[
                        {"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","url":"","sub_button":[]},
                        {"name":"菜单","sub_button":[
                            {"type":"view","name":"搜索","key":"","url":"http://www.soso.com/","sub_button":[]},
                            {"type":"view","name":"视频","key":"","url":"http://v.qq.com/","sub_button":[]},
                            {"type":"click","name":"赞一下我们","key":"V1001_GOOD","url":"","sub_button":[]}
                        ]
                        }
                    ]
                },
                "new_menu":{'button':[]},
                "activeMenuName":'',
                "activeMenuIndex":'',
                "activeMenuItemName":'',
                "activeMenuItemIndex":'',
                "showDelBtnType":'', //1:delMenu 2:delMenuItem
                "showMenuContentType": 1, //1:发送消息 2:跳转链接 3:小程序
                "showMenuContentMsgType": 1, //1:图文信息 2:图片 3:语音 4:视频
                stringNumberTips: '字数不超过4个汉字或8个字母',

            }
        },
        components:{

        },
        mounted() {
            //判断检查是否有平台号
            this.platform = window.localStorage.getItem('platformNumber')
            //服务器上拖取最新数据
        },
        methods: {
        	//变量状态检测判断
            isSet(variable) {
                if(typeof(variable)!='undefined'){
                    return true;
                }else{
                    return false;
                }
            },
            //添加一级菜单
            menu_add() {
                if(this.menu.button.length < 3){
                    this.activeMenuItemIndex = '';
                    this.activeMenuItemName = '';
                    this.menu.button.push({"type":"click","name":"菜单名称","key":"","url":"","sub_button":[]});
                    this.activeMenuIndex = this.menu.button.length-1;
                    this.activeMenuName = '菜单名称';
                    this.showDelBtnType = 1;
                    //补全数据,无数据也要为空
                    this.menu_data_completing();
                    //判断是否有下级子菜单
                    console.log(this.menu.button,this.activeMenuIndex)
                }else{
                    alert('最多3个一级菜单');
                }
            },
            //添加二级菜单
            menu_item_add() {
                if(this.menu.button[this.activeMenuIndex].sub_button.length < 5){
                    this.menu.button[this.activeMenuIndex].sub_button.push({"type":"click","name":"子菜单名称","key":"","url":"","sub_button":[]});
                    this.activeMenuItemIndex = this.menu.button[this.activeMenuIndex].sub_button.length-1;
                    this.activeMenuItemName = '子菜单名称';
                    this.showDelBtnType = 2;
                    //补全数据,无数据也要为空
                    this.menu_data_completing();
                }else{
                    alert('最多5个二级菜单');
                }
            },
            //当前菜单
            menu_selected(name,index) {
                //判断是否有下级子菜单
            	console.log(this.menu.button)
            	console.log(123)

                this.showDelBtnType = 1;
                this.activeMenuName = name;
                this.activeMenuIndex = index;
                this.activeMenuItemName = '';
                this.activeMenuItemIndex = '';

                //补全数据,无数据也要为空
                this.menu_data_completing();

                if(this.menu.button[this.activeMenuIndex].sub_button.length > 0){
                    this.showMenuContentType = '';
                }else{
                    this.showMenuContentType = this.activeMenuBtnType();
                }
            },
            //当前子菜单选中
            menu_item_selected(name,index) {
                this.showDelBtnType = 2;
                this.activeMenuItemName = name;
                this.activeMenuItemIndex = index;

                //补全数据,无数据也要为空
                this.menu_data_completing();

                if(this.activeMenuIndex > 0 || this.activeMenuIndex === 0){
                    if(this.menu.button[this.activeMenuIndex].sub_button.length > 0){
                        this.showMenuContentType = this.activeMenuBtnType();
                    }
                }
            },
            //菜单删除
            menu_del() {
                if(this.menu.button.length <= 3 && this.menu.button.length >0){

                    if((this.activeMenuIndex !== 0) && (this.activeMenuIndex == this.menu.button.length-1)){
                        this.menu.button.splice(this.activeMenuIndex,1);
                        this.activeMenuIndex -= 1;
                    }else if(this.activeMenuIndex == 0){
                        this.menu.button.splice(this.activeMenuIndex,1);
                        this.activeMenuIndex = 0;
                    }else{
                        this.menu.button.splice(this.activeMenuIndex,1);
                    }

                    if(this.menu.button.length == 0){
                        this.activeMenuIndex = '';
                        this.activeMenuName = '';
                        this.activeMenuItemIndex = '';
                        this.activeMenuItemName = '';
                    }
                }
            },
            //菜单内容选项
            radio_label_selected(val) {
                if(val == 1){
                    this.setType('click');
                }else if(val == 2){
                    this.setType('view');
                }else if(val == 3) {
                    this.setType('app');
                }
            },
            //设置菜单内容类型
            setType:function (type) {
                if(this.activeMenuType == 1){
                    this.menu.button[this.activeMenuIndex].type = type;
                }else if(this.activeMenuType == 2){
                    this.menu.button[this.activeMenuIndex].sub_button[this.activeMenuItemIndex].type = type;
                } else if(this.activeMenuType == 3) {

                }
            },
            //数据补全方法
            menu_data_completing() {
                for(var i=0;i<this.menu.button.length;i++){
                    if(!('type' in this.menu.button[i])){
                        this.menu.button[i].type = 'click';
                    }
                    if(!('name' in this.menu.button[i])){
                        this.menu.button[i].name = '';
                    }
                    if(!('key' in this.menu.button[i])){
                        this.menu.button[i].key = '';
                    }
                    if(!('url' in this.menu.button[i])){
                        this.menu.button[i].url = '';
                    }
                    if(!('sub_button' in this.menu.button[i])){
                        this.menu.button[i].sub_button = [];
                    }
                    if(this.menu.button[i].sub_button.length>0){
                        for(var j=0;j<this.menu.button[i].sub_button.length;j++) {
                            if (!('type' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].type = 'click';
                            }
                            if (!('name' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].name = '';
                            }
                            if (!('key' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].key = '';
                            }
                            if (!('url' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].url = '';
                            }
                            if (!('sub_button' in this.menu.button[i].sub_button[j])) {
                                this.menu.button[i].sub_button[j].sub_button = [];
                            }
                        }
                    }
                }
            },
            //选中菜单属于几级菜单
            activeMenuType() {
                if(this.activeMenuIndex !== '' && this.activeMenuItemIndex !== ''){
                    //子菜单、二级菜单
                    return 2;
                }else if(this.activeMenuIndex !== '' && this.activeMenuItemIndex === ''){
                    //一级菜单
                    return 1;
                }else{
                    return 0;
                }
            },
            //选中菜单类型
            activeMenuBtnType() {
                if(this.activeMenuType() === 1){
                    //一级菜单
                    switch(this.menu.button[this.activeMenuIndex].type){
                        case 'click':
                            return 1;
                        case 'view':
                            return 2;
                        default:
                            return 0;
                    }
                }else if(this.activeMenuType() === 2){
                    //子菜单、二级菜单
                    switch(this.menu.button[this.activeMenuIndex].sub_button[this.activeMenuItemIndex].type){
                        case 'click':
                            return 1;
                        case 'view':
                            return 2;
                        default:
                            return 0;
                    }
                }else{
                    return '';
                }
            },
            //消息内容选项
            msgContentTabNav(val) {
                this.showMenuContentMsgType = val;
            }
        }
    }
</script>

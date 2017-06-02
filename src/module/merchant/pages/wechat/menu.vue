<template>
    <div>
        <div class="menu_setting_box js_menuBox dn" style="display: block;">
            <div class="menu_setting_area js_editBox">
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
                                        <span class='js_l1Title'>{{ btn.name }}</span>
                                    </a>
                                    <div class="sub_pre_menu_box js_l2TitleBox" v-if="index===activeMenuIndex">
                                        <ul class="sub_pre_menu_list">
                                            <li v-for="(sub,index) in btn.sub_button" :key="sub.id" class='jslevel2'><a href="javascript:void(0);"  @click="menu_item_selected(sub.name,index)" :class="[{pre_menu_link: index===activeMenuItemIndex && activeMenuType()==2}]" class="jsSubView" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon20_common sort_gray"></i><span class='js_l2Title'>{{ sub.name }}</span></span></a></li>
                                            <li class='js_addMenuBox' v-if="isSet(menu.button[activeMenuIndex].sub_button)&&btn.sub_button.length>=0&&btn.sub_button.length<5"><a href="javascript:void(0);" class="jsSubView js_addL2Btn" title="最多添加5个子菜单" @click="menu_item_add()" draggable="false"><span class="sub_pre_menu_inner js_sub_pre_menu_inner"><i class="icon14_menu_add"></i></span></a></li>
                                        </ul>
                                        <i class="arrow arrow_out"></i>
                                        <i class="arrow arrow_in"></i>
                                    </div>
                                </li>
                                <li class="js_addMenuBox pre_menu_item grid_item no_extra size1of1"> <a href="javascript:void(0);" v-if="isSet(menu.button)?(menu.button.length>=0&&menu.button.length<3):false"  @click="menu_add()" :class="[{pre_menu_link: activeMenuIndex===''}]" class="js_addL1Btn" title="最多添加3个一级菜单" draggable="false"> <i class="icon14_menu_add"></i> <span class="js_addMenuTips">添加菜单</span></a> </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
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
</style>

<script>

    export default{
        data(){
            return{
                platform: 0,
                publicName: '实时预览',
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
                "showMenuContentType":'', //1:发送消息 2:跳转链接
                "showMenuContentMsgType":'' //1:图文信息 2:图片 3:语音 4:视频
            }
        },
        components:{

        },
        mounted() {
            //判断检查是否有平台号
            this.platform = window.localStorage.getItem('platformNumber')
        },
        methods: {
        	//变量状态检测判断
            isSet:function (variable) {
                if(typeof(variable)!='undefined'){
                    return true;
                }else{
                    return false;
                }
            },
        }
    }
</script>

<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div class="fixedDiv">
        <!--头部组件-->
        <common-header></common-header>
        <!--头部组件结束-->

        <div class="content-container">
            <div class="content">
                <div class="box">
                    <div class="box-content flex" v-if="$route.meta.group == 'manage'">
                        <div class="menu-box">
                            <div class="tip"><router-link to="/">管理中心</router-link></div>
                            <div class="sub-menu">
                                <Menu width="auto" style="position: static;" accordion>
                                    <Submenu :name="index" v-for="(item, index) in routes" :key="item.id" v-if="item.display == 1 && item.group == 'manage'">
                                        <template slot="title">
                                            <Icon :type="item.icon"></Icon>
                                            {{item.name}}
                                        </template>
                                        <Menu-item v-bind:name="(index+9999)*(key+1)" v-for="(child, key) in item.children" :key="child.id" v-if="child.display == 1 && item.group == 'manage'" class="menu-item">
                                            <router-link :to="child.path">{{child.name}}</router-link>
                                        </Menu-item>
                                    </Submenu>
                                </Menu>
                            </div>

                            <!--联系客服-->
                            <div class="contact-us">
                                <div class="title" style="">
                                    <span style="font-size: 14px;">联系我们</span>
                                </div>
                                <div class="box-bd">
                                    <ul>
                                        <li>
                                            <i class="iconfont icon-QQ"></i>
                                            <span>5353920</span>
                                        </li>
                                        <li>
                                            <i class="iconfont icon-dianhua"></i>
                                            <span>400-800-8888</span>
                                        </li>
                                        <li>
                                            <i class="iconfont icon-youxiang"></i>
                                            <span>kefu@daimatu.cn</span>
                                        </li>
                                        <!--<li>-->
                                            <!--<i class="iconfont icon-weixin"></i>-->
                                            <!--<span>关注微信公众号</span>-->
                                            <!--<div class="qr-code">-->
                                                <!--<div class="follow" style="transform:scaleY(-1);">-->
                                                    <!--444-->
                                                <!--</div>-->
                                                <!--<div class="arrow arrow-outer"></div>-->
                                                <!--<div class="arrow arrow-inner"></div>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                    </ul>
                                </div>
                                <div class="dis-qr-code">
                                    <img src="../../assets/images/qrcode.jpg" alt="扫扫我们更健康">
                                </div>
                            </div>
                        </div>

                        <!--右边盒子-->
                        <div class="right-content">
                            <transition :name="transitionName" v-if="$route.path == '/'">
                                <common-main></common-main>
                            </transition>
                            <transition :name="transitionName" v-if="$route.path != '/'">
                                <div>
                                    <div class="navigation-box">
                                        <Breadcrumb>
                                            <Breadcrumb-item>管理中心</Breadcrumb-item>
                                            <Breadcrumb-item v-for="(item, index) in $route.meta.navigation" v-if="$route.meta.navigation.length > 0" :key="index">{{item}}</Breadcrumb-item>
                                        </Breadcrumb>
                                    </div>
                                    <router-view></router-view>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <!--微信分组-->
                    <div class="box-content flex" v-if="$route.meta.group == 'wechat'">
                        <check-platform></check-platform>
                        <div class="menu-box">
                            <div class="tip"><router-link to="/wechat/main">公众号管理中心</router-link></div>
                            <div class="sub-menu">
                                <Menu width="auto" style="position: static;" accordion>
                                    <Submenu :name="index" v-for="(item, index) in routes" :key="item.id" v-if="item.display == 1 && item.group == 'wechat'">
                                        <template slot="title">
                                            <Icon :type="item.icon"></Icon>
                                            {{item.name}}
                                        </template>
                                        <Menu-item v-bind:name="(index+6666)*(key+1)" v-for="(child, key) in item.children" :key="child.id" v-if="child.display == 1 && item.group == 'wechat'" class="menu-item">
                                            <router-link :to="child.path">{{child.name}}</router-link>
                                        </Menu-item>
                                    </Submenu>
                                    <Submenu name="4">
                                        <template slot="title">
                                            <Icon type="android-bookmark"></Icon>
                                            营销活动
                                        </template>
                                        <Menu-item name="4-1">活动列表</Menu-item>
                                        <Menu-item name="4-2">添加活动</Menu-item>
                                    </Submenu>
                                    <Submenu name="5">
                                        <template slot="title">
                                            <Icon type="gear-a"></Icon>
                                            平台设置
                                        </template>
                                        <Menu-item name="5-1">平台设置</Menu-item>
                                    </Submenu>
                                    <Submenu name="6">
                                        <template slot="title">
                                            <Icon type="settings"></Icon>
                                            <a href="" style="color: #657180;">定制中心</a>
                                        </template>
                                    </Submenu>
                                </Menu>
                            </div>
                        </div>

                        <!--右边盒子-->
                        <div class="right-content">
                            <transition :name="transitionName" v-if="$route.path == '/'">
                                <common-main></common-main>
                            </transition>
                            <transition :name="transitionName" v-if="$route.path != '/'">
                                <div>
                                    <div class="navigation-box">
                                        <Breadcrumb>
                                            <Breadcrumb-item>微信公众号管理中心</Breadcrumb-item>
                                            <Breadcrumb-item v-for="(item, index) in $route.meta.navigation" v-if="$route.meta.navigation.length > 0" :key="index">{{item}}</Breadcrumb-item>
                                        </Breadcrumb>
                                    </div>
                                    <router-view></router-view>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="footer">
                        <p>推荐使用先进浏览器获得最佳体验 <span><a href="http://rj.baidu.com/soft/detail/14744.html">谷歌Chrome浏览器</a></span> | <span><a href="http://rj.baidu.com/soft/detail/11843.html" target="_blank">Firefox浏览器</a></span></p>
                        Copyright 2017 © daimatu.cn　All Rights Reserved 代码兔微信公众平台版权所有
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100%
    }
</style>

<script>
    import CommonHeader from "./header.vue";
    import CommonMain from "./main.vue";
    import WechatMain from "../wechat/main.vue";
    import CheckPlatform from "../common/check.vue";

    export default {
        data () {
            return {
                transitionName: 'slide-left',
                routes: []
            }
        },
        components: {
            CommonHeader,
            CommonMain,
            WechatMain,
            CheckPlatform
        },
        mounted() {
        	//通过这种方式来处理路由
            const menu = window.localStorage.getItem('merchantMenu');
            this.routes = menu ? typeof (JSON.parse(menu) == "object") ? JSON.parse(menu) : [] : [];
        }
    }
</script>

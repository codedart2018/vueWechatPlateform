<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div class="fixedDiv">
        <!--头部组件-->
        <common-header></common-header>
        <!--头部组件结束-->

        <div class="contentDiv">
            <div class="content">
                <div class="box">
                    <div class="box-content flex" v-if="$route.meta.group == 'manage'">
                        <div class="menu-box">
                            <div class="tip"><router-link to="/">管理中心</router-link></div>
                            <div class="sub-menu">
                                <Menu width="auto" style="position: static;" accordion>
                                    <Submenu name="1">
                                        <template slot="title">
                                            <Icon type="chatbubbles"></Icon>
                                            公众号
                                        </template>
                                        <Menu-item name="1-1"><router-link to="/public/list" style="color: #657180;">公众号列表</router-link></Menu-item>
                                        <Menu-item name="1-2"> <router-link to="/public/bind" style="color: #657180;">快速绑定</router-link></Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="stats-bars"></Icon>
                                            财务中心
                                        </template>
                                        <Menu-item name="2-1"><router-link to="/expense/bills" style="color: #657180;">资金明细</router-link></Menu-item>
                                        <Menu-item name="2-2"><router-link to="/expense/integral" style="color: #657180;">积分明细</router-link></Menu-item>
                                    </Submenu>
                                    <!--<Submenu name="3">-->
                                        <!--<template slot="title">-->
                                            <!--<Icon type="ios-people"></Icon>-->
                                            <!--短信管理-->
                                        <!--</template>-->
                                        <!--<Menu-item name="3-1">新增用户</Menu-item>-->
                                        <!--<Menu-item name="3-2">活跃用户</Menu-item>-->
                                    <!--</Submenu>-->
                                    <!--<Submenu name="4">-->
                                        <!--<template slot="title">-->
                                            <!--<Icon type="ios-people"></Icon>-->
                                            <!--消息工单-->
                                        <!--</template>-->
                                        <!--<Menu-item name="4-1">新增用户</Menu-item>-->
                                        <!--<Menu-item name="4-2">活跃用户</Menu-item>-->
                                    <!--</Submenu>-->
                                    <Submenu name="5">
                                        <template slot="title">
                                            <Icon type="stats-bars"></Icon>
                                            商户管理
                                        </template>
                                        <Menu-item name="5-1"><router-link to="/setting/merchant" style="color: #657180;">商户信息</router-link></Menu-item>
                                        <Menu-item name="5-2">活跃分析</Menu-item>
                                        <Menu-item name="5-3">时段分析</Menu-item>
                                    </Submenu>
                                    <Submenu name="6">
                                        <template slot="title">
                                            <Icon type="gear-a"></Icon>
                                            个人设置
                                        </template>
                                        <Menu-item name="6-1"><router-link to="/setting/personal" style="color: #657180;">资料修改</router-link></Menu-item>
                                        <Menu-item name="6-2"><router-link to="/personal" style="color: #657180;">登陆日志</router-link></Menu-item>
                                        <Menu-item name="6-3"><router-link to="/personal" style="color: #657180;">操作日志</router-link></Menu-item>
                                    </Submenu>
                                    <Submenu name="7">
                                        <template slot="title">
                                            <Icon type="help-circled"></Icon>
                                            帮助中心
                                        </template>
                                        <Menu-item name="7-1">新增用户</Menu-item>
                                        <Menu-item name="7-2">活跃用户</Menu-item>
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
                                    <div style="height: 70px; display: flex; align-items: center">
                                        <Breadcrumb>
                                            <Breadcrumb-item href="/">Home</Breadcrumb-item>
                                            <Breadcrumb-item href="/components/breadcrumb">Components</Breadcrumb-item>
                                            <Breadcrumb-item>Breadcrumb</Breadcrumb-item>
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
                                    <Submenu name="0">
                                        <template slot="title">
                                            <Icon type="android-apps"></Icon>
                                            应用管理
                                        </template>
                                        <Menu-item name="0-1"><router-link to="/website/index" style="color: #657180;">微网站</router-link></Menu-item>
                                    </Submenu>
                                    <Submenu name="1">
                                        <template slot="title">
                                            <Icon type="chatbubbles"></Icon>
                                            微信管理
                                        </template>
                                        <Menu-item name="1-1"><router-link to="/wechat/fans" style="color: #657180;">粉丝管理</router-link></Menu-item>
                                        <Menu-item name="1-2"><router-link to="/wechat/message" style="color: #657180;">消息管理</router-link></Menu-item>
                                        <Menu-item name="1-3"><router-link to="/public/bind" style="color: #657180;">自动回复</router-link></Menu-item>
                                        <Menu-item name="1-4"><router-link to="/public/bind" style="color: #657180;">消息群发</router-link></Menu-item>
                                        <Menu-item name="1-5"><router-link to="/wechat/menu" style="color: #657180;">自定义菜单</router-link></Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-compose-outline"></Icon>
                                            文章素材
                                        </template>
                                        <Menu-item name="2-1"><router-link to="/archives/material" style="color: #657180;">素材管理</router-link></Menu-item>
                                        <Menu-item name="2-2"><router-link to="/archives/category" style="color: #657180;">文章分类</router-link></Menu-item>
                                        <Menu-item name="2-3"><router-link to="/archives/index" style="color: #657180;">文章列表</router-link></Menu-item>
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
                            <router-view></router-view>
                        </div>
                    </div>

                    <div style="height: 40px; text-align: center; line-height: 40px;">
                        Copyright　© daimatu.cn　All Rights Reserved　代码兔微信公众平台版权所有
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
    import CommonHeader from "./header.vue"
    import CommonMain from "./main.vue"
    import WechatMain from "../wechat/main.vue"
    import CheckPlatform from "../common/check.vue"

    export default {
        data () {
            return {
                transitionName: 'slide-left',
            }
        },
        components: {
            CommonHeader,
            CommonMain,
            WechatMain,
            CheckPlatform
        },
        mounted() {
            //console.log(this.$route)
        }
    }
</script>

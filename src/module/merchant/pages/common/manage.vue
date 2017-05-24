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
                    <div class="box-content flex">
                        <div v-if="$route.meta.group == 'manage'">
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
                                            <Menu-item name="2-1">新增用户</Menu-item>
                                            <Menu-item name="2-2">活跃用户</Menu-item>
                                        </Submenu>
                                        <Submenu name="3">
                                            <template slot="title">
                                                <Icon type="ios-people"></Icon>
                                                短信管理
                                            </template>
                                            <Menu-item name="3-1">新增用户</Menu-item>
                                            <Menu-item name="3-2">活跃用户</Menu-item>
                                        </Submenu>
                                        <Submenu name="4">
                                            <template slot="title">
                                                <Icon type="ios-people"></Icon>
                                                消息工单
                                            </template>
                                            <Menu-item name="4-1">新增用户</Menu-item>
                                            <Menu-item name="4-2">活跃用户</Menu-item>
                                        </Submenu>
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
                                                <Icon type="ios-gear-outline"></Icon>
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
                                        <Submenu name="8">
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
                        <div v-if="$route.meta.group == 'wechat'">3333</div>

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

    export default {
        data () {
            return {
                transitionName: 'slide-left',
            }
        },
        components: {
            CommonHeader,
            CommonMain

        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>

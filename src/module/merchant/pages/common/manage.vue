<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div class="fixedDiv">
        <div class="header box-shadow">
            <h1 class="logo"><a href="/">班级优化大师-抓住孩子的每一课闪光点</a></h1>
            <div class="top-panel">
                <span class="divide-icon pull-left">|</span>
                <a class="user-info" href="#/user">
                    <img
                        src="https://o1aa0tynl.qnssl.com/3ce66694636c4db500e0607cec87791e010fa3d8c2d5c609832af3979bb5e768?imageMogr2/crop/!87.99999999999999x88a5.000000000000013a0/thumbnail/120x120">
                    <span class="simple-text user-name">baide</span>
                </a>
                <span class="divide-icon pull-left">|</span>
                <a href="/app/logout" class="logout-btn">退出</a>
                <div class="clearfix"></div>
            </div>
            <div class="feedback-panel">
                <i class="message">
                    <div class="notification"></div>
                </i>
            </div>
            <div class="nav">
                <ul class="list-inline">
                    <li><a href="#/myclass" class="active">财务</a></li>
                    <li><a href="#/message">工单</a></li>
                    <li><a href="#/score">帮助</a></li>
                </ul>
            </div>
        </div>

        <div class="contentDiv">
            <div class="content">
                <div class="box">
                    <div class="box-content flex">
                        <div class="menu-box">
                            <div class="tip">管理中心</div>
                            <div class="sub-menu">
                                <Menu width="auto" style="position: static;" accordion>
                                    <Submenu name="1">
                                        <template slot="title">
                                            <Icon type="chatbubbles"></Icon>
                                            公众号
                                        </template>
                                        <Menu-item name="1-1"> <router-link to="/edit" style="color: #657180;">文章管理</router-link></Menu-item>
                                        <Menu-item name="1-2"> <router-link to="/add" style="color: #657180;">评论管理</router-link></Menu-item>
                                        <Menu-item name="1-3">举报管理</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="stats-bars"></Icon>
                                            财务中心
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            短信管理
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            消息工单
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="3">
                                        <template slot="title">
                                            <Icon type="stats-bars"></Icon>
                                            商户管理
                                        </template>
                                        <Menu-group title="使用">
                                            <Menu-item name="3-1">新增和启动</Menu-item>
                                            <Menu-item name="3-2">活跃分析</Menu-item>
                                            <Menu-item name="3-3">时段分析</Menu-item>
                                        </Menu-group>
                                        <Menu-group title="留存">
                                            <Menu-item name="3-4">用户留存</Menu-item>
                                            <Menu-item name="3-5">流失用户</Menu-item>
                                        </Menu-group>
                                    </Submenu>
                                    <Submenu name="4">
                                        <template slot="title">
                                            <Icon type="ios-gear-outline"></Icon>
                                            个人设置
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="help-circled"></Icon>
                                            帮助中心
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                </Menu>

                            </div>
                        </div>
                        <!--右边盒子-->
                        <div class="right-content">
                            <common-main></common-main>
                        </div>
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
    import CommonMain from "./main.vue"

    export default {
        data () {
            return {}
        },
        components: {
            CommonMain
        },
    }
</script>

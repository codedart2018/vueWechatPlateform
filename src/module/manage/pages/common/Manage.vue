<style src="../../assets/style/common/base.less" lang="less" scoped></style>
<style src="../../assets/style/common/manage.less" lang="less" scoped></style>

<template>
    <div class="container">
        <row class="nav-bar">
            <Col span="2" class="logo">
            <Icon type="home"/>
            </Col>
            <Col span="22">
            <Col span="12">
            <ul class="bar-ul">
                <li class="li-border">
                    <Icon type="laptop"></Icon>
                    <router-link to="/" class="menu-a">管理控制台</router-link>
                </li>
                <li class="li-border">
                    <Icon type="android-menu"></Icon>
                    <router-link to="/" class="menu-a">快捷面板</router-link>
                </li>
            </ul>
            </Col>
            <Col span="12">
            <ul class="bar-ul pull-right">
                <li class="li-border">
                    <Icon type="ios-bell" class="bell"></Icon>
                    <span class="bell-num">310</span>
                </li>
                <li class="li-border">客服工单</li>
                <li class="li-border">帮助文档</li>
                <li class="li-border">缓存清除</li>
                <li class="li-border user">
                    <div class="avatar" style="background-image: url('https://avatars.githubusercontent.com/u/12706830?v=3')"></div>
                    <Dropdown placement="bottom-end" @on-click="topRightDropDown">
                        <a href="javascript:void(0)" style="color: #FFFFFF;">
                            {{user.user_name}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item name="edit_user">资料修改</Dropdown-item>
                            <Dropdown-item name="platform">平台切换</Dropdown-item>
                            <Dropdown-item divided name="out">退出登陆</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </li>
                <li>皮肤颜色</li>
            </ul>
            </Col>
            </Col>
        </row>

        <div class="main">
            <aside>
                <div class="sidebar-fold">
                    <Icon type="android-menu"></Icon>
                </div>

                <Menu width="auto" theme="dark" accordion>
                    <Submenu :name="index" v-for="(item, index) in $router.options.routes" :key="item.id" v-if="item.display == 1">
                        <template slot="title">
                            <Icon :type="item.icon"></Icon>
                            {{item.name}}
                        </template>
                        <Menu-item v-bind:name="(index+9999)*(key+1)" v-for="(child, key) in item.children" :key="child.id" v-if="child.display == 1" class="menu-item">
                            <span @click="goPath(child.name, [index, key])">{{child.name}}</span>
                        </Menu-item>
                    </Submenu>
                </Menu>
            </aside>

            <section class="content-container">
                <div style="height: 40px;">
                    <Breadcrumb>
                        <Breadcrumb-item>首页</Breadcrumb-item>
                        <Breadcrumb-item >{{this.$route.name}}</Breadcrumb-item>
                        <Breadcrumb-item v-if="navOne">{{navOne}}</Breadcrumb-item>
                        <Breadcrumb-item v-if="navTwo">{{navTwo}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <transition v-if="$route.path == '/'">
                    <common-main></common-main>
                </transition>
                <transition :name="transitionName" v-if="$route.path != '/'">
                    <router-view></router-view>
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
    //引入公共 main
    import CommonMain from "./main.vue"
    import {mapActions, mapGetters} from 'vuex'
    import {filterRouters} from '../../router'

    export default {
        beforeCreate: function () {

        },
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                openNames: ["1"],
                transitionName: 'slide-left',
                user: {},
                navOne: '',
                navTwo: ''
            }
        },
        beforeMount() {

        },
        mounted() {
            this.user = this.$store.state.User.user_info
            //console.log(this.$route.path)
            //console.log(this.$router.options.routes)
            //this.$loading('加载中')
            //console.log(this.$router.options.routes)
            //console.log(this.$store.state.MainMenu.mainMenu)
            // token Ox4bwEj5_PcLjF8pDs7PDLqqwOK6Gm766HNTWulifoc39k0RjlwE90gRxp4E7gLn_omf_7ZSRmdLcZeNmy29wA
        },
        methods: {
            ...mapActions(['delMainMenu', 'userOut']),
            topRightDropDown(name) {
                if (name == 'out') {
                    let menu = this.$store.state.MainMenu.mainMenu
                    let new_router = filterRouters(this.$router.options.routes, menu)
                    this.$router.options.routes = new_router
                    //删除登陆的一切信息
                    this.delMainMenu(this)
                    this.userOut(this)
                    this.$router.push({path: '/login'})
                    this.$Message.success("退出成功")
                }
            },
            //编程式导航
            goPath(name, params) {
                this.$router.push({ name: name })
                //todo 这个要二次才显示正确 后面解决
                //this.navOne = this.$router.options.routes[params[0]].name
                //this.navTwo = this.$route.name
            }
        },
        components: {
            CommonMain
        },
        // watch $route 决定使用哪种过渡
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        beforeDestroy: function () {

        }
    }
</script>

<style src="../../assets/style/login/index.less" lang="less"></style>
<template>
    <div class="large-header" id="home">
        <canvas id="canvas" class="canvas"></canvas>
        <div class="login-box">
            <div class="top">
                <span class="lb" @click="showScan" :class="{ act: account }">帐号登陆</span>
                <span @click="showAccount" :class="{ act: scan }">扫码登陆</span>
            </div>

            <div class="account-box" v-show="account">

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <Form-item prop="username">
                        <Input type="text" v-model="formValidate.username" placeholder="帐号"
                               @on-enter="handleSubmit('formValidate')"></Input>
                    </Form-item>

                    <Form-item prop="password">
                        <Input type="password" v-model="formValidate.password" placeholder="密码"
                               @on-enter="handleSubmit('formValidate')"></Input>
                    </Form-item>

                    <Form-item prop="code">
                        <Input type="text" v-model="formValidate.code" placeholder="验证码"
                               @on-enter="handleSubmit('formValidate')"></Input>
                        <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
                    </Form-item>

                    <div class="login-loading" v-show="login_loading">
                        <Spin fix class="spin">
                            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                            <div>登陆中...</div>
                        </Spin>
                    </div>

                    <Form-item v-show="!login_loading">
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    </Form-item>

                </Form>

            </div>

            <div class="scan-box" v-show="scan">
                <div class="position">
                    <img src="https://qr.m.jd.com/show?appid=133&size=147&t=1480701583412" alt="">
                    <div class="tip-msg">打开微信 扫描二维码</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {canvas} from '../../../../libs/canvas/star'
    import {mapActions} from 'vuex'
    import {sessionRouters, filterRouters} from '../../router'
    export default {
        beforeCreate: function () {
            document.getElementsByTagName("body")[0].className = "login_body"
            //计算屏幕高度宽度 让其自适应
            document.getElementsByTagName('body')[0].style.width = window.innerWidth + 'px'
            document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
        },
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (value.length < 6 || value.length > 32) {
                        callback(new Error('密码长度6-32个字符'))
                    }
                    callback();
                }
            }
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
                if (!reg.test(value)) {
                    callback(new Error('验证码中能中文数字'));
                } else {
                    callback();
                }
            };
            return {
                formValidate: {
                    username: '',
                    password: '',
                    code: ''
                },
                ruleValidate: {
                    username: [
                        {required: true, message: '帐号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'}
                    ]
                },
                account: true,
                scan: false,
                verifyUrl: '/api/login/code',
                login_loading: false
            }
        },
        methods: {
            ...mapActions(['mainMenu', 'userLogin', 'auth']),
            showAccount() {
                this.scan = true
                this.account = false
            },
            showScan() {
                this.account = true
                this.scan = false
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('Login', this.formValidate).then((res) => {
                            if (res.status) {
                                this.mainMenu(res.data.menu)
                                //追加路由菜单
                                let routes = sessionRouters(res.data.menu)
                                //重新追加权限路由
                                for (let route of routes) {
                                    this.$router.options.routes.push(route)
                                }
                                this.$router.addRoutes(routes)
                                this.$Message.success("登陆成功")
                                //验证通过
                                this.login_loading = true
                                let user_info = res.data.user_info
                                let token = res.data.token
                                this.userLogin({
                                    user_info,
                                    token
                                })
                                this.auth(res.data.alias)
                                this.$router.push({path: '/'})
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            refreshVerify() {
                this.verifyUrl = ''
                setTimeout(() => {
                    this.verifyUrl = '/api/login/code?v=' + Math.random() * 1000
                }, 500)
            }
        },
        //挂载执行
        mounted() {
            canvas()
        },
        components: {},
        beforeDestroy: function () {
            //销毁移除
            document.body.removeAttribute("class", "login_body")
        }
    }
</script>

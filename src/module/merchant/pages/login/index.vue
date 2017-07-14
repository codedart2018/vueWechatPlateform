<style src="../../assets/style/login/index.less" lang="less" scoped></style>
<template>
    <div class="container merchant-login">
        <div class="login">
            <div class="left">
                <div class="welcome">欢迎登陆代码兔商户管理平台</div>
                <Form ref="formLogin" :model="formLogin" :rules="ruleValidate" inline class="form">
                    <Form-item prop="account">
                        <Input type="text" v-model="formLogin.account" placeholder="帐号 / 手机号"
                               @on-enter="handleSubmit('formLogin')">
                        <Icon type="person" slot="prepend" class="icon"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input type="password" v-model="formLogin.password" placeholder="请填写密码"
                               @on-enter="handleSubmit('formLogin')">
                        <Icon type="locked" slot="prepend" class="icon"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="code">
                        <Input type="text" v-model="formLogin.code" placeholder="请填写验证码"
                               @on-enter="handleSubmit('formLogin')"></Input>
                        <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
                    </Form-item>
                </Form>
            </div>
            <div class="scan">
                <div class="qr-code"><img src="../../assets/images/qrcode.jpg" alt=""></div>
                <div class="notice">微信扫描登陆更快捷</div>
                <div class="tel">客服电话:400-8181909</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {sessionRouters, filterRouters} from '../../router'

    export default{
        //watch 监听不到用它来
        //https://router.vuejs.org/zh-cn/advanced/navigation-guards.html 文档地址 标记组件内的钩子
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例'
                //解决进入路由不刷新验证码问题
                vm.verifyUrl = '/merchants/passport/code?v=' + Math.random() * 1000
            })
        },
        data(){
            return {
                formLogin: {
                    account: '',
                    password: '',
                    code: ''
                },
                ruleValidate: {
                    account: [
                        {required: true, message: '请填写帐号', trigger: 'blur'},
                        {type: 'string', min: 3, message: '帐号长度不能低于3位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {type: 'string', message: '验证码只能英文数字', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
                    ]
                },
                verifyUrl: '',
            }
        },
        methods: {
            ...mapActions(['merchantLogin', 'merchantMenu']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('MerchantLogin', this.formLogin).then((res) => {
                            if (res.status) {
                            	//console.log(res.data.menu);
                                this.merchantMenu(res.data.menu);
                                let routes = sessionRouters(res.data.menu);
                                for (let route of routes) {
                                    this.$router.options.routes.push(route);
                                }
                                this.$router.addRoutes(routes);
                                let user = res.data.user;
                                let merchant = res.data.merchant;
                                this.merchantLogin({
                                    user,
                                    merchant
                                })
                                this.$Message.success("登陆成功");
                                this.$router.push({path: '/'});
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //刷新切换验证码
            refreshVerify() {
                this.verifyUrl = '';
                setTimeout(() => {
                    this.verifyUrl = '/merchants/passport/code?v=' + Math.random() * 1000;
                }, 500);
            },
            //设置cookie
            set(name, value, days) {
                var d = new Date;
                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
            },
            get(name) {
                var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
                return v ? v[2] : null;
            },
            delete(name) {
                this.set(name, '', -1);
            }
        },
        watch: {},
        components: {}
    }
</script>

<style src="../../assets/style/register/index.less" lang="less"></style>
<template>
    <div class="register-body">
        <div class="register-wrapper">
            <div class="register-header">
                <a class="logo zh" href=""
                   style="background-image: url(''); background-size:240px 60px;width:240px;height:60px;display:inline-block;"></a>
            </div>
            <div class="register-content">
                <div class="b-title">
                    <div class="register-last-txt">
                        <a href="">微信快捷登录&gt;&gt;</a>
                    </div>
                    <h2>
                        <span class="icon icon-mail"></span>
                        新用户注册
                    </h2>
                </div>
                <div class="register-box">
                    <div class="attribute">
                        <div class="type" v-bind:class="{ typeBackground: type2 }" @click="switchType(2)">
                            <span>企业用户</span>
                            <p>需要工商资料认证</p>
                        </div>
                        <div class="type" v-bind:class="{ typeBackground: type1 }" style="margin-left: 20px;"
                             @click="switchType(1)">
                            <span>个人用户</span>
                            <p>需个人身份认证</p>
                        </div>
                    </div>
                    <div class="form-line">
                        <span class="line"></span>
                        <span class="title">填写基本资料</span>
                    </div>
                    <div class="form-box">
                        <Form ref="formField" :model="formField" :rules="ruleValidate">
                            <Form-item prop="name">
                                <Input v-model="formField.name" :placeholder="'请填写您的' + typeText +'商户名称'"></Input>
                            </Form-item>
                            <Form-item prop="account">
                                <Input v-model="formField.account"
                                       :placeholder="'请填写您的'+ typeText +'帐户名和登陆名. 只允许(a-zA-z0-9_-)格式'"></Input>
                            </Form-item>
                            <Form-item prop="password">
                                <Input type="password" v-model="formField.password"
                                       :placeholder="'请填写您的'+ typeText +'帐户(6-18)位密码'"/>
                            </Form-item>
                            <Form-item prop="repeat_password">
                                <Input type="password" v-model="formField.repeat_password"
                                       placeholder="请再次确认您的密码"/>
                            </Form-item>
                            <div class="form-line">
                                <span class="line"></span>
                                <span class="title">填写联系信息</span>
                            </div>
                            <Form-item prop="contacts">
                                <Input v-model="formField.contacts" :placeholder="'请填写'+ typeText +'联系人'"></Input>
                            </Form-item>
                            <Form-item prop="email">
                                <Input v-model="formField.email" placeholder="请填写电子邮箱"></Input>
                            </Form-item>
                            <Form-item prop="mobile">
                                <Input v-model="formField.mobile" placeholder="请填写联系手机号码(此号码可当帐号登陆)"></Input>
                            </Form-item>
                            <Form-item prop="code">
                                <Input type="text" v-model="formField.code" placeholder="请填写验证码"
                                       @on-enter="handleSubmit('formField')"/>
                                <img :src="verifyUrl" @click="refreshVerify()" class="code-img" title="点击切换验证码">
                            </Form-item>
                            <Form-item>
                                <Button type="primary" @click="handleSubmit('formField')">立即注册</Button>
                            </Form-item>
                        </Form>
                    </div>
                    <div class="form-line">
                        <span class="line"></span>
                        <span class="title">用户注册协议</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            Powered By <a href="http://www.daimatu.cn">代码兔微信公众平台小助手</a>&nbsp;&nbsp;Copyright © 2017 All Rights Reserved.
        </div>
    </div>
</template>

<style scoped>

</style>

<script>

    export default{
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例'
                //解决进入路由不刷新验证码问题
                vm.verifyUrl = '/merchant/passport/code?v=' + Math.random() * 1000
            })
        },
        data () {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写密码'));
                } else {
                    if (value.length < 6 || value.length > 18) {
                        callback(new Error('密码长度6-18个字符'))
                    }
                    if(this.checkIntensity(value) < 2) {
                        callback(new Error('密码太过于简单'))
                    }
                    callback();
                }
            }
            const repeatPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次确认你的密码'));
                } else {
                    if (value.length < 6 || value.length > 18) {
                        callback(new Error('密码长度6-18个字符'))
                    }
                    if (value != this.formField.password) {
                        callback(new Error('请检查两次密码是否相同'))
                    }
                    callback();
                }
            }
            const validateMobile = (rule, value, callback) => {
                if (value) {
                    let reg = /^1[34578]\d{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('手机号码格式不正确'))
                    }
                }
                callback();
            }
            return {
                typeText: '企业',
                formField: {
                    type: 2,
                    name: '',
                    account: '',
                    password: '',
                    repeat_password: '',
                    email: '',
                    contacts: '',
                    mobile: '',
                    code: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '商户名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 4, message: '商户名称长度不能低于4位', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '帐号不能为空', trigger: 'blur'},
                        {type: 'string', min: 3, message: '帐号长度不能低于3位', trigger: 'blur'},
                        {type: 'string', message: '帐号格式不正确', trigger: 'blur', pattern: /^[a-z0-9A-Z_-]+$/}
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    repeat_password: [
                        {required: true, message: '请再次确认你的密码', trigger: 'blur'},
                        {validator: repeatPassword, trigger: 'blur'}
                    ],
                    contacts: [
                        {required: true, message: '请填写联系人', trigger: 'blur'},
                        {type: 'string', min: 2, message: '联系人最少2个汉字', trigger: 'blur'},
                        {type: 'string', max: 10, message: '联系人最最多10个汉字', trigger: 'blur'},
                    ],
                    mobile: [
                        {required: true, message: '请填写联系手机号', trigger: 'blur'},
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {type: 'string', message: '验证码只能英文数字', trigger: 'blur', pattern: /^[a-z0-9A-Z]+$/}
                    ]
                },
                verifyUrl: '',
                typeBackground: '#f4f4f4',
                type1: false,
                type2: true
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (valid) {
                            this.request('MerchantRegister', this.formField, '注册中...').then((res) => {
                                if(res.status) {
                                    this.$Message.success(res.msg);
                                    this.$router.push({path: '/login'})
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            })
                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //刷新切换验证码
            refreshVerify() {
                this.verifyUrl = ''
                setTimeout(() => {
                    this.verifyUrl = '/merchant/passport/code?v=' + Math.random() * 1000
                }, 500)
            },
            switchType(type) {
                if (type == 1) {
                    this.type1 = true
                    this.type2 = false
                    this.typeText = '个人'
                } else {
                    this.type1 = false
                    this.type2 = true
                    this.typeText = '企业'
                }
            },
            checkIntensity(pwd){
                var m = 0;
                var Modes = 0;
                for (var i = 0; i < pwd.length; i++) {
                    var charType = 0;
                    var t = pwd.charCodeAt(i);
                    if (t >= 48 && t <= 57) {
                        charType = 1;
                    }
                    else if (t >= 65 && t <= 90) {
                        charType = 2;
                    }
                    else if (t >= 97 && t <= 122) {
                        charType = 4;
                    }
                    else {
                        charType = 4;
                    }
                    Modes |= charType;
                }
                for (var i = 0; i < 4; i++) {
                    if (Modes & 1) {
                        m++;
                    }
                    Modes >>>= 1;
                }
                if (pwd.length <= 4) {
                    m = 1;
                }
                if (pwd.length <= 0) {
                    m = 0;
                }
                return m;
            }
        },
        computed: {}
    }
</script>

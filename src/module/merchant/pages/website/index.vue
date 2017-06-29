<template>
    <div style="position: relative;">
        <Card dis-hover>
            <Tabs :animated="false">
                <Tab-pane label="基础设置" icon="android-apps">
                    <Row>
                        <Col span="11">
                            <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="100">
                                <Form-item label="网站名称" prop="title">
                                    <Input v-model="formField.title" placeholder="请填写网站名称"></Input>
                                </Form-item>
                                <Form-item label="网站LOGO" prop="logo">
                                    <Upload action="//jsonplaceholder.typicode.com/posts/" success="uploadSuccess">
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                                    </Upload>
                                </Form-item>
                                <Form-item label="站点分类" prop="cate_id" style="width: 400px;">
                                    <Select v-model="formField.cate_id" placeholder="请选择" style="position: absolute">
                                        <Option value="">请选择</Option>
                                        <Option :value="item.id" v-for="item in cate" :key="item.id" v-html="item.name"></Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="联系电话" prop="tel">
                                    <Input v-model="formField.tel" placeholder="请填写联系电话"></Input>
                                </Form-item>
                                <Form-item label="联系手机" prop="mobile">
                                    <Input v-model="formField.mobile" placeholder="请填写联系手机"></Input>
                                </Form-item>
                                <Form-item label="电子邮箱" prop="email">
                                    <Input v-model="formField.email" placeholder="请填写电子邮箱"></Input>
                                </Form-item>
                                <Form-item label="联系地址" prop="address">
                                    <Input v-model="formField.address" placeholder="请填写联系地址"></Input>
                                </Form-item>
                                <Form-item label="邮政编码" prop="zip">
                                    <Input v-model="formField.zip" placeholder="请填写邮政编码"></Input>
                                </Form-item>
                                <Form-item label="地图坐标" prop="location">
                                    <Button type="ghost" icon="location" @click="getLocation">点击获取</Button>
                                    <span style="padding-left: 15px;">{{formField.location}}</span>
                                </Form-item>
                                <Form-item label="网站介绍" prop="desc">
                                    <Input v-model="formField.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                           placeholder="请输入..."></Input>
                                </Form-item>
                                <Form-item>
                                    <Button type="primary" @click="handleSubmit('formField')">提交</Button>
                                    <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置
                                    </Button>
                                </Form-item>
                            </Form>
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="12">
                            这边是手机预览样式
                        </Col>
                    </Row>

                </Tab-pane>
                <Tab-pane label="模板风格" icon="social-windows">

                </Tab-pane>
                <Tab-pane label="其它" icon="android-options">其它</Tab-pane>
            </Tabs>
        </Card>
        <!--地图modal 对话框 自带modal 有问题 重新写一个-->
        <div class="map" v-if="show">
            <bd-map v-on:coordinate="watchLocation"></bd-map>
        </div>
        <!--地图modal 对话框-->
    </div>
</template>
<style scoped>
    .map {
        width: 800px;
        height: 500px;
        border: 1px solid #e9eaec;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
</style>
<script>
    import BdMap from '@/components/map.vue'
    export default{
        data () {

            const validateMobile = (rule, value, callback) => {
                if (value) {
                    let reg = /^1[34578]\d{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('电话号码格式不正确'))
                    }
                }
                callback();
            }

            const validateTel = (rule, value, callback) => {
                if (value) {
                    let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                    if (!reg.test(value)) {
                        callback(new Error('手机号码格式不正确'))
                    }
                }
                callback();
            }

            return {
                formField: {
                	id: '',
                    title: '',
                    logo: '',
                    tel: '',
                    mobile: '',
                    email: '',
                    zip: '',
                    location: '',
                    address: '',
                    desc: ''
                },
                ruleValidate: {
                    title: [
                        {required: true, message: '网站名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '网站不能小于2个字符', trigger: 'blur'},
                        {type: 'string', max: 15, message: '联系地址不能大于15个字符', trigger: 'blur'}
                    ],
                    cate_id: [
                        {required: true, message: '请选择站点分类', trigger: 'change'}
                    ],
                    tel: [
                        {validator: validateTel, trigger: 'blur'}
                    ],
                    mobile: [
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    mail: [
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    address: [
                        {type: 'string', min: 6, message: '联系地址不能小于6个字符', trigger: 'blur'},
                        {type: 'string', max: 50, message: '联系地址不能大于50个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {type: 'string', min: 10, message: '介绍不能少于10字符', trigger: 'blur'},
                        {type: 'string', max: 200, message: '介绍最多200字符', trigger: 'blur'}
                    ]
                },
                show: false,
                cate: [],
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('MerchantWebsiteSave', this.formField).then((res) => {
                            if (res.status) {
                                this.$Message.success(res.msg)
                                this.$router.go(-1)
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
            //获得数据
            getData() {
                this.request("MerchantWebsite", {mch_id: 1}, true).then((res) => {
                    if(res.status) {
                        this.formField = res.data
                    }
                })
            },
            getCate() {
                this.request("MerchantWebsiteCate", {}).then((res) => {
                    if(res.status) {
                        this.cate = res.data
                    }
                })
            },
            //打开模态窗口
            getLocation() {
            	this.show = true
            },
            //监听数据变化
            watchLocation: function (location){
            	this.formField.location = location
            }
        },
        mounted() {
            //服务端获取数据
            this.getData()
            this.getCate()
        },
        //数据监听
        watch: {
            'formField.location' (to, from) {
            	this.show = false
                console.log(to, from)
            }
        },
        components: {
            'bd-map': BdMap,
        },
    }
</script>

<template>
    <div>
        <Card dis-hover>
            <Tabs>
                <Tab-pane label="基础设置" icon="android-apps">
                    <Col span="12">
                    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="100">
                        <Form-item label="网站名称" prop="title">
                            <Input v-model="formField.title" placeholder="请填写网站名称"></Input>
                        </Form-item>
                        <Form-item label="网站LOGO" prop="logo">
                            <Upload action="//jsonplaceholder.typicode.com/posts/" success="uploadSuccess">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Form-item>
                        <Form-item label="联系电话" prop="tel">
                            <Input v-model="formField.tel" placeholder="请填写联系电话"></Input>
                        </Form-item>
                        <Form-item label="联系手机" prop="mobile">
                            <Input v-model="formField.mobile" placeholder="请填写联系手机"></Input>
                        </Form-item>
                        <Form-item label="电子邮箱" prop="mail">
                            <Input v-model="formField.mail" placeholder="请填写电子邮箱"></Input>
                        </Form-item>
                        <Form-item label="联系地址" prop="address">
                            <Input v-model="formField.address" placeholder="请填写联系地址"></Input>
                        </Form-item>
                        <Form-item label="邮政编码" prop="zip">
                            <Input v-model="formField.zip" placeholder="请填写邮政编码"></Input>
                        </Form-item>
                        <Form-item label="地图坐标" prop="location">
                            <Button type="ghost" icon="location">点击获取</Button>
                        </Form-item>
                        <Form-item label="网站介绍" prop="desc">
                            <Input v-model="formField.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                   placeholder="请输入..."></Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formField')">提交</Button>
                            <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
                        </Form-item>
                    </Form>
                    </Col>
                </Tab-pane>
                <Tab-pane label="模板风格" icon="social-windows">模板风格</Tab-pane>
                <Tab-pane label="其它" icon="android-options">其它</Tab-pane>
            </Tabs>
        </Card>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data () {
            return {
                formField: {
                    title: '',
                    logo: '',
                    tel: '',
                    mobile: '',
                    mail: '',
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
                    mail: [
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    address: [
                        {type: 'string', min: 6, message: '联系地址不能小于6个字符', trigger: 'blur'},
                        {type: 'string', max: 50, message: '联系地址不能大于50个字符', trigger: 'blur'}
                    ],
                    desc: [
                        {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        components: {}
    }
</script>

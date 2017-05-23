<template>

        <Row>
            <Col span="14">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
                <Form-item label="商户名称">
                    {{data.name}}
                </Form-item>
                <Form-item label="商户Logo">
                    {{data.name}}
                </Form-item>
                <Form-item label="商户类型">
                    <Tag color="green" v-if="data.type == 1">个人</Tag>
                    <Tag color="blue" v-if="data.type == 2">企业</Tag>
                </Form-item>
                <Form-item label="是否认证">
                    <Tag v-if="data.is_auth == 0">未认证</Tag>
                    <Tag v-if="data.is_auth == 1" color="green">已认证</Tag>
                </Form-item>
                <Form-item label="帐号等级">
                    <Tag color="green">普通商户</Tag>
                    <!--<Tag color="blue">一级商户 todo 后面这个可能取消</Tag>-->
                </Form-item>
                <Form-item label="帐户余额">
                    {{data.balance}} 元 <Tag color="blue">提现</Tag>
                </Form-item>
                <Form-item label="已消费金额">
                    {{data.consume}} 元
                </Form-item>
                <Form-item label="积分">
                    0
                </Form-item>
                <Form-item label="商户有效期">
                    <div v-if="data.validity == 0">长期有效</div>
                    <div v-if="data.validity != 0">{{ data.validity | formatDate('yyyy-MM-dd h:m') }} 充值</div>
                </Form-item>
                <Form-item label="联系人" prop="contacts">
                    <Input v-model="data.contacts" placeholder="请填写联系人"></Input>
                </Form-item>
                <Form-item label="手机号码" prop="mobile">
                    <Input v-model="data.mobile" placeholder="请填写手机号码"></Input>
                </Form-item>
                <Form-item label="电话号码" prop="tel">
                    <Input v-model="data.tel" placeholder="请填写电话号码"></Input>
                </Form-item>
                <Form-item label="联系邮箱" prop="email">
                    <Input v-model="data.email" placeholder="请填写邮箱地址"></Input>
                </Form-item>
                <Form-item label="支付宝" prop="alipay">
                    <Input v-model="data.alipay" placeholder="支付宝提现帐号"></Input>
                </Form-item>
                <Form-item label="介绍" prop="desc">
                    <Input v-model="data.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('form')">提交</Button>
                    <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
            </Col>
        </Row>


</template>
<script>
    export default {
        data () {
            return {
                data: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
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
            },
            //获取商户信息
            getData() {
                this.request("MerchantView", {id : 1}, true).then((res) => {
                    if(res.status) {
                        this.data = res.data
                    } else {
                        this.$Message.error('商户信息获取失败!');
                        this.$router.go(-1)
                    }
                }).catch((err) => {

                })
            }
        },
        mounted() {
        	//获取服务数据
        	this.getData()
        }
    }
</script>

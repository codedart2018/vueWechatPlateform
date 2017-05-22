<template>
    <Row>
        <Col span="10">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80">
            <Form-item label="帐号" prop="account">
                <Input v-model="form.account" disabled ></Input>
            </Form-item>
            <Form-item label="身份" prop="name">
                <Input v-model="form.name" disabled ></Input>
            </Form-item>
            <Form-item label="密码" prop="password">
                <Input v-model="form.password" placeholder="密码留空将则不会修改密码" ></Input>
            </Form-item>
            <Form-item label="邮箱" prop="email">
                <Input v-model="form.email" placeholder="请填写邮箱" ></Input>
            </Form-item>
            <Form-item label="手机号" prop="mobile">
                <Input v-model="form.mobile" placeholder="请填写手机号" ></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('form')">提交</Button>
                <Button type="ghost" @click.native="go" style="margin-left: 8px">返回</Button>
            </Form-item>
        </Form>
        </Col>
    </Row>

</template>
<script>
    export default {
        data () {
            return {
                form: {
                    account: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                ruleValidate: {
                    email: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    mobile: [
                        { type: 'string', message: '手机号码不正确', trigger: 'blur', pattern: /^1[34578]\d{9}$/}
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.request("MerchantUserEdit", this.form).then((res) => {
                            if(res.status) {
                                this.$Message.success('提交成功!');
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }).catch(err => {
                        	console.log(err)
                            this.$Message.error('系统服务错误');
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //获得当前用户数据
            getData() {
                this.request("MerchantUserView", {id: 1}, true).then((res) => {
                	if(res.status) {
                		this.form = res.data
                    } else {
                		this.$router.go(-1)
                    }
                }).catch((err => {
                    this.$router.go(-1)
                	console.log(err, 233)
                }))
            },
            //返回
            go() {
            	this.$router.go(-1)
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }
    }
</script>

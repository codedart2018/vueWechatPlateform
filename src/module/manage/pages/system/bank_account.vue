<template>
    <Row>
        <Col span="16">
        <Form ref="formDynamic" :model="formDynamic" :rules="ruleValidate" :label-width="90">
            <Form-item label="充值金额" prop="amounts">
                <Input v-model="formDynamic.amounts" placeholder="多个金额请用英文半角逗号(,)分隔,只允许填写正整数!"></Input>
            </Form-item>
            <Form-item label="支付方式" prop="pay_type">
                <Checkbox-group v-model="formDynamic.pay_type">
                    <Checkbox label="1">微信</Checkbox>
                    <Checkbox label="2">支付宝</Checkbox>
                </Checkbox-group>
            </Form-item>
            <Row>
                <Col span="7" v-show="formDynamic.account.length > 0">
                    <Form-item
                        v-for="(item, index) in formDynamic.bank"
                        :key="item"
                        :label="'开户行' + (index + 1)"
                        :prop="'bank.' + index + '.value'"
                        :rules="{required: true, message: '开户行' + (index + 1) +'不能为空', trigger: 'blur'}">
                        <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                    </Form-item>
                    </Col>
                    <Col span="7">
                    <Form-item
                        v-for="(item, index) in formDynamic.payee"
                        :key="item"
                        :label="'开户名' + (index + 1)"
                        :prop="'payee.' + index + '.value'"
                        :rules="{required: true, message: '开户名' + (index + 1) +'不能为空', trigger: 'blur'}">
                        <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                    </Form-item>
                    </Col>
                    <Col span="10">
                    <Form-item
                        v-for="(item, index) in formDynamic.account"
                        :key="item"
                        :label="'收款帐号' + (index + 1)"
                        :prop="'account.' + index + '.value'"
                        :rules="{required: true, message: '收款帐号' + (index + 1) +'不能为空', trigger: 'blur'}">
                        <Row>
                            <Col span="19">
                            <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                            </Col>
                            <Col span="4" offset="1">
                            <Button type="ghost" @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </Form-item>
                </Col>
                <Col span="24" v-show="formDynamic.account.length == 0" style="text-align: center; font-size: 20px; color: #00a0e9">至少选择一个银行帐户信息</Col>
            </Row>
            <br>
            <Form-item>
                <Row type="flex" justify="center">
                    <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                    </Col>
                </Row>
            </Form-item>
            <Form-item label="汇款说明">
                <Input v-model="formDynamic.desc" type="textarea" :autosize="{minRows: 12,maxRows: 10}"
                       placeholder="请输入..."></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
                <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        </Col>
        <Col span="8"></Col>
    </Row>

</template>
<script>

    export default {
        data () {
            const validateAmounts = (rule, value, callback) => {
                if (value) {
                    let reg = /^((\d+)(?!,\2(,|$)))(,(\d+)(?!,\5(,|$)))*$/;
                    if (!reg.test(value)) {
                        callback(new Error('充值金额规则不正确'))
                    }
                }
                callback();
            }
            return {
                formDynamic: {
                    account: [],
                    bank: [],
                    payee: [],
                    amounts: '',
                    pay_type: [],
                    desc: ''
                },
                //验证规则
                ruleValidate: {
                    amounts: [
                        {required: true, message: '充值金额不能为空', trigger: 'blur'},
                        {validator: validateAmounts, trigger: 'blur'}
                    ],
                    pay_type: [
                        {required: true, type: 'array', min: 1, message: '至少选择一种充值方式', trigger: 'change'},
                        {type: 'array', max: 2, message: '最多选择两个充值方式', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request("AdminSystemBank", this.formDynamic, '保存中...').then((res) => {
                            if (res.status) {
                                this.$Message.success(res.msg)
                            } else {
                                this.$Message.error(res.msg)
                            }
                        }).catch((err) => {
                            this.$Message.error('系统服务出错')
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.bank.push({value: ''});
                this.formDynamic.payee.push({value: ''});
                this.formDynamic.account.push({value: ''});
            },
            handleRemove (index) {
                this.formDynamic.bank.splice(index, 1);
                this.formDynamic.payee.splice(index, 1);
                this.formDynamic.account.splice(index, 1);
            },
            //拉取数据
            getData () {
                this.apiGet('/admin/system/bank_account', {}, '获取中...').then((res) => {
                	//.length > 0
                    if (res.status && res.data) {
                        this.formDynamic.amounts = res.data.amounts;
                        this.formDynamic.desc = res.data.desc;
                        this.formDynamic.pay_type = res.data.pay_type;
                        for (let item of res.data.banks) {
                            this.formDynamic.account.push({'value': item.account});
                            this.formDynamic.bank.push({'value': item.bank});
                            this.formDynamic.payee.push({'value': item.payee});
                        }
                    } else {
                        this.$Message.success(res.msg);
                    }
                });
            },
        },
        mounted() {
            this.getData();
        }
    }
</script>

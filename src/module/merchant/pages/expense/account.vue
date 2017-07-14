<style src="../../assets/style/expense/account.less" lang="less"></style>
<template>
    <div>
        <Row class="bp203">
            <div class="overview">
                <div class="item">
                    <div class="title">账户余额</div>
                    <div class="usage">
                        <span>{{merchant.balance}}<span class="unit">&nbsp;元</span></span>
                    </div>
                </div>
                <div class="item line">
                    <div class="title">累计消费</div>
                    <div class="usage">
                        <span>{{merchant.consume}}<span class="unit">&nbsp;元</span></span>
                    </div>
                </div>
                <div class="item line">
                    <div class="title">账户积分</div>
                    <div class="usage">
                        <span>0<span class="unit">&nbsp;个</span></span>
                    </div>
                </div>
            </div>
            <div class="panel-title">
                <span>线上充值</span>
            </div>
            <div class="pay-container">
                <div class="left">
                    <div class="item">
                        <div class="title">支付方式</div>
                        <div class="option-box">
                            <img src="../../assets/images/wechat_pay.png" v-bind:class="{ 'type-class': type1, 'border-white': type2 }" @click="payType(1)" v-if="configs.pay_type[0] == 1">
                            <img src="../../assets/images/alipay.png" v-bind:class="{ 'type-class': type2, 'border-white': type1 }" @click="payType(2)" v-if="configs.pay_type[1] == 2">
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">充值金额</div>
                        <div class="option-box">
                            <Radio-group v-model="money">
                                <Radio :label="item" style="padding: 5px 10px;" v-for="(item, index) of configs.amounts" :key="index">{{item}}元</Radio>
                                <Radio label="0" style="padding: 5px 10px;"><Input v-model="customize_money"
                                                                                   placeholder="请输入充值金额"
                                                                                   style="width: 120px"></Input>&nbsp;&nbsp;元
                                </Radio>
                            </Radio-group>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <Button type="info" @click="recharge">立即充值</Button>
                </div>
            </div>
            <div class="panel-title">
                <span>线下汇款</span>
            </div>
            <div class="explain">
                <Table stripe :columns="columns1" :data="configs.banks"></Table>
                <div class="well">
                    <h5>线下汇款处理说明</h5>
                    <div v-html="configs.desc" style="line-height: 28px;"></div>
                </div>
            </div>
        </Row>

        <!--充值确认modal-->
        <Modal v-model="recharge_confirm_modal" width="480">
            <p slot="header" style="color:#f60;">
                <Icon type="information-circled"></Icon>
                <span>等待充值</span>
            </p>
            <div style="display: flex; justify-content: center; align-items: center">
                <div style="width: 70px; text-align: center">
                    <i class="ivu-icon ivu-icon-information-circled" style="color: #2d8cf0; font-size: 50px;"></i>
                </div>
                <div style="flex: 1; justify-content: center; align-items: center; padding-left: 20px;">
                    <strong style="font-size: 16px;">请您在新打开的页面上完成充值。</strong>
                    <br>
                    充值完成后，根据您的情况点击下面按钮。
                </div>
            </div>
            <div slot="footer">
                <Button @click="cancel">充值失败</Button>
                <Button type="primary" @click="rechargeSuccess">充值成功</Button>
                <!--<Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>-->
            </div>
        </Modal>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                //商户信息
                merchant: {},
                //默认充值金额
                money: '100',
                //自定义充值金额
                customize_money: '',
                //确认充值modal
                recharge_confirm_modal: false,
                type1: true,
                type2: false,
                configs: {
                    banks: [],
                    pay_type: {}
                },

                columns1: [
                    {
                        title: '开户名',
                        key: 'payee'
                    },
                    {
                        title: '开户行',
                        key: 'bank'
                    },
                    {
                        title: '银行帐号',
                        key: 'account'
                    }
                ]
            }
        },
        methods: {
            recharge() {
                if (this.money == 0 && (this.customize_money <= 0 || !this.customize_money)) {
                    this.$Message.error("充值金额请大于0.01元");
                    return false;
                }
                this.recharge_confirm_modal = true;
            },
            //充值成功
            rechargeSuccess() {
                //重新调用数据来刷新
                this.getMerchantData();
                this.recharge_confirm_modal = false;
            },
            //取消或充值失败
            cancel () {
                this.recharge_confirm_modal = false;
            },
            payType(type) {
                if (type == 1) {
                    this.type1 = true;
                    this.type2 = false;
                } else {
                    this.type1 = false;
                    this.type2 = true;
                }
            },
            //拉取数据
            getMerchantData () {
                this.request("MerchantDetail", {id: this.$store.state.Merchant.merchant.id}, true).then((res) => {
                    if (res.status) {
                        this.merchant = res.data;
                    } else {
                        this.$Message.error('商户信息获取失败!');
                        this.$router.go(-1);
                    }
                }).catch((err) => {
                    this.$Message.error(err);
                })
            },
            //充值银行信息等
            getBankData() {
                this.request("MerchantConfigBank", {}, false).then((res) => {
                    if (res.status) {
                    	this.configs = res.data;
                    }
                }).catch((err) => {
                    this.$Message.error(err);
                })
            }
        },
        mounted() {
            //console.log(this.$store.state.Merchant)
            //服务端获取数据
            this.getMerchantData();
            this.getBankData();

        },
        components: {}
    }
</script>

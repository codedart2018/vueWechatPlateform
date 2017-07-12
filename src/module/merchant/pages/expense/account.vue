<template>
    <div>
        <Row class="bp203" style="">
            <div style="display: flex; justify-content: space-between;">
                <div style="height: 123px; flex: 1; padding: 20px;">
                    <div class="title">账户余额</div>
                    <div class="usage">
                        <span>{{merchant.balance}}<span class="unit">&nbsp;元</span></span>
                    </div>
                </div>
                <div style="height: 123px; flex: 1; padding: 20px;" class="line">
                    <div class="title">累计消费</div>
                    <div class="usage">
                        <span>{{merchant.consume}}<span class="unit">&nbsp;元</span></span>
                    </div>
                </div>
                <div style="height: 123px; flex: 1; padding: 20px;" class="line">
                    <div class="title">账户积分</div>
                    <div class="usage">
                        <span>0<span class="unit">&nbsp;个</span></span>
                    </div>
                </div>
            </div>
            <div class="panel-title">
                <span>线上充值</span>
            </div>
            <div style="height: 130px; margin-top: 20px; display: flex; border-bottom: 1px solid #dedede">
                <div style="flex: 1;">
                    <div
                        style="display: flex; height: 55px; justify-content: center; align-items: center; margin: 10px;">
                        <div style="width: 100px; font-size: 16px;">支付方式</div>
                        <div style="flex: 1;">
                            <img src="../../assets/images/wechat_pay.png" alt="alipay" height="50px"
                                 style="margin-right: 20px; padding: 2px; cursor: pointer" v-bind:class="{ 'type-class': type1, 'border-white': type2 }" @click="payType(1)">
                            <img src="../../assets/images/alipay.png" alt="alipay" height="50px"
                                 style="margin-right: 20px; padding: 2px; cursor: pointer" v-bind:class="{ 'type-class': type2, 'border-white': type1 }" @click="payType(2)">
                        </div>
                    </div>
                    <div
                        style="display: flex; min-height: 50px; justify-content: center; align-items: center; margin: 10px;">
                        <div style="width: 100px; font-size: 16px;">充值金额</div>
                        <div style="flex: 1;">
                            <Radio-group v-model="money">
                                <Radio label="100" style="padding: 5px 10px;">100元</Radio>
                                <Radio label="200" style="padding: 5px 10px;">200元</Radio>
                                <Radio label="500" style="padding: 5px 10px;">500元</Radio>
                                <Radio label="1000" style="padding: 5px 10px;">1000元</Radio>
                                <Radio label="2000" style="padding: 5px 10px;">2000元</Radio>
                                <Radio label="5000" style="padding: 5px 10px;">5000元</Radio>
                                <Radio label="0" style="padding: 5px 10px;"><Input v-model="customize_money"
                                                                                   placeholder="请输入充值金额"
                                                                                   style="width: 120px"></Input>&nbsp;&nbsp;元
                                </Radio>
                            </Radio-group>
                        </div>
                    </div>
                </div>
                <div style="width: 150px; display: flex; justify-content: center; align-items: center">
                    <Button type="info" @click="recharge">立即充值</Button>
                </div>
            </div>
            <div class="panel-title">
                <span>线下汇款</span>
            </div>
            <div>
                <table class="table table-outline">
                    <thead>
                    <tr>
                        <th>开户名</th>
                        <th class="first-td">开户行</th>
                        <th>账号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td rowspan="6" style="vertical-align: middle">代码兔科技有限公司</td>
                        <td class="first-td">中国工商银行永川分行火车站分理处</td>
                        <td>5719 0767 3610 202</td>
                    </tr>
                    <tr>
                        <td>中国建设银行永川分行</td>
                        <td>3300 1616 7810 5995 0652</td>
                    </tr>
                    </tbody>
                </table>
                <div class="well" style="margin-bottom: 64px"><h5>线下汇款处理说明</h5>
                    <p>在转帐或汇款完成后，请您将以下信息，通过邮件发送给 kefu@daimatu.cn 或提供给您的专属销售人员。</p>
                    <p>我们将在 1-2 个工作日内，为您的账号完成充值。</p>
                    <p>汇款信息：单位名称、汇款银行、汇款账户、汇款金额或直接提供“汇款底单”。</p>
                    <p>平台账号信息：账号类型（企业或个人）、平台账号名、商户名称、联系电话。</p>
                    <p>如有疑问，请致电客服 400-0000008。</p>
                    <p>特别提醒：请企业客户线下汇款时、尽可能通过“公司银行账户”汇款，并确保与开具发票公司名称一致，以便您能更方便地开具发票。</p></div>
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

<style scoped>
    .title {
        display: block;
        width: 100%;
        text-align: left;
        font-size: 16px;
        color: #949494;
    }

    .usage {
        display: block;
        width: 100%;
        padding-top: 20px;
        text-align: left;
        font-size: 22px;
        font-weight: 500;
    }

    .usage span {
        color: #65b6f3;
    }

    .usage .unit {
        font-size: 22px;
        color: #949494;
    }

    .line {
        border-left: 1px solid #ecedf1;
    }

    .panel-title {
        margin-top: 20px;
        height: 26px;
        line-height: 26px;
        font-size: 20px;
        font-weight: 500;
        color: #515151;
    }

    .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        border-collapse: collapse;
        border-spacing: 0;
    }

    .table > thead > tr > th {
        padding: 17px 0;
        background-color: #fff;
        font-weight: 400;
        color: #636363;
    }

    .table > thead > tr > th {
        border-bottom: 1px solid #ecedf1;
    }

    .table > thead > tr > th {
        vertical-align: bottom;
    }

    .table-outline thead tr th:first-child {
        text-align: left;
        padding-left: 0;
    }

    .table td.first-td, .table th.first-td {
        padding-left: 40px;
    }

    .table > tbody > tr {
        width: 100%;
    }

    .table-outline tbody tr:first-child td:first-child {
        font-size: 16px;
        color: #747474;
    }

    .table > tbody > tr:first-child td {
        border-top: none;
    }

    .table > tbody > tr > td:first-child {
        padding-left: 40px;
    }

    .table > tbody > tr > td {
        padding: 12px 0;
        border-top: 0;
    }

    table tbody tr:nth-child(odd):first-child td:not(:first-child), table tbody tr:nth-child(odd):not(:first-child) td {
        background-color: #f7f8fa;
    }

    .well {
        min-height: 20px;
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        font-size: 14px;
    }

    h5 {
        padding-bottom: 10px;
        font-size: 18px;
        font-weight: 500;
        color: #444242;
    }

    p {
        margin: 0 0 10px 20px;
    }

    .type-class {
        border: 1px solid #DDDDDD;
    }

    .border-white {
        border: 1px solid #FFFFFF;
    }
</style>

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
                type2: false
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
                        this.merchant = res.data
                    } else {
                        this.$Message.error('商户信息获取失败!');
                        this.$router.go(-1)
                    }
                }).catch((err) => {
                    this.$Message.error(err);
                })
            },
        },
        mounted() {
            console.log(this.$store.state.Merchant)
            //服务端获取数据
            this.getMerchantData()
        },
        components: {}
    }
</script>

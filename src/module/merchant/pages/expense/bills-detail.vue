<style src="../../assets/style/expense/bills-detail.less" lang="less" scoped></style>
<template>
    <div class="container">
        <div class="header">
            <div class="fl"><span>订单状态：</span><span style="color: #090 !important;">已支付</span></div>
            <div class="fr"><span>订单单号：23232323233232323</span></div>
        </div>
        <div class="detail">
            <div class="console-sub-title">
                <div class="pull-left">
                    <h5>
                        <span>订单概要</span>
                    </h5>
                </div>
            </div>
            <table class="table table-bordered ">
                <tbody>
                <tr>
                    <td style="width:50%">
                        <span>
                            <span>订单编号</span>：
                        </span>
                        <span class="value">200969432940416</span>
                    </td>
                    <td style="width:50%">
                        <span>
                            <span>订单类型</span>：
                        </span>
                        <span class="value">续费</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>
                            <span>创建时间</span>：
                        </span>
                        <span class="value">2017-07-07 14:57:47</span>
                    </td>
                    <td>
                        <span>
                            <span>支付时间</span>：
                        </span>
                        <span class="value ">2017-07-07 14:58:30</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <span>
                            <span>支付状态</span>：<span class="text-success">已支付</span> <span class="text-warning">￥136.00</span>
                            <span>= （现金支付：￥136.00 ） ＋ （代金券支付：￥0.00 ） + （储值卡支付：￥0.00 ）</span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>流水编号</th>
                                <th>金额类型</th>
                                <th>扣款费用</th>
                                <th>扣款时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><span>1100463010416</span></td>
                                <td>
                                    <div>
                                        现金支付
                                    </div>
                                </td>
                                <td><span
                                    class="text-warning"><span>￥136.00</span></span>
                                </td>
                                <td style="width: 200px;">
                                    <span>2017-07-07 14:58:30</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-bottom:15px">
            <div class="console-box-border" style="margin-top:-1px">
                <div class="row-padding col-padding">
                    <div class="text-right"><span>原价</span>
                        ：<span class="text-warning"><span bo-text="vm.order.originalAmount|moneyFilter">￥136.00</span></span>
                    </div>
                </div>
                <div class="row-padding col-padding">
                    <div class="text-right"><span>应付金额</span>
                        ：<span class="text-warning"><span>￥136.00</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end">
            <Button type="default" @click="goBack">
                <Icon type="chevron-left"></Icon>
                返回
            </Button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
        components: {}
    }
</script>

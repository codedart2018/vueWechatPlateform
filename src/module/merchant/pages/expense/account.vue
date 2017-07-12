<template>
    <div>
        <Row class="bp203" style="">
            <div style="display: flex; justify-content: space-between;">
                <div style="height: 123px; flex: 1; padding: 20px;">
                    <div class="title">账户余额</div>
                    <div class="usage">
                        <span>0.00<span class="unit">&nbsp;元</span></span>
                    </div>
                </div>
                <div style="height: 123px; flex: 1; padding: 20px;" class="line">
                    <div class="title">累计消费</div>
                    <div class="usage">
                        <span>0.00<span class="unit">&nbsp;元</span></span>
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
                            <img src="../../assets/images/alipay.png" alt="alipay" height="50px"
                                 style="border: 1px solid #DDDDDD; margin-right: 20px; padding: 2px">
                            <img src="../../assets/images/wechat_pay.png" alt="alipay" height="50px"
                                 style="border: 1px solid #FFFFFF; margin-right: 20px; padding: 2px">
                        </div>
                    </div>
                    <div
                        style="display: flex; min-height: 50px; justify-content: center; align-items: center; margin: 10px;">
                        <div style="width: 100px; font-size: 16px;">充值金额</div>
                        <div style="flex: 1;">
                            <Radio-group v-model="animal">
                                <Radio label="100" style="padding: 5px 10px;">100元</Radio>
                                <Radio label="200" style="padding: 5px 10px;">200元</Radio>
                                <Radio label="500" style="padding: 5px 10px;">500元</Radio>
                                <Radio label="1000" style="padding: 5px 10px;">1000元</Radio>
                                <Radio label="2000" style="padding: 5px 10px;">2000元</Radio>
                                <Radio label="5000" style="padding: 5px 10px;">5000元</Radio>
                                <Radio label="0" style="padding: 5px 10px;"><Input v-model="value" placeholder="请输入充值金额"
                                                                                   style="width: 120px"></Input>&nbsp;&nbsp;元
                                </Radio>
                            </Radio-group>
                        </div>
                    </div>
                </div>
                <div style="width: 150px; display: flex; justify-content: center; align-items: center">
                    <Button type="info">立即充值</Button>
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
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
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
</style>

<script>
    export default{
        data(){
            return {
                msg: 'hello vue',
                animal: '100'
            }
        },
        components: {}
    }
</script>

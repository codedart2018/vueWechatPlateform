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
            <div style="height: 130px; margin-top: 20px; display: flex;">
                <div style="flex: 1;">
                    <div style="display: flex; height: 55px; justify-content: center; align-items: center; margin: 10px;">
                        <div style="width: 100px; font-size: 16px;">支付方式</div>
                        <div style="flex: 1;">
                            <img src="../../assets/images/alipay.png" alt="alipay" height="50px" style="border: 1px solid #DDDDDD; margin-right: 20px; padding: 2px">
                            <img src="../../assets/images/wechat_pay.png" alt="alipay" height="50px" style="border: 1px solid #FFFFFF; margin-right: 20px; padding: 2px">
                        </div>
                    </div>
                    <div style="display: flex; min-height: 50px; justify-content: center; align-items: center; margin: 10px;">
                        <div style="width: 100px; font-size: 16px;">充值金额</div>
                        <div style="flex: 1;">
                            <Radio-group v-model="animal">
                                <Radio label="100" style="padding: 5px 10px;">100元</Radio>
                                <Radio label="200" style="padding: 5px 10px;">200元</Radio>
                                <Radio label="500" style="padding: 5px 10px;">500元</Radio>
                                <Radio label="1000" style="padding: 5px 10px;">1000元</Radio>
                                <Radio label="2000" style="padding: 5px 10px;">2000元</Radio>
                                <Radio label="5000" style="padding: 5px 10px;">5000元</Radio>
                                <Radio label="0" style="padding: 5px 10px;"><Input v-model="value" placeholder="请输入充值金额" style="width: 120px"></Input>&nbsp;&nbsp;元</Radio>
                            </Radio-group>
                        </div>
                    </div>
                </div>
                <div style="width: 150px; display: flex; justify-content: center; align-items: center">
                    <Button type="info">立即充值</Button>
                </div>
            </div>
        </Row>
    </div>
</template>

<style>
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
        height: 26px;
        line-height: 26px;
        font-size: 20px;
        font-weight: 500;
        color: #515151;
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

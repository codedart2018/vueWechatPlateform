<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div>
        <!--第一屏 欢迎光临-->
        <div class="welcome">
            <div class="sub-box">
                <div class="avatar">
                    <img src="https://avatars.githubusercontent.com/u/12706830?v=3" alt="头像">
                </div>
                <div class="info">
                    <div style="font-size: 16px; font-weight: bold;"><span>你好，百德商贸有限公司 欢迎你回来！</span>
                    </div>
                    <div style="font-size: 16px; font-weight: bold; color: #e74b3c;">
                        myxingke@126.com
                    </div>
                    <div>
                        已绑定手机：150****2861
                    </div>
                </div>
                <div class="auth">
                    <div>商户认证：已认证</div>
                    <div>会员等级：普通会员</div>
                    <div>商户有期期：2019-10-20</div>
                    <div>您可通过安全设置提高</div>
                </div>

            </div>
        </div>
        <!--第三屏 财务信息-->
        <div class="finance">
            <div class="left-box">
                <div class="title">
                    财务信息
                </div>
                <div style="flex: 1;">
                    <div class="pre">
                        预付款金额：
                    </div>
                    <div class="row">
                        <div class="money">
                            100.00 元
                        </div>
                        <div class="recharge">
                            帐户充值
                        </div>
                        <div class="list">
                            <div style="border-right: 1px solid #dedede">
                                财务明细
                            </div>
                            <div style="border-right: 1px solid #dedede">
                                索取发票
                            </div>
                            <div>
                                收款提现
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-left: 20px; border: 1px solid #dedede; flex: 1; display: flex; justify-content: space-around; padding: 10px; flex-direction: row">
                <div style="border-right: 1px dotted #dedede; display: flex; flex-direction: column; align-items: center; width: 50%">
                    <i class="iconfont icon-money" style="font-size: 60px; color: #f15a4a;"></i>
                    <div style="font-size: 14px; font-weight: 600; padding-top: 5px;">消费：<span style="color: #ED3C4C;">100</span> 元</div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; width: 50%">
                    <i class="iconfont icon-jifen" style="font-size: 60px; color: #ea9518;"></i>
                    <div style="font-size: 14px; font-weight: 600; padding-top: 5px;">积分：85</div>
                </div>
            </div>
        </div>

        <!--快捷图标-->
        <div class="express">
            <div class="icon">
                <router-link to="/public/list" style="color: #657180;">
                    <div class="hover">
                        <i class="iconfont icon-gongzhonghao" style="font-size: 60px;"></i>
                        <h3>公众号</h3>
                    </div>
                </router-link>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-jiaocheng"></i>
                    <h3>运营教程</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-gongdan"></i>
                    <h3>工单管理</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-caiwu"></i>
                    <h3>财务中心</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-shezhi"></i>
                    <h3>商户设置</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-icon"></i>
                    <h3>操作日志</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-gonggao"></i>
                    <h3>公告</h3>
                </div>
            </div>
            <div class="icon">
                <div class="hover">
                    <i class="iconfont icon-gerenzhongxin"></i>
                    <h3>个人中心</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div class="fixedDiv">
        <div class="header box-shadow">
            <h1 class="logo"><a href="/">班级优化大师-抓住孩子的每一课闪光点</a></h1>
            <div class="top-panel">
                <span class="divide-icon pull-left">|</span>
                <a class="user-info" href="#/user">
                    <img
                        src="https://o1aa0tynl.qnssl.com/3ce66694636c4db500e0607cec87791e010fa3d8c2d5c609832af3979bb5e768?imageMogr2/crop/!87.99999999999999x88a5.000000000000013a0/thumbnail/120x120">
                    <span class="simple-text user-name">baide</span>
                </a>
                <span class="divide-icon pull-left">|</span>
                <a href="/app/logout" class="logout-btn">退出</a>
                <div class="clearfix"></div>
            </div>
            <div class="feedback-panel">
                <i class="message">
                    <div class="notification"></div>
                </i>
            </div>
            <div class="nav">
                <ul class="list-inline">
                    <li><a href="#/myclass" class="active">财务</a></li>
                    <li><a href="#/message">工单</a></li>
                    <li><a href="#/score">帮助</a></li>
                </ul>
            </div>
        </div>

        <div class="contentDiv">
            <div class="content">
                <div class="box">
                    <div style="margin: 30px 20px 20px; display: flex; flex-direction: row; height: auto">
                        <div style="width: 240px; height: auto;">
                            <div style="height: 70px; font-size: 24px; line-height: 70px; padding-left: 20px; background: #0099e8; color: #FFFFFF">管理中心</div>
                            <div style="border: 1px solid #dedede; overflow-x: hidden; overflow-y:hidden;">
                                <Menu width="auto" style="position: static;" accordion>
                                    <Submenu name="1">
                                        <template slot="title">
                                            <Icon type="ios-paper"></Icon>
                                            公众号
                                        </template>
                                        <Menu-item name="1-1"> <router-link to="/edit" style="color: #657180;">文章管理</router-link></Menu-item>
                                        <Menu-item name="1-2"> <router-link to="/add" style="color: #657180;">评论管理</router-link></Menu-item>
                                        <Menu-item name="1-3">举报管理</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            财务中心
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            短信管理
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            消息工单
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="3">
                                        <template slot="title">
                                            <Icon type="stats-bars"></Icon>
                                            商户管理
                                        </template>
                                        <Menu-group title="使用">
                                            <Menu-item name="3-1">新增和启动</Menu-item>
                                            <Menu-item name="3-2">活跃分析</Menu-item>
                                            <Menu-item name="3-3">时段分析</Menu-item>
                                        </Menu-group>
                                        <Menu-group title="留存">
                                            <Menu-item name="3-4">用户留存</Menu-item>
                                            <Menu-item name="3-5">流失用户</Menu-item>
                                        </Menu-group>
                                    </Submenu>
                                    <Submenu name="4">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            个人设置
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                    <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-people"></Icon>
                                            帮助中心
                                        </template>
                                        <Menu-item name="2-1">新增用户</Menu-item>
                                        <Menu-item name="2-2">活跃用户</Menu-item>
                                    </Submenu>
                                </Menu>

                            </div>
                        </div>

                        <div style="flex: 1; height: auto; margin-left: 20px;">
                            <!--第一屏 欢迎光临-->
                            <div style="width: 100%; height: 135px; border: 1px solid #dedede;">
                                <div style="height: 130px; display: flex; flex-direction: row;">
                                    <div
                                        style="width: 140px; height: 100%; display: flex; justify-content: center; align-items: center">
                                        <img src="https://avatars.githubusercontent.com/u/12706830?v=3" alt="头像"
                                             style="border: 1px solid #dedede; display: block; width: 90px; height: 90px; border-radius: 50%">
                                    </div>
                                    <div
                                        style="width: 500px; margin-left: 20px; display: flex; flex-direction: column; justify-content: space-around; margin-top: 15px; margin-bottom: 15px;">
                                        <div style="font-size: 16px; font-weight: bold;"><span>你好，百德商贸有限公司 欢迎你回来！</span>
                                        </div>
                                        <div style="font-size: 16px; font-weight: bold; color: #e74b3c;">
                                            myxingke@126.com
                                        </div>
                                        <div>
                                            已绑定手机：150****2861
                                        </div>
                                    </div>
                                    <div
                                        style="flex: 1; display: flex; flex-direction: column; justify-content: space-around; margin-top: 10px; margin-bottom: 10px;">
                                        <div>商户认证：已认证</div>
                                        <div>会员等级：普通会员</div>
                                        <div>商户有期期：2019-10-20</div>
                                        <div>您可通过安全设置提高</div>
                                    </div>

                                </div>
                            </div>
                            <!--第三屏 财务信息-->
                            <div
                                style="width: 100%; height: 150px; display: flex; flex-direction: row;  margin-top: 20px;">
                                <div
                                    style="width: 600px; border: 1px solid #dedede; flex-direction: column; display: flex ">
                                    <div
                                        style="width: 100%; height: 45px; background: #fafafa; border-bottom: 1px dashed #dedede; line-height: 45px; font-size: 18px; font-weight: bold; font-family: '宋体',Arial; padding-left: 20px;">
                                        财务信息
                                    </div>
                                    <div style="flex: 1;">
                                        <div
                                            style="height: 50px; padding-left: 25px; line-height: 50px; font-size: 15px;">
                                            预付款金额：
                                        </div>
                                        <div style="display: flex; flex-direction: row; flex: 1; padding: 0 0 0 20px;">
                                            <div
                                                style="color: #ed3c4c; font-size: 20px; font-weight: bold; height: 34px; line-height: 34px;">
                                                100.00 元
                                            </div>
                                            <div
                                                style="color: #FFFFFF; background: #ed3c4c; width: 100px; text-align: center; height: 34px; line-height: 34px; margin-left: 30px; font-size: 14px;">
                                                帐户充值
                                            </div>
                                            <div
                                                style="flex: 1px; display: flex; justify-content: center; align-items: center">
                                                <div
                                                    style="width: 90px; text-align: center; height: 16px; line-height: 16px; border-right: 1px solid #dedede">
                                                    财务明细
                                                </div>
                                                <div
                                                    style="width: 90px; text-align: center; height: 16px; line-height: 16px; border-right: 1px solid #dedede">
                                                    索取发票
                                                </div>
                                                <div
                                                    style="width: 90px; text-align: center; height: 16px; line-height: 16px;">
                                                    收款提现
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="margin-left: 20px; border: 1px solid #dedede; flex: 1;">
                                    <img src="../../assets/images/1.jpg" alt="">
                                </div>
                            </div>

                            <div style="margin-top: 20px; display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap ">
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-gongzhonghao" style="font-size: 60px;"></i>
                                        <h3>公众号</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-jiaocheng"></i>
                                        <h3>运营教程</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-gongdan"></i>
                                        <h3>工单管理</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-caiwu"></i>
                                        <h3>财务中心</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer; margin-top: 20px;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-shezhi"></i>
                                        <h3>商户设置</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer; margin-top: 20px;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-icon"></i>
                                        <h3>操作日志</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer; margin-top: 20px;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-gonggao"></i>
                                        <h3>公告</h3>
                                    </div>
                                </div>
                                <div style="width: 222px; height: 130px; border-radius: 10px; background: #f5f7fa; cursor: pointer; margin-top: 20px;">
                                    <div class="HomeHover">
                                        <i class="iconfont icon-gerenzhongxin"></i>
                                        <h3>个人中心</h3>
                                    </div>
                                </div>
                            </div>

                            <router-view></router-view>

                        </div>


                    </div>


                </div>

            </div>
        </div>
    </div>

</template>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        height: 100%
    }

    .UCell {
        padding-top: 10px;
        padding-left: 20px;
        display: table-cell;
        vertical-align: middle;
        list-style: none;
    }

    .UCell li {
        width: 425px;
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .UCell li a {
        color: #666666;
    }

    .UCell li .UTime {
        padding-right: 10px;
        font-size: 12px;
    }

    .undo-item {
        height: 58px;
        line-height: 58px;
        margin-bottom: 4px;
        display: block;
        text-decoration: none;
    }

    .item-text {
        padding-left: 36px;
        color: #333;
        display: inline-block;
        vertical-align: top;
    }

    .item-number {
        color: #00c1de;
        font-size: 18px;
        margin-left: 16px;
    }

    TABLE.ListProduct {
        border-left: 1px solid #dedede;
        border-right: 1px solid #dedede;
        border-top: 1px solid #dedede;
        MARGIN-TOP: 5px;
        WIDTH: 100%;
        MARGIN-BOTTOM: 5px;
        _border-collapse: collapse;

    }

    TABLE.ListProduct THEAD TH {
        PADDING-BOTTOM: 5px;
        BACKGROUND-COLOR: #F4F5F9;
        PADDING-LEFT: 5px;
        PADDING-RIGHT: 5px;
        COLOR: #666;
        FONT-SIZE: 14px;
        FONT-WEIGHT: normal;
        BORDER-RIGHT: #ddd 1px solid;
        PADDING-TOP: 5px;
        color: #222;
        font-weight: bold
    }

    TABLE.ListProduct TBODY TD {
        border-bottom: 1px solid #dedede;
        PADDING-BOTTOM: 10px;
        PADDING-LEFT: 5px;
        PADDING-RIGHT: 5px;
        BORDER-RIGHT: #eee 1px solid;
        PADDING-TOP: 10px;
        font-size: 12px;
        _empty-cells: show;
        word-break: break-all;
    }

    TABLE.ListProduct TBODY TR:nth-child(2n+1) {
        background-color: #FCFCFC;
    }

    TABLE.ListProduct TBODY TR:hover {
        background-color: #F1FCEA;
    }

    TABLE.ListProduct TBODY TD p {
        PADDING: 0;
        font-size: 12px;
        _empty-cells: show;
        word-break: break-all;
    }

    TABLE.ListProduct Tfoot TD {
        BORDER-BOTTOM: #eee 1px solid;
        PADDING-BOTTOM: 10px;
        PADDING-LEFT: 5px;
        PADDING-RIGHT: 5px;
        BORDER-RIGHT: #eee 1px solid;
        PADDING-TOP: 10px;
        background-color: #f9f9f9;
        font-size: 12px;
        _empty-cells: show;
        word-break: break-all;
    }

    TABLE.ListProduct THEAD TH.norightborder {
        BORDER-RIGHT: 0;
    }

    TABLE.ListProduct TBODY TD.norightborder {
        BORDER-RIGHT: 0;
    }

    .answer_text img {
        margin-right: 5px;
        float: left;
    }


    .HomeHover i {
        width: 100%;
        height: 90px;
        line-height: 90px;
        font-size: 50px;
        display: block;
        text-align: center;
    }

    .HomeHover h3 {
        font-size: 16px;
        line-height: 100%;
        text-align: center;
    }
</style>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

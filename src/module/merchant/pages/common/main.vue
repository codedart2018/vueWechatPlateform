<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
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
                    <div style="margin: 30px 20px 20px; display: flex; flex-direction: row; height: 700px;">
                        <div style="width: 800px; display: flex; flex-direction: column;">
                            <div style="width: 100%; height: 200px; border: 1px solid #dedede;">
                                <div
                                    style="height: 130px; border-bottom: 1px dotted #dedede; display: flex; flex-direction: row;">
                                    <div
                                        style="width: 140px; height: 100%; display: flex; justify-content: center; align-items: center">
                                        <img src="https://avatars.githubusercontent.com/u/12706830?v=3" alt="头像"
                                             style="border: 1px solid #dedede; display: block; width: 90px; height: 90px; border-radius: 50%">
                                    </div>
                                    <div
                                        style="width: 400px; margin-left: 20px; display: flex; flex-direction: column; justify-content: space-around; margin-top: 15px; margin-bottom: 15px;">
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
                                <div></div>
                            </div>
                            <!--第一屏 待办事项-->
                            <div
                                style="width: 100%; height: 140px; display: flex; flex-direction: column;  margin-top: 20px; border: 1px solid #dedede">
                                <div
                                    style="width: 100%; height: 45px; background: #fafafa; border-bottom: 1px dashed #dedede; line-height: 45px; font-size: 18px; font-weight: bold; font-family: '宋体',Arial; padding-left: 20px;">
                                    待办事项
                                </div>
                                <div
                                    style="display: flex; flex-direction: row; justify-content: space-around; padding: 20px; flex: 1">
                                    <div style="background: #fafafa; width: 100%; height: 100%; display: block">
                                        <a href="" class="undo-item">
                                            <span class="item-text">未读消息</span>
                                            <span class="item-number">2</span>
                                        </a>
                                    </div>
                                    <div
                                        style="background: #fafafa; width: 100%; height: 100%; display: block; margin-left: 20px">
                                        <a href="" class="undo-item">
                                            <span class="item-text">工单</span>
                                            <span class="item-number">2</span>
                                        </a>
                                    </div>
                                    <div
                                        style="background: #fafafa; width: 100%; height: 100%; display: block; margin-left: 20px;">
                                        <a href="" class="undo-item">
                                            <span class="item-text">续费</span>
                                            <span class="item-number">2</span>
                                        </a>
                                    </div>
                                    <div
                                        style="background: #fafafa; width: 100%; height: 100%; display: block; margin-left: 20px;">
                                        <a href="" class="undo-item">
                                            <span class="item-text">未支付订单</span>
                                            <span class="item-number">2</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!--第二屏 财务-->
                            <div
                                style="width: 100%; height: 150px; display: flex; flex-direction: row;  margin-top: 20px;">
                                <div
                                    style="width: 570px; border: 1px solid #dedede; flex-direction: column; display: flex ">
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

                            <!--第三屏 微信公众号列表-->

                            <div style="width: 100%; display: flex; flex-direction: column;  margin-top: 20px;">
                                <div style="height: 100%">
                                    <table class="ListProduct" border="0" cellspacing="0" cellpadding="0" width="100%">
                                        <thead>
                                        <tr>
                                            <th>公众号名称</th>
                                            <th>创建时间</th>
                                            <th style="border-right: none">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td align="center">
                                                <p>新注册公众号</p>
                                            </td>
                                            <td>
                                                <p>创建时间:2017-05-20</p>
                                            </td>
                                            <td class="norightborder">　

                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <p>新注册公众号</p>
                                            </td>
                                            <td>
                                                <p>创建时间:2017-05-20</p>
                                            </td>
                                            <td class="norightborder">　

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div style="flex: 1; margin-left: 20px;">
                            <div
                                style="border: 1px solid #dedede; height: 315px; display: flex; flex-direction: column">
                                <div
                                    style="height: 40px; line-height: 40px; border-bottom: 1px dashed #dedede; background: #fafafa; padding-left: 20px; font-size: 18px; font-weight: bold; font-family: '宋体',Arial;">
                                    最新公告
                                </div>
                                <div style="width: 100%; height: 100%; overflow: hidden">
                                    <ul class="UCell">
                                        <li><a href="" target="_blank"><span class="UTime">[2017-05-17]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2017-05-18]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2016-07-12]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2016-03-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-07-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                style="border: 1px solid #dedede; height: 315px; display: flex; flex-direction: column;  margin-top: 20px;">
                                <div
                                    style="height: 40px; line-height: 40px; border-bottom: 1px dashed #dedede; background: #fafafa; padding-left: 20px; font-size: 18px; font-weight: bold; font-family: '宋体',Arial;">
                                    常见问题
                                </div>
                                <div style="width: 100%; height: 100%; overflow: hidden">
                                    <ul class="UCell">
                                        <li><a href="" target="_blank"><span class="UTime">[2017-05-17]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2017-05-18]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2016-07-12]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2016-03-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-07-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                        <li><a href="" target="_blank"><span class="UTime">[2014-05-01]</span>代码兔代码兔代码兔代码兔代码兔代码兔代码兔代码兔</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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

    TABLE.ListProduct .select {
        width: 30px;
    }

    TABLE.ListProduct .keywords {
        width: 150px;
    }

    TABLE.ListProduct .answer {
        width: 375px;
    }

    TABLE.ListProduct .answer_text {
        width: 360px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 16px
    }

    .answer_text img {
        margin-right: 5px;
        float: left;
    }

    TABLE.ListProduct .category {
        width: 70px;
    }

    TABLE.ListProduct .time {
        width: 70px;
    }

    TABLE.ListProduct .edit {
        width: 120px;
    }
</style>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

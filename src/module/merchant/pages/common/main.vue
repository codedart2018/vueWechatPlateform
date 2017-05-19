<template>
    <div>
        <div class="header box-shadow">
            <h1 class="logo"><a href="/">班级优化大师-抓住孩子的每一课闪光点</a></h1>
            <div class="top-panel">
                <span class="divide-icon pull-left">|</span>
                <a class="user-info" href="#/user">
                <img src="https://o1aa0tynl.qnssl.com/3ce66694636c4db500e0607cec87791e010fa3d8c2d5c609832af3979bb5e768?imageMogr2/crop/!87.99999999999999x88a5.000000000000013a0/thumbnail/120x120">
                    <span class="simple-text user-name">baide</span>
                </a>
                <span class="divide-icon pull-left">|</span>
                <a href="/app/logout" class="logout-btn">退出</a>
                <div class="clearfix"></div>
            </div>
            <div id="feedback-panel"><i id="msg-center">
                <div id="msg-center-notification"></div>
            </i></div>
            <div class="nav">
                <ul class="list-inline">
                    <li><a href="#/myclass" class="active">财务</a></li>
                    <li><a href="#/message">工单</a></li>
                    <li><a href="#/score">帮助</a></li>
                </ul>
            </div>
        </div>
        <aside>
            <div class="center-box">

            </div>
        </aside>
    </div>
</template>

<style>
    .center-box {
        height: 1000px;
        width: 1000px;
        border: 1px solid #dedede;
    }
    .header {
        background: #0099e8;
        min-width: 1200px;
        height: 60px;
    }

    .box-shadow {
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.06);
    }
    .header .logo {
        float: left;
        width: 480px;
        padding: 0;
        margin: 0;
        margin-left: 20px;
    }
    .header .logo a {
        display: block;
        height: 60px;
        background: url(http://care.seewo.com/statics/487ba2daac6d82de546fb6c62dc9baf5.png) no-repeat 0;
        text-indent: -10000px;
    }
    .header .top-panel {
        float: right;
        height: 60px;
        line-height: 60px;
        padding-left: 7px;
        margin-right: 22px;
    }
    .header .divide-icon.pull-left {
        float: left;
    }
    .header .top-panel .user-info {
        float: left;
        font-size: 14px;
        color: #fff;
    }
    .header .top-panel .user-info img {
        width: 32px;
        height: 32px;
        border-radius: 20px;
        vertical-align: middle;
        margin-right: 3px;
    }
    .header .top-panel .user-name {
        margin-left: 2px;
    }
    .header .top-panel .logout-btn {
        float: left;
        width: 55px;
        background: url(../../assets/images/out.png) no-repeat 6px 22px;
        margin-right: 30px;
        text-align: right;
        color: #fff;
    }
    .header .divide-icon {
        color: #8cc7e9;
        font-size: 14px;
        margin-left: 10px;
        margin-right: 10px;
    }
    a {
        color: #2db7f5;
        background: transparent;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color .3s ease;
    }
    #feedback-panel {
        float: right;
        margin: 0 10px;
        margin-top: 18px;
        font-size: 16px;
    }
    #msg-center {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-image: url(../../assets/images/message.png);
        cursor: pointer;
        margin: 0 15px;
        position: relative;
        vertical-align: middle;
    }
    #msg-center #msg-center-notification {
        position: absolute;
        top: -4px;
        right: 0;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #ef5b56;
    }
    .header .nav {
        margin-left: 20px;
        float: right;
    }
    .list-inline li {
        display: inline-block;
        padding-left: 5px;
        padding-right: 5px;
    }
    .header .nav a.active {
        color: #fff;
        font-size: 18px;
    }
    .header .nav a {
        display: inline-block;
        line-height: 60px;
        padding: 0 15px;
        font-size: 16px;
        color: #c0e8fd;
    }
</style>

<script>

    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>

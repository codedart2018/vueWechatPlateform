<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<template>
    <div class="header box-shadow">
        <h1 class="logo"><a href="/">代码兔微信公众平台欢迎你</a></h1>
        <div class="top-panel">
            <span class="divide-icon pull-left">|</span>
            <a class="user-info" href="#/user">
                <img
                    src="https://o1aa0tynl.qnssl.com/3ce66694636c4db500e0607cec87791e010fa3d8c2d5c609832af3979bb5e768?imageMogr2/crop/!87.99999999999999x88a5.000000000000013a0/thumbnail/120x120">
                <span class="simple-text user-name">baide</span>
            </a>
            <span class="divide-icon pull-left">|</span>
            <a href="javascript: void(0);" class="logout-btn" @click="modal = true">退出</a>
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

        <!--modal 提示-->
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>温馨提示</span>
            </p>
            <div style="text-align:center">
                <p>您确认要退出?退出后将无法操作哦!</p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="modal_loading" @click="del">确认退出</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                info: '',
                modal: false,
                modal_loading: false,
            }
        },
        methods: {
        	//退出方法
            signOut() {
                alert(333)
            },
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal = false;
                    //处理一系列数据
                    window.localStorage.removeItem('merchantLogin')
                    window.localStorage.removeItem('merchantToken')
                    this.$Message.success('退出成功');
                    this.$router.push({path: '/login'})
                }, 1500);
            }
        },
        components: {

        },
        mounted() {

        }
    }
</script>


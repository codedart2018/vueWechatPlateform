<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<template>
    <div class="header box-shadow">
        <h1 class="logo"><a href="/">代码兔微信公众平台欢迎你</a></h1>
        <div class="top-panel">
            <span class="divide-icon pull-left">|</span>
            <router-link to="/setting/personal" class="user-info">
                <img src="https://avatars.githubusercontent.com/u/12706830?v=3">
                <span class="simple-text user-name">baide</span>
            </router-link>
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
                <Button type="success" size="large" long :loading="modalLoading" @click="signOut">确认退出</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    ///你给我每一次，都是新鲜！我对你的依恋更加明显。就在我们每次亲吻的瞬间，我就在也无法离开你的身边！
    import {mapActions} from 'vuex'
    export default{
        data () {
            return {
                info: '',
                modal: false,
                modalLoading: false,
                merchantInfo: window.localStorage.getItem("merchantInfo"),
                merchantToken: window.localStorage.getItem("merchantToken")
            }
        },
        methods: {
            ...mapActions(['merchantOut']),
            //退出方法
            signOut () {
                this.modalLoading = true;
                setTimeout(() => {
                    this.modalLoading = false;
                    this.modal = false;
                    //处理一系列数据
                    this.merchantOut(this)
                    this.$Message.success('退出成功');
                    this.$router.push({path: '/login'})
                }, 1000);
            }
        },
        components: {},
        mounted() {
        },
        watch: {

        },
    }
</script>


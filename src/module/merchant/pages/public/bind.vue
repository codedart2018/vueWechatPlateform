<style src="../../assets/style/public/bind.less" lang="less" scoped></style>
<template>
    <Row class="bp203">
        <div class="auth-body">
            <div class="header">
                <div class="title" style="">
                    一键授权绑定
                    <span class="small-title">一键绑定后无需再手工绑定</span>
                </div>
            </div>
            <div class="content">
                <p>1、为了更好的服务目前我们只支持已认证的订阅号和已认证的服务号接入。暂不支持未认证的公众号接入，谢谢理解</p>
                <p>2、登陆微信公众平台，链接地址：<a class="red" href="https://mp.weixin.qq.com/" target="_blank">https://mp.weixin.qq.com/</a></p>
                <p>3、在<span class="red">【开发&gt;基本配置】</span>关闭服务器配置选项和取消其他同类第三方平台授权,以兔服务冲突</p>
                <p>4、请点击下方“<span class="red">一键授权绑定</span>”，<span class="red">扫描</span>显示的二维码</p>
                <p>5、关注您自己的微信公众号并发送“<span class="red">绑定平台</span>”四个字</p>
                <p>6、收到&nbsp;<span class="red">恭喜您已经成功绑定到无限智能的代码兔微信公众平台</span>&nbsp;说明绑定成功</p>
                <p>7、<span class="red">如果没有弹出打开新页面，请检查是否被拦截了</span></p>
            </div>
            <div class="footer">
                <div class="confirm">
                    <i-switch v-model="isSwitch" @on-change="change">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                    <span style="padding-left: 10px;">我已阅读上述绑定说明</span>
                </div>
                <div class="button">
                    <Button size="large" style="width: 200px;" :loading="loading" @click="bind">一键绑定授权</Button>
                </div>
            </div>

        </div>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认绑定</span>
            </p>
            <div style="text-align:center">
                <p>如果授权绑定提成成功后将跳转公众号列表去!</p>
                <p>如果未来授权成功,请联系我们!</p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="modalLoading" @click="confirm">确认授权成功</Button>
            </div>
        </Modal>
    </Row>
</template>

<script>

    export default{
        data () {
            return {
                isSwitch: false,
                type: 'default',
                loading: false,
                modal: false,
                modalLoading: false,
            }
        },
        methods: {
            change (status) {
            	if(status)  {
            		this.type = 'primary';
                } else {
            		this.type = 'default';
                }
            },
            bind() {
            	if(!this.isSwitch) {
                    this.$Message.info('请先同意授权说明');
                    return false;
                }
                window.open(Api.auth_call_back + "/merchants/public_signal/bind");
                this.$Message.success("请注意是否有打开新的授权页面");
                this.loading = true;
                this.modal = true;
                setTimeout(() => {
                    this.loading = false
                }, 1000);
            },
            confirm() {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modalLoading = false;
                    this.modal = false;
                    this.$router.push({path: '/public/list'})
                }, 1000);
            }
        },
        components:{

        }
    }
</script>

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
                <p>1、登陆微信公众平台，链接地址：<a class="blue" href="https://mp.weixin.qq.com/" target="_blank" style="color: #999999;: #dedede">https://mp.weixin.qq.com/</a></p>
                <p>2、在<span class="red">【开发&gt;基本配置】</span>建议取消其他同类第三方授权</p>
                <p>3、请点击下方“<span class="red">一键授权绑定</span>”，<span class="red">扫描</span>显示的二维码</p>
                <p>4、关注您自己的微信公众号并发送“<span class="red">绑定平台</span>”四个字</p>
                <p>5、收到&nbsp;<span class="red" style="font-size:12px;">恭喜您已经成功绑定到无限智能的代码兔微信公众平台</span>&nbsp;说明绑定成功</p>
                <p>6、<span class="red" style="font-size:12px;">如果没有弹出打开新页面，请检查是否被拦截了</span></p>
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
                    <Button :type="type" size="large" style="width: 200px;" @click="bind">一键绑定授权</Button>
                </div>
            </div>

        </div>
    </Row>
</template>

<script>

    export default{
        data () {
            return {
                isSwitch: false,
                type: 'default'
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
                this.request('MerchantPublicBind', {}, '跳转中...').then((res) => {
                    if (res.status) {
                        window.open(res.data.url);
                        this.$Message.success("请在打开的新页面中授权");
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            }
        },
        components:{

        }
    }
</script>

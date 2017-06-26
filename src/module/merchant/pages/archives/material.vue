<template>
    <div>
        <Alert show-icon>
            温馨提示
            <template slot="desc">本页面所有素材都不是保存在本服务器上的，所有素材元素信息均是通过接口获取及上传修改的。也就是本平台服务器不会保存您任何的素材信息，每次都是同步更新获取您方公众号的素材数据。</template>
        </Alert>
        <Card dis-hover>
            素材管理
        </Card>
    </div>
</template>

<style>


</style>

<script>
    //todo 未认证订阅号及未认证服务号是没有素材管理接口权限的
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>

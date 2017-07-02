<!--通用检测组件-->
<template>
    <div>
    </div>
</template>

<script>

    export default{
        beforeMount(){
        	console.log(2333)
        },
        data(){
            return{
                platform: ''
            }
        },
        components:{

        },
        mounted() {
            //判断检查是否有平台号
            this.platform = window.localStorage.getItem('platformNumber')
            if(!this.platform) {
                //this.$Message.error('公众号平台切换失败!');
                //this.$router.push({ path: '/'})
            }
        }
    }
</script>

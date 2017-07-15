<template>
    <div>
        <div>微信天记录详情</div>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){
            return {
                //列表数据
                list: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //当前页码
                pageNumber: 1,
            }
        },
        methods: {
            //获取数据
            getData (params) {
                if (!params) params = {page: 1, mch_id: this.$store.state.Merchant.merchant.id, platform_id: this.$store.state.Merchant.platform.id}
                this.request('MerchantWxMessageListView', params, true).then((res) => {
                    if (res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                    } else {
                        //列表数据
                        this.list = []
                        //总页数
                        this.total = 0
                        //每页多少条数据
                        this.pageSize = 0
                    }
                })
            },
        },
        mounted() {
        	//拉取数据
            this.getData()
        },
        components: {}
    }
</script>

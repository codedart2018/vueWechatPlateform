<!--粉丝-->
<template>
    <div>
        <Row class="mb-15">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
        </Row>
    </div>
</template>
<script>
    import tableRow from './fans-table.vue'
    export default {
        components: { tableRow },
        data () {
            return {
                //列表数据
                columns: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(tableRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '呢称',
                        key: 'nickname'
                    },
                    {
                        title: '头像',
                        render: (h, params) => {
                            return h('img', {
                                // 正常的 HTML 特性
                                attrs: {
                                    src: params.row.headimgurl + '64',
                                    title: params.row.nickname
                                },
                                style: {
                                	marginTop: "5px",
                                    width: "38px",
                                    height: "38px"
                                },
                            })
                        }
                    },
                    {
                        title: '性别',
                        render: (h, params) => {
                        	if(params.row.sex == 1) {
                                return h('span', '男')
                            } else if(params.row.sex == 2) {
                                return h('span', '女')
                            } else {
                                return h('span', '未知')
                            }
                        }
                    },
                    {
                        title: '分组',
                        key: 'address'
                    },
                    {
                        title: '标签',
                        key: 'address'
                    },
                    {
                        title: '关注时间',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',this.$formatDate(params.row.subscribe_time, 'yyyy-MM-dd h:m'))
                        }
                    },
                    {
                        title: '注册时间',
                        key: 'address',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'))
                        }
                    },
                    {
                        title: '操作',
                        key: 'address'
                    }
                ],
                list: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        job: '数据工程师',
                        interest: '羽毛球',
                        birthday: '1991-05-14',
                        book: '乔布斯传',
                        movie: '致命魔术',
                        music: 'I Cry'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        job: '数据科学家',
                        interest: '排球',
                        birthday: '1989-03-18',
                        book: '我的奋斗',
                        movie: '罗马假日',
                        music: 'My Heart Will Go On'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        job: '数据产品经理',
                        interest: '网球',
                        birthday: '1992-01-31',
                        book: '赢',
                        movie: '乔布斯',
                        music: 'Don’t Cry'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        job: '数据分析师',
                        interest: '桌球，跑步',
                        birthday: '1988-7-25',
                        book: '红楼梦',
                        movie: '倩女幽魂',
                        music: '演员'
                    }
                ],
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
                if (!params) params = {page: 1, mch_id: 1, platform_id: 800000}
                this.request('MerchantWxFans', params, true).then((res) => {
                    if(res.status) {
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
            //服务端获取数据
            this.getData();
        }
    }
</script>

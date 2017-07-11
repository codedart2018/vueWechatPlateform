<template>
    <div>
        <Row>
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="时间范围：">
                    <Date-picker type="date" placeholder="开始日期" v-model="formSearch.start_date" @on-change="changeStartDate" style="width: 120px"></Date-picker>
                    <span>-</span>
                    <Date-picker type="date" placeholder="结束日期" v-model="formSearch.end_date" @on-change="changeEndDate" style="width: 120px"></Date-picker>
                </Form-item>
                <Form-item label="订单类型：">
                    <Select v-model="formSearch.order_type" placeholder="请选择" style="width:100px">
                        <Option value="">请选择</Option>
                        <Option value="1">新购</Option>
                        <Option value="2">续费</Option>
                        <Option value="3">充值</Option>
                        <Option value="4">退款</Option>
                    </Select>
                </Form-item>
                <Form-item label="支付状态：">
                    <Select v-model="formSearch.is_pay" placeholder="请选择" style="width:100px">
                        <Option value="">请选择</Option>
                        <Option value="0">未支付</Option>
                        <Option value="1">已支付</Option>
                        <Option value="2">作废</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                </Form-item>
            </Form>
        </Row>
        <Row class="mb-15 table-no-padding-left">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
        </Row>
    </div>
</template>
<style scoped>
    .search .ivu-form-item {
        margin-bottom: 0px;
        vertical-align: top;
        zoom: 1;
    }
</style>
<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '订单号',
                        key: 'public_name',
                        align: 'left',
                        width: 130,
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', {
                                style: {
                                    textAlign: 'left'
                                },
                            }, row.order_sn);
                        }
                    },
                    {
                        title: '产品',
                        key: 'public_name',
                        align: 'left',
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', {
                                style: {
                                    textAlign: 'left'
                                },
                            }, row.commodity_name);
                        }
                    },
                    {
                        title: '订单类型',
                        align: 'center',
                        width: 70,
                        render: (h, params) => {
                            const row = params.row;
                            if(row.order_type == 1) {
                                var txt = "新购";
                            } else if(row.order_type == 2) {
                                var txt = "续费";
                            } else if(row.order_type == 3) {
                                var txt = "充值";
                            } else if(row.order_type == 4) {
                                var txt = "退款";
                            } else {
                                var txt = "其它";
                            }
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                },
                            }, txt);
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.is_pay == 1 ? 'green' : row.is_pay == 0 ? 'gray' : '#b30000'
                            const text = row.is_pay == 1 ? '已支付' : row.is_pay == 0 ? '未支付' : '作废'
                            return h('span', {
                                style: {
                                    color: color
                                }
                            }, text)
                        }
                    },
                    {
                        title: '原始金额',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            return h('span', {
                                style: {
                                    color: "#F90 !important"
                                }
                            }, '￥' + row.original_amount)
                        }
                    },
                    {
                        title: '实付金额',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            return h('span', {
                                style: {
                                    color: "#F90 !important"
                                }
                            }, '￥' + row.pay_amount)
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m:s'));
                        }
                    },
                    {
                        title: '支付时间',
                        key: 'create_time',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                        	if(params.row.pay_time == 0) {
                        		var txt = '';
                            } else {
                                var txt = this.$formatDate(params.row.pay_time, 'yyyy-MM-dd h:m:s');
                            }
                            return h('div', txt);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 60,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.detail(params.row.id)
                                        }
                                    }
                                }, '详情'),
                            ]);
                        }
                    }
                ],
                //列表数据
                list: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //当前页码
                pageNumber: 1,
                //搜索表单
                formSearch: {},
                //设置结束时间
                banDate: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                changeStartTime: Date.parse(new Date()),
                changeEndTime: Date.parse(new Date()),
            }
        },
        methods: {
            //获得数据
            getData (params) {
                if (!params) params = {page: 1}
                this.request('MerchantFinanceBills', params, true).then((res) => {
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
            //分页切换页码
            changePage (page) {
                this.pageNumber = page;
                let search = this.formSearch;
                let query = Object.assign({page: page }, search);
                //分页
                this.$router.push({ name: this.$router.currentRoute.name, query: query});
                //获取最新数据
                this.getData({page: page, params: search});
            },
            //表单搜索
            search() {
                let page = 1;
                this.pageNumber = page;
                let search = this.formSearch;
                this.getData({ params : search });
            },
            changeStartDate(v) {
                Date.parse(new Date(v));
            },
            changeEndDate(v) {
                const time = Date.parse(new Date(v));
                if(time < this.changeStartTime) {
                    this.$Message.error('结束时间不能大于开始时间');
//                    this.formSearch.end_date = '2016-07-01';
                    return false;
                }
            },
            //详情路由跳转
            detail(id) {
                this.$router.push({ path: '/expense/bills_detail/' + id, params: { id: id }})
            },
        },
        mounted() {
            //服务端获取数据
            this.getData()
        }


    }
</script>

<template>
    <div>
        <Row>
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="时间范围：">
                    <Date-picker type="date" placeholder="开始日期" v-model="formSearch.start_date" @on-change="changeStartDate" style="width: 120px"></Date-picker>
                    <span>-</span>
                    <Date-picker type="date" placeholder="结束日期" v-model="formSearch.end_date" @on-change="changeEndDate" style="width: 120px"></Date-picker>
                </Form-item>
                <Form-item label="类型：">
                    <Select v-model="formSearch.type" placeholder="请选择" style="width:100px">
                        <Option value="">请选择</Option>
                        <Option value="1">增加</Option>
                        <Option value="2">扣除</Option>
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
                        title: '编号',
                        align: 'left',
                        width: 130,
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', {
                                style: {
                                    textAlign: 'left'
                                },
                            }, row.id);
                        }
                    },
                    {
                        title: '说明',
                        align: 'left',
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', {
                                style: {
                                    textAlign: 'left'
                                },
                            }, row.describe);
                        }
                    },
                    {
                        title: '类型',
                        align: 'center',
                        width: 70,
                        render: (h, params) => {
                            const row = params.row;
                            if(row.type == 1) {
                                var txt = "增加";
                            } else {
                                var txt = "扣除";
                            }
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                },
                            }, txt);
                        }
                    },
                    {
                        title: '积分',
                        align: 'center',
                        width: 70,
                        render: (h, params) => {
                            const row = params.row;
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                },
                            }, row.score);
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
                this.request('MerchantFinanceIntegral', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list;
                        //总页数;
                        this.total = res.data.count;
                        //每页多少条数据;
                        this.pageSize = res.data.size;
                    } else {
                        //列表数据;
                        this.list = [];
                        //总页数;
                        this.total = 0;
                        //每页多少条数据;
                        this.pageSize = 0;
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
                    return false;
                }
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }


    }
</script>

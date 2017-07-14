<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
                <Form :model="formSearch" :label-width="80" inline label-position="right">
                    <Form-item label="用户帐号：">
                        <Input v-model="formSearch.account" placeholder="请输入用户帐号"></Input>
                    </Form-item>
                    <Form-item label="商户名称：">
                        <Input v-model="formSearch.mch_name" placeholder="请输入商户名称"></Input>
                    </Form-item>
                    <Form-item :label-width="1">
                        <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                    </Form-item>
                </Form>
            </Col>
            <Col span="6" class="text-align-right">
            </Col>
        </Row>
        <Row class="mb-15">
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
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '帐号',
                        key: 'account',
                        width: 200
                    },
                    {
                        title: '所属商户',
                        key: 'mch_name'
                    },
                    {
                        title: '是否主帐号',
                        key: 'is_main',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.is_main == 1 ? 'green' : 'red'
                            const text = row.is_main == 1 ? '是' : '否'
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'))
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 110,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.restPassword(params.row.id)
                                        }
                                    }
                                }, '重置密码'),
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
            }
        },
        methods: {
            //分页切换页码
            changePage (page) {
                this.pageNumber = page
                let search = this.formSearch
                let query = Object.assign({page: page }, search)
                //分页
                this.$router.push({ name: this.$router.currentRoute.name, query: query})
                //获取最新数据
                this.getData({page: page, params: search})
            },
            getData (params) {
                if (!params) params = {page: 1}
                this.request('AdminMerchantUser', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                    } else {
                        this.list = []
                        this.total = 0
                        this.pageSize = 0
                    }
                }).catch((response) => {

                })
            },
            //表单搜索
            search() {
                this.pageNumber = 1
                let search = this.formSearch
                this.getData({ params : search })
            },
            //重置用户密码
            restPassword (id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要重置密码为[123456]?</p>',
                    loading: true,
                    onOk: () => {
                        this.request('AdminMerchantUserRestPassWord', {id, id}).then((res) => {
                            if(res.status) {
                                this.$Message.success(res.msg)
                                this.$Modal.remove();
                            } else {
                                this.$Message.error(res.msg)
                                this.$Modal.remove();
                            }
                        })
                    }
                });
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }
    }
</script>

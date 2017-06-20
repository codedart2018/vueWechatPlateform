<!--粉丝-->
<template>
    <div>
        <Form :model="formSearch" :label-width="80" inline label-position="right">
            <Form-item label="用户呢称：" style="margin-bottom: 15px;">
                <Input v-model="formSearch.keywords" placeholder="请输入用户呢称"></Input>
            </Form-item>
            <Form-item label="标签分类：" style="margin-bottom: 15px;">
                <Select v-model="formSearch.c_id" placeholder="请选择" style="width:100px">
                    <Option value="">请选择</Option>
                    <Option v-for="item in group" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </Form-item>
            <Form-item :label-width="1" style="margin-bottom: 15px;">
                <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
            </Form-item>
        </Form>
        <Row class="mb-15">
            <Button type="info">打标签</Button>
            <Button type="warning">加入黑名单</Button>
            <Button type="success">批量同步</Button>
            <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加文章</Button>
        </Row>
        <Row class="mb-15">
            <Table :columns="columns" :data="list" @on-selection-change="onSelectChange"></Table>
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
                        type: 'selection',
                        width: 55,
                    },
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
                        align: 'center',
                        width: 135,
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
                                            this.edit(params.index)
                                        }
                                    }
                                }, '同步'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.restPassword(params.row.id)
                                        }
                                    }
                                }, '消息')
                            ]);
                        }
                    }
                ],
                list: [
                ],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //当前页码
                pageNumber: 1,
                //搜索表单
                formSearch: {},
                //分组数据
                group: [],
                //被选中的数据
                selectData: []
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
            //获取分组
            getGroup() {
                this.request('MerchantWxFansGroup', {}).then((res) => {
                    if(res.status) {
                        this.group = res.data
                    } else {
                        this.list = []
                    }
                })
            },
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
            //获取被选择ID
            onSelectChange(selection) {
                if(typeof(selection) == 'object' && selection.length > 0) {
                    //每次处理一次为空
                	this.selectData = []
                    //循环处理数据
                    for (var value of selection) {
                        this.selectData.push(value.id)
                    }
                } else {
                    this.selectData = []
                }
            }
        },
        mounted() {
            //服务端获取数据
            this.getData()
            //接取分组数据
            this.getGroup()
        }
    }
</script>

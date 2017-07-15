<!--微信公众号列表组件-->
<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="搜索类型：">
                    <Select v-model="formSearch.type" placeholder="请选择" style="width:90px">
                        <Option value="">请选择</Option>
                        <Option value="1">帐号</Option>
                        <Option value="2">联系人</Option>
                        <Option value="3">手机号码</Option>
                        <Option value="4">邮箱</Option>
                    </Select>
                </Form-item>
                <Form-item label="关键词：">
                    <Input v-model="formSearch.keywords" placeholder="请输入角色名称关键词"></Input>
                </Form-item>
                <Form-item label="所属角色">
                    <Select v-model="formSearch.role_id" placeholder="请选择" style="width:100px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="状态：">
                    <Select v-model="formSearch.status" placeholder="请选择" style="width:70px">
                        <Option value="">请选择</Option>
                        <Option value="1">正常</Option>
                        <Option value="0">锁定</Option>
                    </Select>
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
                        title: '平台号',
                        key: 'id',
                        width: 130
                    },
                    {
                        title: '公众号LOGO',
                        key: 'public_name',
                        width: 130
                    },
                    {
                        title: '公众号名称',
                        key: 'public_name',
                    },
                    {
                        title: '所属商户',
                        key: 'belong',
                    },
                    {
                        title: '粉丝数量',
                        key: 'public_name',
                    },
                    {
                        title: '会员数量',
                        key: 'public_name',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red';
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除';
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
                            return h('div',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '最后更新',
                        key: 'update_time',
                        align: 'center',
                        width: 135,
                        render: (h, params) => {
                            return h('div',this.$formatDate(params.row.update_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 140,
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
                                            this.edit(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.restPassword(params.row.id);
                                        }
                                    }
                                }, '重置')
                            ]);
                        }
                    }
                ],
                roles: [],
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
                this.pageNumber = page;
                let search = this.formSearch;
                let query = Object.assign({page: page }, search);
                //分页
                this.$router.push({ name: this.$router.currentRoute.name, query: query});
                //获取最新数据
                this.getData({page: page, params: search});
            },
            getData (params) {
                if (!params) params = {page: 1};
                this.request('AdminPublicList', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list;
                        //总页数
                        this.total = res.data.count;
                        //每页多少条数据
                        this.pageSize = res.data.size;
                        //角色数据
                        this.roles = res.data.role;
                    }
                })
            },
            //重置用户密码
            restPassword (id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要重置密码为[123456]?</p>',
                    loading: true,
                    onOk: () => {
                        this.request('RestPassword', {id, id}).then((res) => {
                            if(res.status) {
                                this.$Message.success(res.msg);
                                this.$Modal.remove();
                            } else {
                                this.$Message.error(res.msg);
                                this.$Modal.remove();
                            }
                        })
                    }
                });
            },
            //表单搜索
            search() {
                let page = 1;
                this.pageNumber = page;
                let search = this.formSearch;
                this.getData({ params : search });
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        },
        components: {
        },
        watch: {
            '$route' (to, from) {

            }
        },
    }
</script>

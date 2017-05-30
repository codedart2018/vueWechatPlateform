<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="文章名称：">
                    <Input v-model="formSearch.keywords" placeholder="请输入文章关键词"></Input>
                </Form-item>
                <Form-item label="文章分类：">
                    <Select v-model="formSearch.c_id" placeholder="请选择" style="width:90px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in cate" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="文章状态：">
                    <Select v-model="formSearch.status" placeholder="请选择" style="width:90px">
                        <Option value="">请选择</Option>
                        <Option value="1">正常</Option>
                        <Option value="0">删除</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                </Form-item>
            </Form>
            &nbsp;
            </Col>
            <Col span="6" class="text-align-right">
            <router-link to="/article/add"><Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加文章</Button></Button></router-link>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
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
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                    },
                    {
                        title: '所属分类',
                        key: 'cate_name',
                        width: 200
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render (row) {
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red';
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除';
                            return `<tag type="dot" color="${color}">${text}</tag>`;
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render (row) {
                            return "<span>{{ row.create_time | formatDate('yyyy-MM-dd h:m') }}</span>"
                        }
                    },
                    {
                        title: '更新时间',
                        key: 'update_time',
                        width: 135,
                        align: 'center',
                        render (row) {
                            return "<span>{{ row.update_time | formatDate('yyyy-MM-dd h:m') }}</span>"
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
                                            this.edit(params.row.id)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index, params.row.id)
                                        }
                                    }
                                }, '删除')
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
                //分类
                cate: []
            }
        },
        methods: {
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
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
            //获取数据
            getData (params) {
                if (!params) params = {page: 1}
                this.request('AdminArticleList', params, true).then((res) => {
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
            edit(id) {
                this.$router.push({ path: '/article/edit/' + id, params: { id: id }})
            },
            //删除素材数据
            del (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('AdminDelEditorMaterial', {id, id}).then((res) => {
                            if(res.status) {
                                this.$Message.info(res.msg)
                                this.$Modal.remove();
                                this.list[index].status = -1
                            } else {
                                this.$Message.error(res.msg)
                                this.$Modal.remove();
                            }
                        })
                    }
                });
            },
            //表单搜索
            search() {
                let page = 1
                this.pageNumber = page
                let search = this.formSearch
                //if(JSON.stringify(search) == "{}") return
                this.getData({ params : search })
            },
            //获得分类数据
            getCate() {
                this.request('AdminCategoryList', {type: 1}, true).then((res) => {
                    if(res.status) {
                        this.cate = res.data
                    }
                })
            },
        },
        mounted() {
            //服务端获取数据
            this.getData()
            //服务端分类数据
            this.getCate()
            console.log(JSON.stringify(this.formSearch))
        }
    }
</script>

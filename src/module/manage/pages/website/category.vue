<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
                <Form :model="formSearch" :label-width="80" inline label-position="right">
                    <Form-item label="分类名称：">
                        <Input v-model="formSearch.keywords" placeholder="请输入分类名称关键词"></Input>
                    </Form-item>
                    <Form-item :label-width="1">
                        <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                    </Form-item>
                </Form>
                &nbsp;
            </Col>
            <Col span="6" class="text-align-right">
                <Button type="primary" @click="addModal = true">
                    <Icon type="plus-round"></Icon>&nbsp;添加分类
                </Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加分类" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="分类名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写分类名称" style="width:200px"></Input>
                    </Form-item>
                    <Form-item label="分类排序" prop="sort">
                        <Input v-model="addForm.sort" placeholder="数字越大排序越前" style="width:200px"></Input>
                    </Form-item>
                    <Form-item label="分类状态" prop="status">
                        <Radio-group v-model="addForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="addSubmit('addForm')">提交</Button>
                <Button type="ghost" @click="handleReset('addForm')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>

        <!--编辑 Modal 对话框-->
        <Modal v-model="editModal" class-name="customize-modal-center">
            <div slot="header" class="ivu-modal-header-inner">编辑分类</div>
            <div>
                <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="分类名称" prop="name">
                        <Input v-model="editForm.name" placeholder="请填写分类名称" style="width:200px"></Input>
                    </Form-item>
                    <Form-item label="分类排序" prop="sort">
                        <Input v-model="editForm.sort" placeholder="数字越大排序越前" style="width:200px"></Input>
                    </Form-item>
                    <Form-item label="分类状态" prop="status">
                        <Radio-group v-model="editForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="editSubmit('editForm')">提交</Button>
                <Button type="ghost" @click="modalCancel()" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
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
                        width: 160
                    },
                    {
                        title: '分类名称',
                        key: 'name',
                    },
                    {
                        title: '站点数量',
                        key: 'count',
                    },
                    {
                        title: '状态',
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
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '更新时间',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', this.$formatDate(params.row.update_time, 'yyyy-MM-dd h:m'));
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index, params.row.id);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                //列表数据
                list: [],
                //分类数据
                cate: [],
                addForm: {
                    name: '',
                    status: 1,
                    sort: ''
                },
                //编辑表单
                editForm: {},
                //验证规则
                ruleValidate: {
                    name: [
                        {required: true, message: '分类名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '分类名称不能少于2个字符', trigger: 'blur'}
                    ],
                    sort: [
                        {type: 'string', message: '排序只能数字', trigger: 'blur', pattern: /^[0-9]+$/}
                    ]
                },
                //搜索表单
                formSearch: {},
                //添加 modal
                addModal: false,
                //编辑 modal
                editModal: false,
                //计数器
                tally: 0
            }
        },
        methods: {
            //取消 modal
            modalCancel() {
                this.editModal = false;
            },
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //获取数据
            getData (params) {
                if (!params) params = {page: 1}
                this.request('AdminWebsiteCategory', params, true).then((res) => {
                    if (res.status) {
                        //列表数据
                        this.list = res.data;
                        if (this.tally == 0) {
                            this.cate = res.data;
                            this.tally++;
                        }
                    } else {
                        //列表数据
                        this.list = [];
                    }
                })
            },
            //添加数据
            addSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("AdminWebsiteAddCategory", this.addForm);
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("AdminWebsiteEditCategory", this.editForm);
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            edit(index) {
                //打开 modal 窗口
                this.editModal = true;
                //获取原数据
                this.editForm = this.list[index];
            },
            //删除分类数据
            remove (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('AdminCategoryDelete', {id, id}).then((res) => {
                            if (res.status) {
                                this.$Message.info(res.msg);
                                this.$Modal.remove();
                                this.list.splice(index, 1);
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
                this.getData({params: search});
            },
            //保存数据方法
            save(url, data) {
                this.request(url, data).then((res) => {
                    if (res.status) {
                        this.addModal = false;
                        this.editModal = false;
                        this.$Message.success(res.msg);
                        //重置数据
                        this.$refs['addForm'].resetFields();
                        this.$refs['editForm'].resetFields();
                        //重新拉取服务端数据
                        this.getData();
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }
    }
</script>

<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            &nbsp;
            </Col>
            <Col span="6" class="text-align-right">
            <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加分类</Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加分类" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="分类名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写角色名称"></Input>
                    </Form-item>
                    <Form-item label="分类图标" prop="icon">
                        <Input v-model="addForm.icon" placeholder="请填写角色名称"></Input>
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
                        <Input v-model="editForm.name" placeholder="请填写角色名称"></Input>
                    </Form-item>
                    <Form-item label="分类图标" prop="icon">
                        <Input v-model="editForm.icon" placeholder="请填写角色名称"></Input>
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

<script>

    export default {
        data () {
            return {
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '分类名称',
                        key: 'name'
                    },
                    {
                        title: 'ICON图标',
                        key: 'icon'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red'
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除'
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
                        title: '更新时间',
                        key: 'update_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',this.$formatDate(params.row.update_time, 'yyyy-MM-dd h:m'))
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
                                            this.edit(params.index)
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
                                            this.del(params.index, params.row.id)
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
                addForm: {
                    name: '',
                    status: 1,
                    icon: ''
                },
                //验证规则
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '分类名称不能少于2个字符', trigger: 'blur' },
                        { type: 'string', max: 6, message: '分类名称不能大于6个字符', trigger: 'blur' },
                    ],
                    icon: [
                        { type: 'string', message: 'ICON只能英文数字下划线', trigger: 'blur', pattern: /^[a-zA-Z-_0-9]+$/}
                    ]
                },
                //搜索表单
                formSearch: {},
                //编辑表单
                editForm: {},
                //添加 modal
                addModal: false,
                //编辑 modal
                editModal: false,
            }
        },
        methods: {
            //取消 modal
            modalCancel() {
                this.editModal = false
            },
            //添加数据
            addSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("AddEditorMaterialCate", this.addForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("EditEditorMaterialCate", this.editForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //分页切换页码
            changePage (page) {
                let search = this.formSearch
                let query = Object.assign({page: page }, search)
                //分页
                this.$router.push({ name: this.$router.currentRoute.name, query: query})
                //获取最新数据
                this.getData({page: page, params: search})
            },
            getData (params) {
                if (!params) params = {page: 1}
                this.request('AdminEditorMaterialCate', params, true).then((res) => {
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
                })
            },
            edit (index) {
                //打开 modal 窗口
                this.editModal = true
                //获取原数据
                this.editForm = this.list[index]
            },
            //删除角色数据
            del (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('AdminDelEditorMaterialCate', {id, id}).then((res) => {
                            if(res.status) {
                                this.$Message.info(res.msg)
                                this.$Modal.remove();
                                this.list[index].status = -1
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    }
                });
            },
            //保存数据方法
            save(url, data) {
                this.request(url, data).then((res) => {
                    if (res.status) {
                        this.addModal = false
                        this.editModal = false
                        this.$Message.success(res.msg)
                        //重置数据
                        this.$refs['addForm'].resetFields()
                        this.$refs['editForm'].resetFields()
                        //重新拉取服务端数据
                        this.getData()
                    } else {
                        this.$Message.error(res.msg)
                        this.$Modal.remove();
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

<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <!-- 如果角色真多了再搜索
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="角色名称：">
                    <Input v-model="formSearch.keywords" placeholder="请输入角色名称关键词"></Input>
                </Form-item>
                <Form-item label="角色状态：">
                    <Select v-model="formSearch.status" placeholder="请选择" style="width:90px">
                        <Option value="">请选择</Option>
                        <Option value="1">正常</Option>
                        <Option value="0">锁定</Option>
                        <Option value="-1">删除</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                </Form-item>
            </Form>
            -->
            &nbsp;
            </Col>
            <Col span="6" class="text-align-right">
                <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加角色</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加角色" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写角色名称"></Input>
                    </Form-item>
                    <Form-item label="角色状态" prop="status">
                        <Radio-group v-model="addForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="角色说明" prop="desc">
                        <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="角色简要说明..."></Input>
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
            <div slot="header" class="ivu-modal-header-inner">编辑权限角色</div>
            <div>
                <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="角色名称" prop="name">
                        <Input v-model="editForm.name" placeholder="请填写角色名称"></Input>
                    </Form-item>
                    <Form-item label="角色状态" prop="status">
                        <Radio-group v-model="editForm.status">
                            <Radio label="1">正常</Radio>
                            <Radio label="0">锁定</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="角色说明" prop="desc">
                        <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="角色说明..."></Input>
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
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '角色名称',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: '角色简介',
                        key: 'desc'
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
                        title: '操作',
                        key: 'operation',
                        width: 210,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="success" size="small" @click="authGo(${row.id})">角色授权</i-button> <i-button type="primary" size="small" @click="edit(${index})">查看</i-button> <i-button type="error" size="small" @click="del(${index}, ${row.id})">删除</i-button>`;
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
                    desc: ''
                },
                //验证规则
                ruleValidate: {
                    name: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '角色名称不能少于2个字符', trigger: 'blur' }
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
                        this.save("AdminAddRole", this.addForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("EditRole", this.editForm)
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
                this.request('GetRole', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                    }
                }).catch((response) => {

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
                        this.request('DelRole', {id, id}).then((res) => {
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
                    }
                })
            },
            authGo(id) {
                this.$router.push({ path: '/role/authorize/' + id, params: { id: id }})
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }
    }
</script>

<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="素材名称：">
                    <Input v-model="formSearch.keywords" placeholder="请输入角色名称关键词"></Input>
                </Form-item>
                <Form-item label="素材状态：">
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
            &nbsp;
            </Col>
            <Col span="6" class="text-align-right">
                <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加分类</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
        </Row>


        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加分类" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="分类名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写角色名称"></Input>
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
    // todo 后期处理分类列表展现
    export default {
        data () {
            return {
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 160
                    },
                    {
                        title: '分类名称',
                        key: '_name'
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
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="edit(${row.id})">编辑</i-button> <i-button type="error" size="small" @click="del(${index}, ${row.id})">删除</i-button>`;
                        }
                    }
                ],
                //列表数据
                list: [],
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
                //添加 modal
                addModal: false,
            }
        },
        methods: {
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //获取数据
            getData (params) {
                if (!params) params = {page: 1}
                this.request('AdminCategoryList', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data
                    } else {
                        //列表数据
                        this.list = []
                    }
                })
            },
            edit(id) {
                this.$router.push({ path: '/manage/editor_material/edit_material/' + id, params: { id: id }})
            },
            //删除角色数据
            del (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('DelEditorMaterial', {id, id}).then((res) => {
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
                this.getData({ params : search })
            }
        },
        mounted() {
            //服务端获取数据
            this.getData()
        }
    }
</script>

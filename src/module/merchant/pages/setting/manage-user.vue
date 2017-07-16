<template>
    <div>
        <Row class="mb-15">
            <Col span="21" class="search">
            <Form :model="formSearch" :label-width="75" inline label-position="right">
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
                    <Input v-model="formSearch.keywords" placeholder="帐号/手机号/姓名/邮箱"></Input>
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
            <Col span="3" class="text-align-right">
            <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加用户</Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加用户" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="帐号" prop="account">
                        <Input v-model="addForm.account" placeholder="请填写帐号"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="password">
                        <Input type="password" v-model="addForm.password" placeholder="请填写密码"></Input>
                    </Form-item>
                    <Form-item label="所属角色" prop="role_id">
                        <Select v-model="addForm.role_id" placeholder="请选择">
                            <Option value="">请选择</Option>
                            <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="姓名" prop="real_name">
                        <Input v-model="addForm.real_name" placeholder="请填写姓名"></Input>
                    </Form-item>
                    <Form-item label="手机号" prop="mobile">
                        <Input v-model="addForm.mobile" placeholder="请填写手机号"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="email">
                        <Input v-model="addForm.email" placeholder="请填写邮箱"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="status">
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
        <Modal v-model="editModal" title="编辑用户" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="80">
                    <Form-item label="帐号" prop="account">
                        <Input v-model="editForm.account" disabled placeholder="请填写帐号"></Input>
                    </Form-item>
                    <Form-item label="密码">
                        <Input type="password" v-model="editForm.password" placeholder="请填写密码"></Input>
                    </Form-item>
                    <Form-item label="所属角色" prop="role_id">
                        <Select v-model="editForm.role_id" placeholder="请选择">
                            <Option value="">请选择</Option>
                            <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="姓名" prop="real_name">
                        <Input v-model="editForm.real_name" placeholder="请填写姓名"></Input>
                    </Form-item>
                    <Form-item label="手机号" prop="mobile">
                        <Input v-model="editForm.mobile" placeholder="请填写手机号"></Input>
                    </Form-item>
                    <Form-item label="邮箱" prop="email">
                        <Input v-model="editForm.email" placeholder="请填写邮箱"></Input>
                    </Form-item>
                    <Form-item label="状态" prop="status">
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
    import tableRow from './manage-user-table.vue';

    export default {
        data () {
            const validatePassword = (rule, value, callback) => {
                if ((this.addModal || value) && (value.length < 6 || value.length > 32)) {
                    callback(new Error('密码长度6-32个字符'));
                }
                callback();
            }

            const validateMobile = (rule, value, callback) => {
                if (value) {
                    let reg = /^1[34578]\d{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('手机号码格式不正确'));
                    }
                }
                callback();
            }

            return {
                columns: [
                    {
                        type: 'expand',
                        width: 30,
                        render: (h, params) => {
                            return h(tableRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '帐号',
                        key: 'account',
                        width: 130
                    },
                    {
                        title: '用户角色',
                        key: 'role_name'
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
                        title: '登陆次数',
                        key: 'login_count',
                        align: 'center'
                    },
                    {
                        title: '最后登陆',
                        key: 'last_login_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.last_login_time == 0) {
                                return h('Tag', "从未登陆");
                            }
                            return h('div',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 150,
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
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.restPassword(params.row.id);
                                        }
                                    }
                                }, '重置'),
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
                roles: [],
                //列表数据
                list: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //当前页码
                pageNumber: 1,
                //添加表单
                addForm: {
                    account: '',
                    password: '',
                    role_id: '',
                    mobile: '',
                    email: '',
                    status: 1,
                    real_name: ''
                },
                //验证规则
                ruleValidate: {
                    account: [
                        { required: true, message: '帐号不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '帐号不能少于2个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    real_name: [
                        { type: 'string', min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
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
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            //取消 modal
            modalCancel() {
                this.editModal = false;
            },
            //添加数据
            addSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("MerchantAddUser", this.addForm);
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("MerchantEditUser", this.editForm);
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //重置表单数据
            handleReset (name) {
                this.$refs[name].resetFields();
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
            getData (params) {
                if (!params) params = {page: 1};
                this.request('MerchantUserList', params, true).then((res) => {
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
            edit (index) {
                //打开 modal 窗口
                this.editModal = true;
                //获取原数据
                this.editForm = this.list[index];
            },
            //重置用户密码
            restPassword (id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要重置密码为[123456]?</p>',
                    loading: true,
                    onOk: () => {
                        this.request('MerchantRestUserPassword', {id, id}).then((res) => {
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
            },
            //删除用户数据
            del (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    width: 300,
                    content: '<p>你确定要删除?删除后不可恢复!</p>',
                    loading: true,
                    onOk: () => {
                        this.request('MerchantDeleteUser', {id, id}).then((res) => {
                            if(res.status) {
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

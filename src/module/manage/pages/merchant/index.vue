<!--商户列表组件-->
<template>
    <div>
        <Row class="mb-15">
            <Col span="18" class="search">
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="关键词类型：" :label-width="90">
                    <Select v-model="formSearch.type_keywords" placeholder="请选择" style="width:80px">
                        <Option value="">请选择</Option>
                        <Option value="1">商户名称</Option>
                        <Option value="2">联系人</Option>
                        <Option value="3">手机号码</Option>
                    </Select>
                </Form-item>
                <Form-item label="商户名称：">
                    <Input v-model="formSearch.keywords" placeholder="请输入商户名称关键词"></Input>
                </Form-item>
                <Form-item label="商户类型：">
                    <Select v-model="formSearch.type" placeholder="请选择" style="width:80px">
                        <Option value="">请选择</Option>
                        <Option value="1">个人</Option>
                        <Option value="2">个业</Option>
                    </Select>
                </Form-item>
                <Form-item label="商户状态：">
                    <Select v-model="formSearch.status" placeholder="请选择" style="width:80px">
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
            <Button type="primary" @click="addModal = true" v-if=""><Icon type="plus-round"></Icon>&nbsp;添加商户</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator @on-change="changePage"></Page>
        </Row>

        <!--添加 Modal 对话框-->
        <Modal v-model="addModal" title="添加商户" class-name="customize-modal-center" @on-cancel="modalCancel()">
            <div>
                <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="100">
                    <Form-item label="商户名称" prop="name">
                        <Input v-model="addForm.name" placeholder="请填写商户名称"></Input>
                    </Form-item>
                    <Form-item label="商户类型" prop="type">
                        <Radio-group v-model="addForm.type">
                            <Radio label="1">个人</Radio>
                            <Radio label="2">企业</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="管理员帐号" prop="account">
                        <Input v-model="addForm.account" placeholder="请填写管理员帐号"></Input>
                    </Form-item>
                    <Form-item label="帐号密码" prop="password">
                        <Input v-model="addForm.password" placeholder="请填写管理员帐号密码"></Input>
                    </Form-item>
                    <Form-item label="联系人" prop="contacts">
                        <Input v-model="addForm.contacts" placeholder="请填写联系人"></Input>
                    </Form-item>
                    <Form-item label="手机号码" prop="mobile">
                        <Input v-model="addForm.mobile" placeholder="请填写手机号码"></Input>
                    </Form-item>
                    <Form-item label="电话号码" prop="tel">
                        <Input v-model="addForm.tel" placeholder="请填写电话号码"></Input>
                    </Form-item>
                    <Form-item label="联系邮箱" prop="email">
                        <Input v-model="addForm.email" placeholder="请填写邮箱地址"></Input>
                    </Form-item>
                    <Form-item prop="validity" label="有效期">
                        <Date-picker type="date" :options="maxDate" placeholder="选择日期" v-model="addForm.validity" confirm></Date-picker>
                        <div class="ng-mb-15 label-color">不选择日期永久有效</div>
                    </Form-item>
                    <Form-item label="商户状态" prop="status">
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

    export default {
        data () {
            return {
            	//权限数据
            	auth: {},
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 60
                    },
                    {
                        title: '商户名称',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: '商户类型',
                        key: 'type',
                        align: 'center',
                        render (row) {
                            const text = row.type == 1 ? '个人' : row.status == 2 ? '企业' : '未知';
                            return `${text}`;
                        }
                    },
                    {
                        title: '联系人',
                        key: 'contacts'
                    },
                    {
                        title: '手机号码',
                        key: 'mobile'
                    },
                    {
                        title: '电话号码',
                        key: 'tel'
                    },
                    {
                        title: '余额',
                        key: 'balance'
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
                        title: '有效期',
                        key: 'validity',
                        width: 135,
                        align: 'center',
                        render (row) {
                            let data = "{{ row.validity | formatDate('yyyy-MM-dd h:m') }}"
                            const text = row.validity == 0 ? '长期有效' : data;
                            return `${text}`;
                        }
                    },
                    {
                        title: '创建时间',
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
                        width: 200,
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="view(${row.id})">查看</i-button> <i-button type="primary" size="small" @click="del(${index}, ${row.id})">切换商户</i-button>`;
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
                //添加表单
                addForm: {
                    name: '',
                    type: '',
                    account: '',
                    password: '',
                    contacts: '',
                    validity: '',
                    status: 1
                },
                //验证规则
                ruleValidate: {
                    name: [
                        { required: true, message: '商户名称不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '商户名称不能少于2个字符', trigger: 'blur' },
                        { type: 'string', max: 20, message: '商户名称最多20个字符', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择商户类型', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请填写商户帐号', trigger: 'blur' },
                        { type: 'string', message: '帐号只能英文数字开头下划线中划线组合', trigger: 'blur', pattern: /^[a-zA-Z0-9]+[_-]?[a-zA-Z0-9]+$/},
                        { type: 'string', min: 4, message: '帐号长度不能低于4位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写商户密码', trigger: 'blur' },
                        { type: 'string', min: 6, max: 32, message: '密码长度6-32个字符', trigger: 'blur' }
                    ]
                },
                //搜索表单
                formSearch: {},
                //添加 modal
                addModal: false,
                //最小日期
                maxDate: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
            }
        },
        methods: {
            //添加数据
            addSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("AddMerchant", this.addForm)
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
                this.request('Merchant', params, true).then((res) => {
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
                }).catch((response) => {

                })
            },
            //表单搜索
            search() {
                this.pageNumber = 1
                let search = this.formSearch
                this.getData({ params : search })
            },
            //保存数据方法
            save(url, data) {
                this.request(url, data).then((res) => {
                    if (res.status) {
                        this.addModal = false
                        this.$Message.success(res.msg)
                        //重置数据
                        this.$refs['addForm'].resetFields()
                        //重新拉取服务端数据
                        this.getData()
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            },
            view(id) {
                this.$router.push({ path: '/manage/merchant/view/' + id, params: { id: id }})
            }
        },
        mounted() {
        	this.auth = this.$store.state.MainMenu.auth
            //服务端获取数据
            this.getData();
        }
    }
</script>

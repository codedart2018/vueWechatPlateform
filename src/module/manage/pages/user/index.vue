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
            <Button type="primary" @click="addModal = true"><Icon type="plus-round"></Icon>&nbsp;添加用户</Button></Button>
            </Col>
        </Row>
        <Row class="mb-15">
            <Table :context="self" :columns="columns" :data="list"></Table>
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
                    <Form-item label="所属角色">
                        <Select v-model="addForm.role_id" placeholder="请选择">
                            <Option value="">请选择</Option>
                            <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="头像">

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
                    <Form-item label="备注说明" prop="desc">
                        <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字说明备注..."></Input>
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
                    <Form-item label="密码" prop="password">
                        <Input type="password" v-model="editForm.password" placeholder="请填写密码"></Input>
                    </Form-item>
                    <Form-item label="所属角色">
                        <Select v-model="editForm.role_id" placeholder="请选择">
                            <Option value="">请选择</Option>
                            <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="头像">
                        <template>
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" v-model="visible">
                                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                            </Modal>
                        </template>
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
                    <Form-item label="备注说明" prop="desc">
                        <Input v-model="editForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="200字说明备注..."></Input>
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
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>


<script>

    export default {
        data () {
            const validatePassword = (rule, value, callback) => {
                if ((this.addModal || value) && (value.length < 6 || value.length > 32)) {
                    callback(new Error('密码长度6-32个字符'))
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
                //render 里使用 如果没有此this 会导致找不到方法而报错
                self: this,
                columns: [
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
                        title: '联系人',
                        key: 'real_name',
                        width: 130
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 80,
                        align: 'center',
                        render (row) {
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red';
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除';
                            return `<tag type="dot" style="padding-right: 3px" color="${color}" title="${text}"></tag>`;
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
                        render (row) {
                        	if(row.last_login_time == 0) {
                                return "<span>从未登陆</span>"
                            }
                            return "<span>{{ row.last_login_time | formatDate('yyyy-MM-dd h:m') }}</span>"
                        }
                    },
                    {
                        title: '最后登陆IP',
                        key: 'last_login_ip',
                        width: 135,
                        align: 'center'
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
                        title: '最后更新',
                        key: 'update_time',
                        align: 'center',
                        width: 135,
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
                            return `<i-button type="primary" size="small" @click="edit(${index})">查看</i-button> <i-button type="success" size="small" @click="restPassword(${row.id})"><Icon type="key"></Icon> 重置</i-button>`;
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
                    role_id: 0,
                    mobile: '',
                    email: '',
                    status: 1,
                    real_name: '',
                    desc: '',
                    avatar: ''
                },
                //验证规则
                ruleValidate: {
                    account: [
                        { required: true, message: '帐号不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '帐号不能少于2个字符', trigger: 'blur' }
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    real_name: [
                        { type: 'string', min: 2, max: 6, message: '姓名2-6个字符', trigger: 'blur' }
                    ],
                    mobile: [
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    desc: [
                        { type: 'string', max: 200, message: '备注说明不能超过200字', trigger: 'blur' }
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
                //头像相关
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: []
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
                        this.save("AddUser", this.addForm)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            //修改数据
            editSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.save("EditUser", this.editForm)
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
                this.request('User', params, true).then((res) => {
                    if(res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                        //角色数据
                        this.roles = res.data.role
                    }
                })
            },
            edit (index) {
                //打开 modal 窗口
                this.editModal = true
                //获取原数据
                this.editForm = this.list[index]
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
                                this.$Message.success(res.msg)
                                this.$Modal.remove();
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
                this.$router.push({ path: '/manage/authorize/' + id, params: { id: id }})
            },
            //头像
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            }
        },
        mounted() {
            //服务端获取数据
            this.getData();
            //console.log(this.$router.options.routes)
            this.uploadList = this.$refs.upload.fileList;

        },
        components: {
        },
        watch: {
            '$route' (to, from) {

            }
        },
    }
</script>
